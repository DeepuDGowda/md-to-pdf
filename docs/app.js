(() => {
  console.log("UI v28 loaded", new Date().toISOString());

  // --------------------
  // Theme initialization & toggle (light/dark)
  // --------------------
  const THEME_KEY = "doccomposer_theme";
  const root = document.documentElement;

  function applyTheme(theme) {
    if (theme === "light") {
      root.setAttribute("data-theme", "light");
      const btn = document.getElementById("themeToggle");
      if (btn) {
        btn.setAttribute("aria-pressed", "true");
        btn.innerHTML =
          '<i class="ti ti-sun"></i><span class="sr-only">Light theme</span>';
      }
    } else {
      root.removeAttribute("data-theme");
      const btn = document.getElementById("themeToggle");
      if (btn) {
        btn.setAttribute("aria-pressed", "false");
        btn.innerHTML =
          '<i class="ti ti-moon"></i><span class="sr-only">Dark theme</span>';
      }
    }
  }

  function initTheme() {
    try {
      const stored = localStorage.getItem(THEME_KEY);
      if (stored === "light" || stored === "dark") {
        applyTheme(stored === "light" ? "light" : "dark");
        return;
      }
      const prefersLight =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: light)").matches;
      applyTheme(prefersLight ? "light" : "dark");
    } catch (e) {
      applyTheme("dark");
    }
  }

  function bindThemeToggle() {
    const btn = document.getElementById("themeToggle");
    if (!btn) return;
    btn.addEventListener("click", () => {
      const current =
        root.getAttribute("data-theme") === "light" ? "light" : "dark";
      const next = current === "light" ? "dark" : "light";
      applyTheme(next);
      try {
        localStorage.setItem(THEME_KEY, next);
      } catch (e) {}
    });
  }

  initTheme();

  // --------------------
  // Toast manager
  // --------------------
  function ensureToastContainer() {
    let cont = document.getElementById("toastContainer");
    if (!cont) {
      cont = document.createElement("div");
      cont.id = "toastContainer";
      cont.className = "toast-container";
      document.body.appendChild(cont);
    }
    cont.style.display = "";
    return cont;
  }

  function toast(message, options = {}) {
    const {
      type = "info", // info, success, warn, error
      timeout = 6000,
    } = options;

    const cont = ensureToastContainer();

    const t = document.createElement("div");
    t.className = `toast ${type}`;
    t.innerHTML = `
      <div class="icon"><i class="ti ti-alert-circle"></i></div>
      <div class="msg">${String(message)}</div>
      <div class="actions"><button class="close-btn" aria-label="Close">✕</button></div>
    `;
    cont.insertBefore(t, cont.firstChild);

    // replace icon by type
    const iconEl = t.querySelector(".icon i");
    if (iconEl) {
      switch (type) {
        case "success":
          iconEl.className = "ti ti-check";
          break;
        case "warn":
          iconEl.className = "ti ti-alert-triangle";
          break;
        case "error":
          iconEl.className = "ti ti-alert-circle";
          break;
        default:
          iconEl.className = "ti ti-info-circle";
      }
    }

    // show animation frame
    requestAnimationFrame(() => t.classList.add("show"));

    // close handler
    const closeBtn = t.querySelector(".close-btn");
    if (closeBtn) closeBtn.addEventListener("click", () => removeToast(t));

    const timer = setTimeout(() => removeToast(t), timeout);

    function removeToast(el) {
      clearTimeout(timer);
      el.classList.remove("show");
      setTimeout(() => {
        try {
          el.remove();
        } catch (e) {}
        // hide container if empty
        if (cont.children.length === 0) cont.style.display = "none";
      }, 260);
    }

    return {
      close: () => removeToast(t),
    };
  }

  // If server provided a message, show it as a warning toast
  try {
    if (window._server_message) {
      const msg = window._server_message;
      if (msg) {
        toast(msg, { type: "warn", timeout: 8000 });
      }
    }
  } catch (e) {
    console.warn("Toast show failed:", e);
  }

  // --------------------
  // Refs
  // --------------------
  const progress = document.getElementById("progressOverlay");
  const convertBtn = document.getElementById("convertBtn");
  const form = document.getElementById("convertForm");

  const pickRawMdBtn = document.getElementById("pickRawMd");
  const pickTplBtn = document.getElementById("pickTpl");

  const resetMdBtn = document.getElementById("resetMd");
  const resetTplBtn = document.getElementById("resetTpl");
  const resetAllBtn = document.getElementById("resetAll");

  const rawMdInput = document.getElementById("rawMdInput");
  const tplInput = document.getElementById("tplInput");
  const comboInput = document.getElementById("comboInput");

  const mdChips = document.getElementById("mdChips"); // visually-hidden but kept in DOM
  const mdCountDisplay = document.getElementById("mdCountDisplay");
  const mdList = document.getElementById("mdList");
  const tplName = document.getElementById("tplName");
  const tplRowContainer = document.getElementById("tplRowContainer");

  const resultPreview = document.getElementById("resultPreview");
  const clientWarning = document.getElementById("clientWarning");

  // state
  let mdFiles = [];
  let tplFile = null;
  let dragIndex = null;
  const MAX_MD = 20;

  // --------------------
  // Utility: display client warning (fallback) and toast
  // --------------------
  function showClientWarning(msg) {
    // toast
    try {
      toast(msg, { type: "warn", timeout: 7000 });
    } catch (e) {}
    // fallback area
    if (clientWarning) {
      const el = document.createElement("div");
      el.className = "client-warning";
      el.textContent = msg;
      clientWarning.appendChild(el);
      setTimeout(() => {
        try {
          clientWarning.removeChild(el);
        } catch (e) {}
      }, 6500);
    }
  }

  // --------------------
  // File helpers
  // --------------------
  function updateConvertEnabled() {
    const ok = mdFiles.length > 0 && !!tplFile;
    convertBtn.disabled = !ok;

    if (ok) convertBtn.classList.remove("btn-disabled");
    else convertBtn.classList.add("btn-disabled");

    if (mdFiles.length) {
      mdCountDisplay.textContent = `${mdFiles.length} file${
        mdFiles.length > 1 ? "s" : ""
      }`;
      mdCountDisplay.classList.remove("muted-empty");
    } else {
      mdCountDisplay.textContent = "No Markdown files yet";
      mdCountDisplay.classList.add("muted-empty");
    }

    try {
      updatePdfButtonState();
    } catch (e) {}
  }

  function renderMdChips() {
    mdChips.querySelectorAll(".chip.md").forEach((n) => n.remove());

    mdFiles.forEach((f, idx) => {
      const chip = document.createElement("span");
      chip.className = "chip md";
      chip.title = `Section ${idx + 1}`;
      chip.innerHTML = `
        <i class="ti ti-file-text"></i> ${f.name}
        <button type="button" class="chip-x" aria-label="Remove ${f.name}" data-del="${idx}">
          <i class="ti ti-x"></i>
        </button>
      `;
      mdChips.appendChild(chip);
    });

    mdChips.querySelectorAll("[data-del]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const i = +btn.dataset.del;
        mdFiles.splice(i, 1);
        renderAllMd();
      });
    });
  }

  function attachRowDnD(row, idx) {
    row.draggable = true;
    row.dataset.idx = idx;

    row.addEventListener("dragstart", (e) => {
      dragIndex = idx;
      row.classList.add("dragging");
      e.dataTransfer.effectAllowed = "move";
      e.dataTransfer.setData("text/plain", String(idx));
    });

    row.addEventListener("dragend", () => {
      row.classList.remove("dragging");
      dragIndex = null;
      mdList
        .querySelectorAll(".drag-over")
        .forEach((el) => el.classList.remove("drag-over"));
    });

    row.addEventListener("dragover", (e) => {
      e.preventDefault();
      if (dragIndex === null) return;
      row.classList.add("drag-over");
      e.dataTransfer.dropEffect = "move";
    });

    row.addEventListener("dragleave", () => row.classList.remove("drag-over"));

    row.addEventListener("drop", (e) => {
      e.preventDefault();
      row.classList.remove("drag-over");
      const from = dragIndex;
      const to = parseInt(row.dataset.idx, 10);
      if (Number.isInteger(from) && Number.isInteger(to) && from !== to) {
        const moved = mdFiles.splice(from, 1)[0];
        mdFiles.splice(to, 0, moved);
        renderAllMd();
      }
    });
  }

  function renderMdList() {
    mdList.innerHTML = "";
    if (!mdFiles.length) {
      mdList.innerHTML = `
        <div class="placeholder small">
          <i class="ti ti-list-numbers"></i>
          <p>No Markdown files yet. Add up to ${MAX_MD} and drag rows to reorder.</p>
        </div>`;
      return;
    }

    mdFiles.forEach((f, idx) => {
      const row = document.createElement("div");
      row.className = "row-file";
      row.innerHTML = `
        <div class="file-left">
          <span style="width:12px"></span>
          <div class="file-name">${idx + 1}. ${f.name}</div>
        </div>
        <div class="file-actions">
          <button class="btn ghost small-btn" data-up="${idx}" ${
        idx === 0 ? "disabled" : ""
      } title="Move up"><i class="ti ti-arrow-up"></i></button>
          <button class="btn ghost small-btn" data-down="${idx}" ${
        idx === mdFiles.length - 1 ? "disabled" : ""
      } title="Move down"><i class="ti ti-arrow-down"></i></button>
          <button class="btn-remove" data-del="${idx}" title="Remove"><i class="ti ti-x"></i> Remove</button>
        </div>
      `;
      mdList.appendChild(row);
      attachRowDnD(row, idx);
    });

    mdList.querySelectorAll("[data-del]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const i = +btn.dataset.del;
        mdFiles.splice(i, 1);
        renderAllMd();
      });
    });
    mdList.querySelectorAll("[data-up]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const i = +btn.dataset.up;
        if (i > 0) {
          [mdFiles[i - 1], mdFiles[i]] = [mdFiles[i], mdFiles[i - 1]];
          renderAllMd();
        }
      });
    });
    mdList.querySelectorAll("[data-down]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const i = +btn.dataset.down;
        if (i < mdFiles.length - 1) {
          [mdFiles[i + 1], mdFiles[i]] = [mdFiles[i], mdFiles[i + 1]];
          renderAllMd();
        }
      });
    });
  }

  // Render template as a row similar to md rows (but not draggable)
  function renderTemplateRow() {
    tplRowContainer.innerHTML = "";
    if (!tplFile) return;

    const tplRow = document.createElement("div");
    tplRow.className = "row-file";
    tplRow.innerHTML = `
      <div class="file-left">
        <span style="width:12px"></span>
        <div class="file-name"><i class="ti ti-template" style="margin-right:8px"></i> Template: ${tplFile.name}</div>
      </div>
      <div class="file-actions">
        <button class="btn-remove" id="tpl-remove" title="Reset template"><i class="ti ti-x"></i> Reset</button>
      </div>
    `;
    tplRowContainer.appendChild(tplRow);

    const removeBtn = document.getElementById("tpl-remove");
    if (removeBtn) {
      removeBtn.addEventListener("click", () => {
        tplFile = null;
        tplInput.value = "";
        tplName.textContent = "No template chosen";
        renderTemplateRow();
        updateConvertEnabled();
      });
    }
  }

  function renderAllMd() {
    renderMdChips();
    renderMdList();
    renderTemplateRow();
    updateConvertEnabled();
    try {
      updatePdfButtonState();
    } catch (e) {}
  }

  // Helper to determine icon class for a file name (for server-provided "uploaded_files" or client preview)
  function iconForFilename(name) {
    const ext = (name || "").split(".").pop().toLowerCase();
    if (["md", "markdown", "mdx"].includes(ext)) return "ti ti-markdown";
    if (["doc", "docx"].includes(ext)) return "ti ti-file-type-docx";
    if (["pdf"].includes(ext)) return "ti ti-file-type-pdf";
    if (["png", "jpg", "jpeg", "gif", "bmp", "tiff", "svg"].includes(ext))
      return "ti ti-image";
    return "ti ti-file-text";
  }

  function addMdFiles(list) {
    const incoming = Array.from(list || []).filter(
      (f) => /\.(m(d|arkdown|dx))$/i.test(f.name) || /\.mdx$/i.test(f.name)
    );
    if (!incoming.length) return;

    // if incoming files exceed remaining slots, show toast & only add up to MAX_MD
    const free = MAX_MD - mdFiles.length;
    if (incoming.length > free) {
      showClientWarning(
        `Only ${free} more file${
          free === 1 ? "" : "s"
        } allowed — extra files were ignored.`
      );
    }

    for (const f of incoming.slice(0, free)) {
      if (mdFiles.length >= MAX_MD) break;
      const exists = mdFiles.some(
        (x) =>
          x.name === f.name &&
          x.size === f.size &&
          x.lastModified === f.lastModified
      );
      if (!exists) mdFiles.push(f);
    }
    renderAllMd();
  }

  function setTemplate(file) {
    tplFile = file;
    tplName.textContent = file ? file.name : "No template chosen";
    renderTemplateRow();
    updateConvertEnabled();
  }

  // pickers
  pickRawMdBtn.addEventListener("click", () => rawMdInput.click());
  pickTplBtn && pickTplBtn.addEventListener("click", () => tplInput.click());

  rawMdInput.addEventListener("change", () => {
    addMdFiles(rawMdInput.files);
    rawMdInput.value = "";
  });
  tplInput.addEventListener("change", () => {
    setTemplate((tplInput.files && tplInput.files[0]) || null);
  });

  // dropzone
  const dz = document.querySelector("[data-dropzone]");
  if (dz) {
    dz.addEventListener("click", () => comboInput.click());
    comboInput.addEventListener("change", () => {
      const arr = Array.from(comboInput.files || []);
      if (!arr.length) return;
      const md = arr.filter(
        (f) => /\.(m(d|arkdown|dx))$/i.test(f.name) || /\.mdx$/i.test(f.name)
      );
      const dx = arr.filter((f) => /\.docx$/i.test(f.name));
      if (md.length) addMdFiles(md);
      if (dx.length && !tplFile) setTemplate(dx[0]);
      comboInput.value = "";
    });

    dz.addEventListener("dragover", (e) => {
      e.preventDefault();
      dz.classList.add("active");
    });
    dz.addEventListener("dragleave", () => dz.classList.remove("active"));
    dz.addEventListener("drop", (e) => {
      e.preventDefault();
      dz.classList.remove("active");
      const arr = Array.from(e.dataTransfer.files || []);
      const md = arr.filter(
        (f) => /\.(m(d|arkdown|dx))$/i.test(f.name) || /\.mdx$/i.test(f.name)
      );
      const dx = arr.filter((f) => /\.docx$/i.test(f.name));
      if (md.length) addMdFiles(md);
      if (dx.length && !tplFile) setTemplate(dx[0]);
    });
  }

  // resets
  resetMdBtn.addEventListener("click", () => {
    mdFiles = [];
    renderAllMd();
  });
  resetTplBtn &&
    resetTplBtn.addEventListener("click", () => {
      setTemplate(null);
      tplInput.value = "";
    });
  resetAllBtn.addEventListener("click", () => {
    mdFiles = [];
    renderAllMd();
    setTemplate(null);
    rawMdInput.value = "";
    tplInput.value = "";
    comboInput.value = "";
  });

  // helper: show immediate preview placeholder/spinner while converting
  function showPreviewLoading() {
    if (!resultPreview) return;
    resultPreview.innerHTML = `
      <div style="display:flex;flex-direction:column;gap:10px;height:100%;">
        <div style="display:flex;justify-content:flex-end;">
          <button class="btn ghost small-btn" id="openPreviewBtn" disabled><i class="ti ti-external-link"></i> Open</button>
        </div>
        <div class="placeholder" style="display:flex;flex-direction:column;align-items:center;justify-content:center;padding:28px;flex:1;">
          <div class="spinner" style="width:36px;height:36px;border-width:4px;margin-bottom:12px;"></div>
          <div style="color:var(--muted)">Preparing preview…</div>
          <div class="small" style="margin-top:8px;color:var(--muted)">This can take a few seconds depending on file size.</div>
        </div>
      </div>
    `;
  }

  // submit
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!(mdFiles.length && tplFile)) {
      toast("Please add Markdown sections and a Template (.docx).", {
        type: "warn",
      });
      return;
    }

    convertBtn.disabled = true;
    convertBtn.classList.add("is-loading");
    progress && progress.removeAttribute("aria-hidden");
    progress && progress.classList.add("show");

    showPreviewLoading();

    try {
      const fd = new FormData();
      mdFiles.forEach((f) => fd.append("raw_files", f, f.name));
      fd.append("template_file", tplFile, tplFile.name);

      const imgStyle = document.getElementById("imgStyle");
      if (imgStyle && imgStyle.checked) {
        fd.append("img_style", "1");
      }

      const resp = await fetch("/convert", { method: "POST", body: fd });
      const html = await resp.text();

      document.open("text/html", "replace");
      document.write(html);
      document.close();
    } catch (err) {
      progress && progress.classList.remove("show");
      toast("Upload/convert failed: " + (err?.message || err), {
        type: "error",
      });
      convertBtn.disabled = false;
      convertBtn.classList.remove("is-loading");
    }
  });

  // --------------------
  // PDF button enable/disable logic (uses .btn-disabled class)
  // --------------------
  function findPdfDownloadControls() {
    const res = [];
    const container = document.querySelector(".result-actions") || document;
    const candidates = Array.from(container.querySelectorAll("a, button"));
    candidates.forEach((el) => {
      const txt = (el.textContent || "").trim().toLowerCase();
      if (
        txt.includes("download pdf") ||
        (txt.includes("pdf") && txt.includes("download"))
      ) {
        res.push(el);
      }
    });
    return res;
  }

  function updatePdfButtonState() {
    const iframe = document.querySelector(".pdf-preview-iframe");
    const previewError =
      document.querySelector(".preview-note.error") ||
      Array.from(document.querySelectorAll(".placeholder p")).find((p) =>
        (p.textContent || "").toLowerCase().includes("pdf preview unavailable")
      );

    const pdfAvailablePreview = !!(
      iframe &&
      iframe.getAttribute("src") &&
      !previewError
    );

    const controls = findPdfDownloadControls();
    if (!controls.length) return;

    controls.forEach((ctrl) => {
      if (ctrl.tagName.toLowerCase() === "button") {
        ctrl.disabled = !pdfAvailablePreview;
        if (!pdfAvailablePreview) {
          ctrl.classList.add("btn-disabled");
          ctrl.setAttribute("aria-disabled", "true");
        } else {
          ctrl.classList.remove("btn-disabled");
          ctrl.removeAttribute("aria-disabled");
        }
        return;
      }

      if (ctrl.tagName.toLowerCase() === "a") {
        if (!pdfAvailablePreview) {
          if (!ctrl.dataset._hrefBackup) {
            ctrl.dataset._hrefBackup = ctrl.getAttribute("href") || "";
          }
          ctrl.removeAttribute("href");
          ctrl.classList.add("btn-disabled");
          ctrl.setAttribute("aria-disabled", "true");
          ctrl.title = ctrl.title || "PDF not available";
        } else {
          const stored = ctrl.dataset._hrefBackup;
          if (stored) {
            ctrl.setAttribute("href", stored);
            delete ctrl.dataset._hrefBackup;
          }
          ctrl.classList.remove("btn-disabled");
          ctrl.removeAttribute("aria-disabled");
          ctrl.title = "";
        }
      }
    });

    const docxControls = Array.from(
      document.querySelectorAll(".result-actions a, .result-actions button")
    ).filter((el) => {
      const txt = (el.textContent || "").trim().toLowerCase();
      return txt.includes("download docx") || txt.includes("download docx");
    });
    const anyAnchorDocx = Array.from(
      document.querySelectorAll(".result-actions a")
    ).some((a) =>
      (a.textContent || "").toLowerCase().includes("download docx")
    );
    if (!anyAnchorDocx) {
      docxControls.forEach((d) => {
        if (d.tagName.toLowerCase() === "button") {
          d.disabled = true;
          d.classList.add("btn-disabled");
          d.setAttribute("aria-disabled", "true");
        }
      });
    }
  }

  document.addEventListener(
    "click",
    (ev) => {
      const a =
        ev.target.closest && ev.target.closest('a[aria-disabled="true"]');
      if (a) {
        ev.preventDefault();
        ev.stopPropagation();
      }
    },
    { capture: true }
  );

  window.addEventListener("load", () => {
    try {
      bindThemeToggle();
    } catch (e) {}
    try {
      updatePdfButtonState();
    } catch (e) {}
  });

  setTimeout(() => {
    try {
      updatePdfButtonState();
    } catch (e) {}
  }, 600);

  // init
  renderAllMd();
})();
