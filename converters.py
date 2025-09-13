# converters.py
from __future__ import annotations
import os
import shutil
import subprocess
import sys
import time
from pathlib import Path
from typing import Optional, Tuple

# Caches so we don't re-detect on every call
_DETECTED: dict[str, Optional[str]] = {
    "word": None,          # "available" or None
    "soffice_path": None,  # full path to soffice.exe if found
    "engine": None,        # "word" | "libreoffice" | None
}

def _windows() -> bool:
    return sys.platform.startswith("win")

# ---------- WORD / docx2pdf ----------
def _word_available() -> bool:
    """Return True if Word is usable via COM/docx2pdf."""
    if _DETECTED["word"] == "available":
        return True
    try:
        import win32com.client  # noqa: F401
        _DETECTED["word"] = "available"
        return True
    except Exception:
        return False

def _convert_with_word(docx_path: Path, pdf_path: Path) -> Optional[str]:
    """Use MS Word COM to export PDF. Returns None on success or error string."""
    try:
        import win32com.client  # type: ignore
    except Exception:
        return "win32com is not available."

    # Make absolute & normalized
    docx = str(docx_path.resolve())
    pdf  = str(pdf_path.resolve())

    try:
        word = win32com.client.DispatchEx("Word.Application")
        word.Visible = False
        word.DisplayAlerts = 0
        doc = word.Documents.Open(docx, ReadOnly=True)
        # 17 = wdFormatPDF
        doc.SaveAs(pdf, FileFormat=17)
        doc.Close(False)
        word.Quit()
        return None
    except Exception as e:
        try:
            word.Quit()
        except Exception:
            pass
        return f"Word export failed: {e!s}"

# ---------- LIBREOFFICE ----------
def _find_soffice() -> Optional[str]:
    """Find soffice executable in PATH or common locations."""
    if _DETECTED["soffice_path"]:
        return _DETECTED["soffice_path"]

    exe = "soffice.exe" if _windows() else "soffice"
    # 1) PATH
    p = shutil.which(exe)
    if p:
        _DETECTED["soffice_path"] = p
        return p

    # 2) common unix locations
    candidates_unix = [
        "/usr/bin/soffice",
        "/usr/local/bin/soffice",
        "/snap/bin/libreoffice",
        "/usr/lib/libreoffice/program/soffice",
        "/opt/libreoffice/program/soffice",
    ]
    for c in candidates_unix:
        if Path(c).exists():
            _DETECTED["soffice_path"] = c
            return c

    if _windows():
        # Common installs on Windows
        candidates = [
            r"C:\Program Files\LibreOffice\program\soffice.exe",
            r"C:\Program Files (x86)\LibreOffice\program\soffice.exe",
        ]
        for c in candidates:
            if Path(c).exists():
                _DETECTED["soffice_path"] = c
                return c
    return None

def _convert_with_libreoffice(docx_path: Path, pdf_path: Path, timeout_s: int = 180) -> Optional[str]:
    """Use LibreOffice in headless mode. Returns None on success, else err string."""
    soffice = _find_soffice()
    if not soffice:
        return "LibreOffice (soffice) was not found."

    outdir = pdf_path.parent
    outdir.mkdir(parents=True, exist_ok=True)

    # LibreOffice writes to outdir with the same base name
    # Use --convert-to pdf and explicit outdir
    cmd = [
        soffice,
        "--headless",
        "--invisible",
        "--norestore",
        "--nodefault",
        "--nolockcheck",
        "--convert-to",
        "pdf",
        str(docx_path.resolve()),
        "--outdir",
        str(outdir.resolve())
    ]

    # On some systems LibreOffice needs HOME or USER environment set to a writable dir
    env = os.environ.copy()
    env_home = env.get("HOME") or env.get("USERPROFILE") or str(outdir)
    env["HOME"] = env_home

    try:
        proc = subprocess.run(
            cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE,
            timeout=timeout_s, check=False, env=env
        )
        # some libreoffice versions return non-zero but still produce file; we'll check file existence
        if proc.returncode != 0:
            # include stderr/stdout for debugging
            stderr = proc.stderr.decode("utf-8", "ignore") or proc.stdout.decode("utf-8", "ignore")
            # continue to wait for file but return error if not found
        # LibreOffice names output as <basename>.pdf
    except subprocess.TimeoutExpired:
        return "LibreOffice conversion timed out."
    except Exception as e:
        return f"LibreOffice conversion failed to start: {e!s}"

    # The expected target path
    expected = outdir / (docx_path.stem + ".pdf")

    # Wait briefly for LibreOffice to finish writing
    waits = 0
    while not expected.exists() and waits < 60:
        time.sleep(0.2)
        waits += 1

    # If not found under expected name, try scanning the outdir for a recent .pdf matching stem (case-insensitive)
    if not expected.exists():
        for p in outdir.glob("*.pdf"):
            # match by stem case-insensitive
            if p.stem.lower().startswith(docx_path.stem.lower()):
                expected = p
                break

    if not expected.exists():
        return "LibreOffice didn't produce the PDF."

    # Finally move/rename expected -> pdf_path if needed (to ensure path matches)
    try:
        if expected.resolve() != pdf_path.resolve():
            # Overwrite if existing
            if pdf_path.exists():
                pdf_path.unlink()
            expected.replace(pdf_path)
    except Exception:
        # if replace fails, attempt a copy
        try:
            shutil.copyfile(expected, pdf_path)
        except Exception as e:
            return f"Failed to finalize PDF: {e!s}"

    return None

# ---------- Public API ----------
def detect_pdf_engine() -> Tuple[bool, str]:
    """
    Detect and cache the best available engine.
    Returns (available, details).
    """
    # Prefer Word on Windows because quality is excellent
    if _windows() and _word_available():
        _DETECTED["engine"] = "word"
        return True, "Microsoft Word (COM) detected"

    soffice = _find_soffice()
    if soffice:
        _DETECTED["engine"] = "libreoffice"
        return True, f"LibreOffice at {soffice}"

    _DETECTED["engine"] = None
    return False, "No converter detected (install Microsoft Word or LibreOffice)."

def docx_to_pdf(docx: Path | str, pdf: Path | str) -> Optional[str]:
    """
    Convert DOCX -> PDF.
    Returns None on success, or a short error message string.
    Tries the detected engine; if none detected yet, detects now.
    """
    docx_path = Path(docx)
    pdf_path  = Path(pdf)

    if not docx_path.exists():
        return f"DOCX file not found: {docx_path}"

    # Ensure out dir exists
    pdf_path.parent.mkdir(parents=True, exist_ok=True)

    engine = _DETECTED.get("engine")
    if engine is None:
        # First time we’re called
        available, _ = detect_pdf_engine()
        if not available:
            return "No PDF converter available (install Microsoft Word or LibreOffice)."
        engine = _DETECTED["engine"]

    # Try selected engine, fall back to the other if it fails
    if engine == "word":
        err = _convert_with_word(docx_path, pdf_path)
        if err is None:
            return None
        # fallback to LO
        lo_err = _convert_with_libreoffice(docx_path, pdf_path)
        return lo_err or None

    if engine == "libreoffice":
        err = _convert_with_libreoffice(docx_path, pdf_path)
        if err is None:
            return None
        # On Windows, try Word fallback if available
        if _windows() and _word_available():
            w_err = _convert_with_word(docx_path, pdf_path)
            return w_err or None
        return err

    # Shouldn't reach here
    return "No PDF converter available (install Microsoft Word for docx2pdf or LibreOffice)."

def pdf_converter_status() -> str:
    """Human-friendly status string for health checks / debugging."""
    ok, detail = detect_pdf_engine()
    return f"{'OK' if ok else 'MISSING'} – {detail}"
