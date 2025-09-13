# run_server.py
"""
Click-to-launch server helper for Document Composer.

Usage:
  - python run_server.py        # launches on an available port and opens browser
  - python run_server.py --port 5055  # force port
  - python run_server.py --host 0.0.0.0 --port 8080
"""

from __future__ import annotations
import argparse
import socket
import sys
import threading
import webbrowser
import time
from contextlib import closing
from pathlib import Path

# Import the Flask app from your existing app.py
# app.py must expose `app` (Flask instance)
try:
    # prefer package-style import if your project is a package; otherwise this will import app.py
    from app import app  # type: ignore
except Exception as e:
    print("ERROR: Failed to import app from app.py:", e)
    sys.exit(1)


def find_free_port(start: int = 5000, end: int = 5999) -> int:
    """Find a free port in the given range (fallback to ephemeral)."""
    for port in range(start, end + 1):
        with closing(socket.socket(socket.AF_INET, socket.SOCK_STREAM)) as sock:
            try:
                sock.bind(("0.0.0.0", port))
                return port
            except OSError:
                continue
    # fallback
    with closing(socket.socket()) as s:
        s.bind(("", 0))
        return s.getsockname()[1]


def get_local_ips() -> list[str]:
    """Return a list of likely local IP addresses for this machine."""
    ips = set()
    try:
        # one simple method: connect to a public DNS IP (does not actually send data)
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.settimeout(0.5)
        try:
            s.connect(("8.8.8.8", 80))
            ips.add(s.getsockname()[0])
        finally:
            s.close()
    except Exception:
        pass

    # also include localhost and all addresses from gethostbyname_ex
    ips.add("127.0.0.1")
    try:
        hn = socket.gethostname()
        parts = socket.gethostbyname_ex(hn)[2]
        for p in parts:
            ips.add(p)
    except Exception:
        pass

    return sorted(ips)


def open_browser_when_up(url: str, timeout: float = 6.0):
    """Attempt to open the browser after short delay so server has time to start."""
    # small delay to allow the server thread to bind
    time.sleep(0.8)
    try:
        webbrowser.open(url, new=2)
    except Exception:
        # Best-effort only; do not fail
        print("Hint: open this URL in your browser:", url)


def main():
    parser = argparse.ArgumentParser(description="Start Document Composer (click-to-run).")
    parser.add_argument("--host", default="0.0.0.0", help="Host to bind (default 0.0.0.0)")
    parser.add_argument("--port", type=int, default=None, help="Port (default: auto-find 5000-5999)")
    parser.add_argument("--prefer-port", type=int, default=5055, help="Prefer this port when auto-finding")
    parser.add_argument("--no-open", action="store_true", help="Do not open browser automatically")
    args = parser.parse_args()

    # choose port
    port = args.port or None
    if port is None:
        # try prefer-port first
        port_try = args.prefer_port or 5055
        with closing(socket.socket(socket.AF_INET, socket.SOCK_STREAM)) as sock:
            try:
                sock.bind((args.host, port_try))
                port = port_try
            except OSError:
                # find free port
                port = find_free_port(5000, 5999)

    host = args.host

    # Informational output
    print("Starting Document Composer")
    print("Project directory:", Path(__file__).resolve().parent)
    print(f"Binding to {host}:{port}")
    local_ips = get_local_ips()
    print("Accessible on your machine at:")
    print(f"  http://127.0.0.1:{port}/")
    for ip in local_ips:
        if ip and ip != "127.0.0.1":
            print(f"  http://{ip}:{port}/  (LAN)")

    url_to_open = f"http://127.0.0.1:{port}/"

    if not args.no_open:
        # open browser in separate thread so it doesn't block server thread
        t = threading.Thread(target=open_browser_when_up, args=(url_to_open,), daemon=True)
        t.start()

    # Run Flask app
    # Note: use threaded=True to allow concurrent uploads, use reloader=False for packaged exe
    try:
        # If running from packaged executable, Flask's debug/reloader should be disabled.
        app.run(host=host, port=port, threaded=True, debug=False, use_reloader=False)
    except Exception as e:
        print("ERROR: failed to start Flask app:", e)
        sys.exit(1)


if __name__ == "__main__":
    main()
