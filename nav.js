(function () {
  "use strict";

  function init() {
    const chrome =
      document.querySelector(".site-chrome") ||
      document.querySelector(".site-header");
    const toggle = document.querySelector(".nav-toggle");
    const drawer = document.getElementById("site-drawer");
    const backdrop = document.querySelector(".nav-backdrop");
    const closeBtn = document.querySelector(".nav-close");
    if (!toggle || !drawer || !chrome) return;

    let lastFocus = null;
    const mq = window.matchMedia("(max-width: 720px)");

    // On narrow screens, mount drawer/backdrop on <body> so position:fixed
    // is viewport-relative (sticky ancestors otherwise trap the panel).
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
        const focusable = drawer.querySelector(
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
