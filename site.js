(function () {
  "use strict";

  var PAGES = {
    "index.html": { title: "Grok the Rock - Home", active: "home", kind: "home" },
    "quiet-stories.html": { titleI18n: "site.title", title: "Grok - Three Quiet Stories", active: "book", kind: "book" },
    "about-grok.html": { titleI18n: "site.title.about", title: "Grok the Rock - About Grok", active: "about", kind: "article" },
    "grok-rules.html": { titleI18n: "site.title.rules", title: "Grok the Rock - Rules of Relating", active: "rules", kind: "article" },
    "tall-tales.html": { titleI18n: "hai.site.title", title: "Lord Ikthiss - Three Tall Tales", active: "tall", kind: "book" },
    "book-text.html": { titleI18n: "site.title.text", title: "Grok the Rock - All Book Text", active: "text", kind: "article" }
  };

  var NAV = [
    { key: "rules", i18n: "nav.rules", label: "Rules", href: "grok-rules.html" },
    { key: "about", i18n: "nav.about", label: "About", href: "about-grok.html" },
    { key: "text", i18n: "nav.text", label: "Both", href: "book-text.html" },
    { key: "book", i18n: "nav.book", label: "Quiet Stories", href: "quiet-stories.html" },
    { key: "tall", i18n: "nav.tall", label: "Tall Tales", href: "tall-tales.html" }
  ];

  function currentPage() {
    var base = (location.pathname || "").split("/").pop();
    if (!base || base.charAt(base.length - 1) === "/") base = "index.html";
    return PAGES[base] || { titleI18n: null, title: document.title, active: null, kind: null };
  }

  function buildNavLinks(active) {
    return NAV.map(function (item) {
      if (item.key === active) {
        return '<span class="site-link active" aria-current="page" data-i18n="' +
          item.i18n + '">' + item.label + "</span>";
      }
      return '<a class="site-link" href="' + item.href + '" data-i18n="' +
        item.i18n + '">' + item.label + "</a>";
    }).join("\n        ");
  }

  function buildChrome(page) {
    return (
      '<div class="site-chrome">\n' +
      '  <header class="site-header">\n' +
      '    <span class="site-title"' + (page.titleI18n ? ' data-i18n="' + page.titleI18n + '"' : "") + ">" + page.title + "</span>\n" +
      '    <button type="button" class="nav-toggle site-link" aria-expanded="false" aria-controls="site-drawer" data-i18n="nav.menu">Menu</button>\n' +
      "  </header>\n" +
      '  <div class="nav-backdrop" hidden></div>\n' +
      '  <div id="site-drawer" class="site-drawer">\n' +
      '      <button type="button" class="nav-close" data-i18n="nav.close">Close</button>\n' +
      '      <nav class="site-nav" aria-label="Site">\n' +
      '        <button class="site-link icon-btn" id="print-btn" type="button" aria-labelledby="print-lbl">\n' +
      '          <svg class="icon-btn-glyph" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" d="M7 9V4h10v5M7 18H5a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2M7 14h10v6H7z"/></svg>\n' +
      '          <span class="icon-btn-label" id="print-lbl" data-i18n="nav.print">Print</span>\n' +
      "        </button>\n" +
      '        <button class="site-link icon-btn" id="download-archive-btn" type="button" aria-labelledby="download-lbl">\n' +
      '          <svg class="icon-btn-glyph" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" d="M12 3v12m0 0l-4-4m4 4l4-4M5 19h14"/></svg>\n' +
      '          <span class="icon-btn-label" id="download-lbl" data-i18n="nav.download">Download</span>\n' +
      "        </button>\n" +
      '        <select id="lang-select" class="site-link" aria-label="Language"></select>\n' +
      "        " + buildNavLinks(page.active) + "\n" +
      "      </nav>\n" +
      "    </div>\n" +
      "</div>\n" +
      '  <a id="home-btn" class="site-link icon-btn' + (page.active === "home" ? " active" : "") + '" href="index.html" aria-labelledby="home-lbl">\n' +
      '    <svg class="icon-btn-glyph" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" d="M4 12l8-7 8 7M6 10.5V19a1 1 0 0 0 1 1h3v-5h4v5h3a1 1 0 0 0 1-1v-8.5"/></svg>\n' +
      '    <span class="icon-btn-label" id="home-lbl" data-i18n="nav.home">Home</span>\n' +
      "  </a>\n" +
      '<dialog id="download-dialog" class="site-dialog" aria-labelledby="download-dialog-title">\n' +
      '  <h2 id="download-dialog-title" data-i18n="download.dialogTitle">Download the site</h2>\n' +
      '  <p data-i18n="download.dialogDesc">Downloads a single .zip with all 5 web pages — Quiet Stories, Tall Tales, Rules, About, and All Book Text — plus every image, style, and script they need to read the whole site offline.</p>\n' +
      '  <p class="site-dialog-status" id="download-status" role="status" aria-live="polite"></p>\n' +
      '  <div class="site-dialog-actions">\n' +
      '    <button type="button" class="site-link" id="download-cancel-btn" data-i18n="download.dialogCancel">Cancel</button>\n' +
      '    <button type="button" class="site-link" id="download-confirm-btn" data-i18n="download.dialogConfirm" autofocus>Download</button>\n' +
      "  </div>\n" +
      "</dialog>"
    );
  }

  function init() {
    var page = currentPage();
    document.body.classList.add("page-" + (page.active || "book"));
    var pageStyle = document.createElement("style");
    pageStyle.setAttribute("data-print-page", "");
    pageStyle.textContent = page.kind === "book"
      ? "@page { size: Letter landscape; margin: 0; }"
      : "@page { size: Letter portrait; margin: 0.4in; }";
    document.head.appendChild(pageStyle);
    document.body.insertAdjacentHTML("afterbegin", buildChrome(page));

    var chrome =
      document.querySelector(".site-chrome") ||
      document.querySelector(".site-header");
    var toggle = document.querySelector(".nav-toggle");
    var drawer = document.getElementById("site-drawer");
    var backdrop = document.querySelector(".nav-backdrop");
    var closeBtn = document.querySelector(".nav-close");
    if (!toggle || !drawer || !chrome) return;

    var lastFocus = null;
    var mq = window.matchMedia("(max-width: 720px)");
    var homeBtn = document.getElementById("home-btn");

    function placeOverlay() {
      if (mq.matches) {
        if (backdrop && backdrop.parentElement !== document.body) {
          document.body.appendChild(backdrop);
        }
        if (drawer.parentElement !== document.body) {
          document.body.appendChild(drawer);
        }
      } else {
        setOpen(false);
        if (drawer.parentElement !== chrome) {
          chrome.appendChild(drawer);
        }
        if (backdrop && backdrop.parentElement !== chrome) {
          chrome.appendChild(backdrop);
        }
        if (homeBtn && homeBtn.parentElement !== chrome) {
          chrome.appendChild(homeBtn);
        }
      }
    }

    function isOpen() {
      return document.body.classList.contains("nav-open");
    }

    function setOpen(open) {
      document.body.classList.toggle("nav-open", open);
      chrome.classList.toggle("nav-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      if (backdrop) {
        if (open) backdrop.removeAttribute("hidden");
        else backdrop.setAttribute("hidden", "");
      }
      if (open) {
        lastFocus = document.activeElement;
        var focusable = drawer.querySelector(
          "button, [href], select, input, textarea, [tabindex]:not([tabindex='-1'])"
        );
        if (focusable) focusable.focus();
      } else if (lastFocus && typeof lastFocus.focus === "function") {
        lastFocus.focus();
        lastFocus = null;
      }
    }

    placeOverlay();
    if (typeof mq.addEventListener === "function") {
      mq.addEventListener("change", placeOverlay);
    } else if (typeof mq.addListener === "function") {
      mq.addListener(placeOverlay);
    }

    toggle.addEventListener("click", function () {
      if (mq.matches) placeOverlay();
      setOpen(!isOpen());
    });
    if (closeBtn) {
      closeBtn.addEventListener("click", function () {
        setOpen(false);
      });
    }
    if (backdrop) {
      backdrop.addEventListener("click", function () {
        setOpen(false);
      });
    }
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && isOpen()) setOpen(false);
    });
    drawer.querySelectorAll("a.site-link").forEach(function (a) {
      a.addEventListener("click", function () {
        setOpen(false);
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();


(function () {
  "use strict";

  var uid = 0;
  var PH_SRC =
    "data:image/svg+xml," +
    encodeURIComponent(
      '<svg xmlns="http://www.w3.org/2000/svg" width="1650" height="2550">' +
        "<defs><linearGradient id=\"g\" x1=\"0\" y1=\"0\" x2=\"0\" y2=\"1\">" +
        '<stop offset="0%" stop-color="#e8e0d0"/>' +
        '<stop offset="42%" stop-color="#d4cbb6"/>' +
        '<stop offset="100%" stop-color="#efe7d8"/>' +
        "</linearGradient>" +
        '<pattern id="d" width="48" height="48" patternUnits="userSpaceOnUse">' +
        '<circle cx="4" cy="4" r="1.2" fill="#c4b8a0" opacity="0.45"/>' +
        "</pattern></defs>" +
        '<rect width="100%" height="100%" fill="url(#g)"/>' +
        '<rect width="100%" height="100%" fill="url(#d)"/>' +
        '<rect x="90" y="90" width="1470" height="2370" rx="28" fill="none" stroke="#b5a890" stroke-width="3" stroke-dasharray="18 14" opacity="0.55"/>' +
        '<text x="50%" y="52%" text-anchor="middle" fill="#9a8f7a" font-family="Georgia,serif" font-size="56">illustration pending</text>' +
        "</svg>"
    );

  function labelShow() {
    var d = window.I18N && window.I18N[document.documentElement.getAttribute("data-lang") || "en"];
    return (d && d["ui.imgDesc"]) || "Image description";
  }

  function labelHide() {
    var d = window.I18N && window.I18N[document.documentElement.getAttribute("data-lang") || "en"];
    return (d && d["ui.imgDescHide"]) || "Hide image description";
  }

  function altText(img) {
    return (img.getAttribute("alt") || "").trim();
  }

  function setOpen(page, open) {
    var btn = page.querySelector(".img-desc-btn");
    var panel = page.querySelector(".img-desc-panel");
    if (!btn || !panel) return;
    page.classList.toggle("img-desc-open", open);
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    btn.setAttribute("aria-label", open ? labelHide() : labelShow());
  }

  function syncText(page) {
    var img = page.querySelector(":scope > img");
    var panel = page.querySelector(".img-desc-panel");
    var ph = page.querySelector(".img-ph-alt");
    if (!img) return;
    var text = altText(img);
    if (panel) panel.textContent = text;
    if (ph) ph.textContent = text;
    if (!text) {
      setOpen(page, false);
      var btn = page.querySelector(".img-desc-btn");
      if (btn) btn.hidden = true;
    } else {
      var b = page.querySelector(".img-desc-btn");
      if (b) b.hidden = false;
    }
  }

  function markMissing(page, img) {
    if (page.classList.contains("img-missing")) return;
    page.classList.add("img-missing");
    img.classList.add("img-ph");
    if (img.getAttribute("src") !== PH_SRC) {
      img.src = PH_SRC;
    }
    var ph = page.querySelector(".img-ph-alt");
    if (!ph) {
      ph = document.createElement("div");
      ph.className = "img-ph-alt";
      ph.setAttribute("aria-hidden", "true");
      page.appendChild(ph);
    }
    ph.textContent = altText(img);
  }

  function watchMissing(page, img) {
    function onErr() {
      img.removeEventListener("error", onErr);
      markMissing(page, img);
    }
    img.addEventListener("error", onErr);
    if (img.complete && img.naturalWidth === 0 && img.getAttribute("src")) {
      markMissing(page, img);
    }
  }

  function mount(img) {
    var page = img.parentElement;
    if (!page || !page.classList.contains("page")) return;
    if (page.querySelector(".img-desc-btn")) return;
    var alt = altText(img);
    if (!alt) return;

    uid += 1;
    var panelId = "img-desc-panel-" + uid;

    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "img-desc-btn";
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("aria-controls", panelId);
    btn.setAttribute("aria-label", labelShow());
    btn.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" focusable="false">' +
      '<circle cx="8" cy="8" r="6.25" fill="none" stroke="currentColor" stroke-width="1.5"/>' +
      '<circle cx="8" cy="5" r="1" fill="currentColor"/>' +
      '<path d="M8 7.25v4" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>' +
      "</svg>";

    var panel = document.createElement("div");
    panel.className = "img-desc-panel";
    panel.id = panelId;
    panel.setAttribute("aria-hidden", "true");
    panel.textContent = alt;

    btn.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();
      setOpen(page, !page.classList.contains("img-desc-open"));
    });

    page.appendChild(btn);
    page.appendChild(panel);
    watchMissing(page, img);
  }

  function refreshAll() {
    document.querySelectorAll(".page:has(.img-desc-btn)").forEach(function (page) {
      syncText(page);
      var btn = page.querySelector(".img-desc-btn");
      var open = page.classList.contains("img-desc-open");
      if (btn) {
        btn.setAttribute("aria-label", open ? labelHide() : labelShow());
        btn.setAttribute("aria-expanded", open ? "true" : "false");
      }
    });
  }

  function init() {
    document.querySelectorAll(".page > img").forEach(mount);

    document.addEventListener("i18n:applied", refreshAll);

    document.addEventListener("keydown", function (e) {
      if (e.key !== "Escape") return;
      var open = document.querySelector(".page.img-desc-open");
      if (!open) return;
      setOpen(open, false);
      var btn = open.querySelector(".img-desc-btn");
      if (btn) btn.focus();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();


(function () {
  "use strict";

  var printBtn = document.getElementById("print-btn");
  if (printBtn) {
    printBtn.addEventListener("click", function () {
      window.print();
    });
  }

  (function () {
    function displayTitle() {
      var st = document.querySelector(".site-title");
      return (st && st.textContent.trim()) || document.title;
    }
    function toPrintTitle(t) {
      return t
        .replace(/[^\p{L}\p{N}\s-]/gu, "")
        .split(/\s+/)
        .filter(Boolean)
        .map(function (w, i) {
          return i === 0 ? w : w.charAt(0).toUpperCase() + w.slice(1);
        })
        .join("");
    }
    window.addEventListener("beforeprint", function () {
      document.title = toPrintTitle(displayTitle());
    });
    window.addEventListener("afterprint", function () {
      document.title = displayTitle();
    });
  })();

  (function () {
    var video = document.getElementById("cover-video");
    if (!video) return;
    var coverImg = document.querySelector(".book-single.cover .cover-img");
    var delayBetweenLoops = 5000;

    function showImage() {
      try { video.pause(); } catch (e) {}
      video.removeAttribute("autoplay");
      video.style.display = "none";
      if (coverImg) coverImg.style.display = "block";
    }

    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      showImage();
      return;
    }

    function startLoop() {
      video.addEventListener("ended", function () {
        setTimeout(function () {
          video.currentTime = 0;
          var p = video.play();
          if (p && typeof p.catch === "function") p.catch(function () {});
        }, delayBetweenLoops);
      });
    }

    video.addEventListener("error", showImage, true);
    var src = video.querySelector("source");
    if (src) src.addEventListener("error", showImage);

    var played = video.play();
    if (played && typeof played.catch === "function") {
      played.catch(function () { showImage(); });
    }
    startLoop();
  })();
})();


(function () {
  "use strict";

  var ZIP_NAME = "grok-the-rock-site.zip";
  var ROOT = "grok-the-rock/";

  // Runnable site only. Add new page images / locales here when they ship.
  var FILES = [
    "LICENSE",
    "index.html",
    "quiet-stories.html",
    "about-grok.html",
    "grok-rules.html",
    "tall-tales.html",
    "book-text.html",
    "site.js",
    "site.css",
    "vendor/fflate.min.js",
    "lang/ar.js",
    "lang/de.js",
    "lang/en.js",
    "lang/es.js",
    "lang/fa.js",
    "lang/fr.js",
    "lang/ha.js",
    "lang/he.js",
    "lang/he-phon.js",
    "lang/hi.js",
    "lang/it.js",
    "lang/ja.js",
    "lang/ko.js",
    "lang/nl.js",
    "lang/no.js",
    "lang/pa.js",
    "lang/pt.js",
    "lang/ru.js",
    "lang/ta.js",
    "lang/ur.js",
    "lang/zh.js",
    "images/ico/apple-touch-icon.png",
    "images/ico/favicon-16x16.png",
    "images/ico/favicon-32x32.png",
    "images/ico/favicon.ico",
    "images/ico/icon-192.png",
    "images/ico/icon-512.png",
    "images/cover-grok-2e32b43d-6ffc-4214-8e76-5c2fef65b815.jpg",
    "images/dedication-grok-4d644bb0-0b15-4fa8-9b89-b78964cd7026.jpg",
    "images/page-1-grok-66371264-365e-4572-8b05-f6e03851fcf5.jpg",
    "images/page-2-grok-481c406f-3f25-4f6b-a120-8b8dad85d359.jpg",
    "images/page-3-grok-028c42fe-70ae-419c-a0ed-0392bafb3fbf.jpg",
    "images/page-4-grok-f7706229-5e89-4b5f-8828-0865b16eda73.jpg",
    "images/page-5-grok-8baaf8c8-a887-4764-9205-0f1a03a6f4b8.jpg",
    "images/page-6-grok-adad39e7-2558-4183-a800-33c1b77419fb.jpg",
    "images/page-7-grok-7d296a89-a7ac-47d8-abc7-a7cc53a43c97.jpg",
    "images/page-8-grok-445d26bc-85af-4c13-a44c-26a82f396432.jpg",
    "images/page-9-grok-432d18f1-c276-4586-8ff8-0b018446122b.jpg",
    "images/page-10-grok-de70e122-f5b5-431e-80ad-bc7e4b341433.jpg",
    "images/page-11-grok-48e25567-dcf9-4d3c-bc0e-8ba593f47153.jpg",
    "images/page-12-grok-835f3c58-81fd-4f81-9008-d3add76efeef.jpg",
    "images/page-13-grok-4df8bae2-ed14-4cfd-8d0e-e0c5257bbc6c.jpg",
    "images/page-14-grok-99d5188c-864d-4e1e-879e-05cc2c517c5d.jpg",
    "images/page-15-grok-ceda4f0d-cc29-4021-a249-910129a9c2b2.jpg",
    "images/page-16-grok-12a7f0b9-63ce-4452-bab1-1e4770ba5fd1.jpg",
    "images/page-17-grok-a26b509b-7c9a-48ae-a2c6-7410304c7edd.jpg",
    "images/page-18-grok-d333eb0c-afc6-432b-b077-5b89349bd1e4.jpg",
    "images/page-19-grok-c132c2f7-6323-48cf-b26d-66930226112f.jpg",
    "images/page-20-grok-a30da3ef-d6ca-4557-88ab-8b959191cf01.jpg",
    "images/page-21-grok-f3245d42-a912-4596-a2a0-d06d942dc045.jpg",
    "images/page-22-grok-4ee31946-396e-48fe-8029-2f0107c33f17.jpg",
    "images/page-23-grok-6894716c-2983-479e-b89d-9c2894f9db2b.jpg",
    "images/page-24-grok-9d3c9424-bcd3-4089-b277-e1e870dfbd20.jpg",
    "images/page-25-grok-87bf0bc3-52ea-4af3-ac9b-f89a5ec3f06c.jpg",
    "images/page-26-grok-97985439-fb8c-40bb-ab0c-2acc180954f9.jpg",
    "images/hai/cover-grok-bffd8ee1-7934-4ec3-94dc-205a63ee3959.jpg",
    "images/hai/page-1-grok-80969c94-4844-49d1-9022-6475dd08e143.jpg",
    "images/hai/page-10-grok-19ea08e8-7651-494a-b944-08b19abf9b9d.jpg",
    "images/hai/page-18-grok-f139627d-9eb2-4b69-98df-402e1bea6633.jpg"
  ];

  function t(key, fallback) {
    var lang =
      (document.documentElement &&
        document.documentElement.getAttribute("data-lang")) ||
      "en";
    var store = window.I18N || {};
    var dict = store[lang] || store.en || null;
    if (dict && Object.prototype.hasOwnProperty.call(dict, key) && dict[key] != null) {
      return String(dict[key]);
    }
    if (store.en && Object.prototype.hasOwnProperty.call(store.en, key) && store.en[key] != null) {
      return String(store.en[key]);
    }
    return fallback;
  }

  function downloadBlob(data, name) {
    var blob = new Blob([data], { type: "application/zip" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = name;
    a.rel = "noopener";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () {
      URL.revokeObjectURL(url);
    }, 2500);
  }

  function zipLevelFor(path) {
    // Images are already compressed; storing them is much faster than deflating.
    return /\.(jpg|jpeg|png|ico|gif|webp)$/i.test(path) ? 0 : 6;
  }

  function fetchFiles(onProgress) {
    var out = {};
    var done = 0;
    var total = FILES.length;
    return Promise.all(
      FILES.map(function (path) {
        return fetch(path).then(function (res) {
          if (!res.ok) {
            throw new Error(path + " (" + res.status + ")");
          }
          return res.arrayBuffer().then(function (buf) {
            out[ROOT + path] = [
              new Uint8Array(buf),
              { level: zipLevelFor(path) }
            ];
            done += 1;
            if (onProgress) onProgress(done, total);
          });
        });
      })
    ).then(function () {
      return out;
    });
  }

  function zipFiles(files) {
    return new Promise(function (resolve, reject) {
      if (typeof fflate === "undefined" || typeof fflate.zip !== "function") {
        reject(new Error("fflate missing"));
        return;
      }
      fflate.zip(files, function (err, data) {
        if (err) reject(err);
        else resolve(data);
      });
    });
  }

  var building = false;

  function setStatus(statusEl, msg) {
    if (statusEl) statusEl.textContent = msg;
  }

  function run(statusEl) {
    if (building) return Promise.resolve();
    building = true;
    var total = FILES.length;
    setStatus(
      statusEl,
      t("nav.downloadProgress", "Fetching… {done}/{total}")
        .replace("{done}", "0")
        .replace("{total}", String(total))
    );

    return fetchFiles(function (done, tot) {
      setStatus(
        statusEl,
        t("nav.downloadProgress", "Fetching… {done}/{total}")
          .replace("{done}", String(done))
          .replace("{total}", String(tot))
      );
    })
      .then(function (files) {
        setStatus(statusEl, t("nav.downloadZipping", "Zipping…"));
        return zipFiles(files);
      })
      .then(function (data) {
        downloadBlob(data, ZIP_NAME);
        setStatus(statusEl, t("nav.downloadDone", "Downloaded"));
      })
      .catch(function (err) {
        console.error(err);
        setStatus(
          statusEl,
          t(
            "nav.downloadError",
            "Download failed. Open the site over http(s), not as a local file."
          )
        );
        throw err;
      })
      .then(
        function () { building = false; },
        function () { building = false; }
      );
  }

  function init() {
    var btn = document.getElementById("download-archive-btn");
    if (!btn) return;
    var dialog = document.getElementById("download-dialog");
    if (!dialog) {
      btn.addEventListener("click", function () {
        run(null);
      });
      return;
    }
    var cancelBtn = document.getElementById("download-cancel-btn");
    var confirmBtn = document.getElementById("download-confirm-btn");
    var statusEl = document.getElementById("download-status");

    function closeDialog() {
      if (typeof dialog.close === "function" && dialog.open) dialog.close();
    }

    function resetDialog() {
      if (statusEl) statusEl.textContent = "";
      if (confirmBtn) confirmBtn.disabled = false;
      if (cancelBtn) cancelBtn.disabled = false;
    }

    btn.addEventListener("click", function () {
      if (typeof dialog.showModal === "function") dialog.showModal();
      else run(null);
    });
    if (cancelBtn) cancelBtn.addEventListener("click", closeDialog);
    dialog.addEventListener("cancel", closeDialog);
    dialog.addEventListener("click", function (e) {
      if (e.target === dialog) closeDialog();
    });
    if (confirmBtn) confirmBtn.addEventListener("click", function () {
      if (building) return;
      if (confirmBtn) confirmBtn.disabled = true;
      if (cancelBtn) cancelBtn.disabled = true;
      run(statusEl).then(function () {
        setTimeout(function () {
          closeDialog();
          resetDialog();
        }, 1600);
      }).catch(function () {
        resetDialog();
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();


(function () {
  "use strict";

  // Global store for loaded non-English languages: window.I18N = { es: {...}, fr: {...} }
  window.I18N = window.I18N || {};
  const loaded = Object.create(null);
  const loading = Object.create(null);
  let selectEl = null;
  let originalTitle = document.title;

  const LANGS = {
    ar: "العربية",
    de: "Deutsch",
    en: "English",
    ha: "Hausa",
    pa: "ਪੰਜਾਬੀ",
    ta: "தமிழ்",
    es: "Español",
    fa: "فارسی",
    fr: "Français",
    he: "עברית",
    hi: "हिन्दी",
    it: "Italiano",
    ja: "日本語",
    ko: "한국어",
    nl: "Nederlands",
    no: "Norsk",
    pt: "Português",
    ru: "Русский",
    ur: "اردو",
    zh: "中文",
    "he-phon": "עברית (תעתיק)"
  };

  const STORAGE_KEY = "grok-lang";

  function getSavedLang() {
    try {
      const v = localStorage.getItem(STORAGE_KEY);
      if (v) return v;
    } catch (e) {}
    return "en";
  }

  // Pick the best supported language from the browser's locale list, falling
  // back to "en" when nothing matches.
  function detectBrowserLang() {
    const prefs = navigator.languages && navigator.languages.length
      ? navigator.languages
      : [navigator.language || navigator.userLanguage || "en"];
    for (let i = 0; i < prefs.length; i++) {
      const code = String(prefs[i]).split("-")[0].toLowerCase();
      if (Object.prototype.hasOwnProperty.call(LANGS, code)) return code;
    }
    return "en";
  }

  function setSavedLang(lang) {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch (e) {}
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  // Capture the original (English) content of every translatable node once.
  function captureOriginal() {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      if (!("i18nEn" in el.dataset)) {
        el.dataset.i18nEn = el.textContent;
      }
    });
    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      if (!("i18nEn" in el.dataset)) {
        el.dataset.i18nEn = el.innerHTML;
      }
    });
    document.querySelectorAll("[data-i18n-alt]").forEach((el) => {
      if (!("i18nAltEn" in el.dataset)) {
        el.dataset.i18nAltEn = el.getAttribute("alt") || "";
      }
    });
  }

  function applyText(dict, el, key) {
    let val = null;
    if (dict && Object.prototype.hasOwnProperty.call(dict, key)) {
      val = dict[key];
    }
    el.textContent = val == null ? el.dataset.i18nEn : val;
  }

  function applyHtml(dict, el, key) {
    let val = null;
    if (dict && Object.prototype.hasOwnProperty.call(dict, key)) {
      val = dict[key];
    }
    el.innerHTML = val == null ? el.dataset.i18nEn : val;
  }

  function applyAlt(dict, el, key) {
    let val = null;
    if (dict && Object.prototype.hasOwnProperty.call(dict, key)) {
      val = dict[key];
    }
    el.setAttribute("alt", val == null ? el.dataset.i18nAltEn : val);
  }

  function applyLang(lang) {
    // English may use lang/en.js for a few display-only overrides (full spine
    // names in chrome) while HTML source keeps alternates for the 32-count gag.
    const dict = window.I18N[lang] || null;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      applyText(dict, el, el.getAttribute("data-i18n"));
    });
    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      applyHtml(dict, el, el.getAttribute("data-i18n-html"));
    });
    document.querySelectorAll("[data-i18n-alt]").forEach((el) => {
      applyAlt(dict, el, el.getAttribute("data-i18n-alt"));
    });

    const html = document.documentElement;
    if (html) {
      const RTL = { ar: 1, fa: 1, he: 1, "he-phon": 1, ur: 1 };
      html.setAttribute("lang", lang);
      html.setAttribute("data-lang", lang);
      html.setAttribute("dir", RTL[lang] ? "rtl" : "ltr");
    }

    const siteTitle = document.querySelector(".site-title[data-i18n]");
    if (siteTitle && siteTitle.textContent.trim()) {
      document.title = siteTitle.textContent.trim();
    } else if (dict && dict.__title) {
      document.title = dict.__title;
    } else if (lang === "en") {
      document.title = originalTitle;
    }

    document.dispatchEvent(new CustomEvent("i18n:applied", { detail: { lang } }));
  }

  function buildOptions(current) {
    if (!selectEl) return;
    // List every advertised language so stubs/locales are selectable and then
    // lazily fetched via loadLang(). They only need to be in window.I18N once
    // actually chosen; showing them up front avoids a chicken-and-egg where a
    // language can never be selected because it was never loaded.
    const known = Object.keys(LANGS);
    selectEl.innerHTML = "";
    known.forEach((code) => {
      const opt = document.createElement("option");
      opt.value = code;
      opt.textContent = LANGS[code] || code;
      if (code === current) opt.selected = true;
      selectEl.appendChild(opt);
    });
  }

  function loadLang(code) {
    if (loaded[code] || loading[code]) {
      return Promise.resolve();
    }
    if (window.I18N[code]) {
      loaded[code] = true;
      return Promise.resolve();
    }
    loading[code] = true;
    buildOptions(getSavedLang());
    return new Promise((resolve) => {
      const s = document.createElement("script");
      s.src = "lang/" + code + ".js";
      s.onload = function () {
        loaded[code] = true;
        delete loading[code];
        resolve();
      };
      s.onerror = function () {
        delete loading[code];
        console.warn("Language file not found: lang/" + code + ".js");
        resolve();
      };
      document.head.appendChild(s);
    });
  }

  async function selectLang(code) {
    if (selectEl) selectEl.value = code;
    setSavedLang(code);
    await loadLang(code);
    applyLang(code);
    buildOptions(code);
  }

  function init() {
    selectEl = document.getElementById("lang-select");
    if (!selectEl) return;
    captureOriginal();
    const saved = getSavedLang();
    const initial = saved !== "en" ? saved : detectBrowserLang();
    buildOptions(initial);
    selectEl.addEventListener("change", function () {
      selectLang(selectEl.value);
    });
    selectLang(initial);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
