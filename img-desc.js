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
