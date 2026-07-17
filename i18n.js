(function () {
  "use strict";

  // Global store for loaded non-English languages: window.I18N = { es: {...}, fr: {...} }
  window.I18N = window.I18N || {};
  const loaded = Object.create(null);
  const loading = Object.create(null);
  let selectEl = null;
  let originalTitle = document.title;

  const LANGS = {
    en: "English",
    es: "Español",
    fr: "Français",
    de: "Deutsch",
    it: "Italiano",
    pt: "Português",
    nl: "Nederlands",
    ru: "Русский",
    zh: "中文",
    ja: "日本語",
    ko: "한국어",
    ar: "العربية"
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
    const dict = lang === "en" ? null : window.I18N[lang];

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
    if (html) html.setAttribute("lang", lang);

    if (lang === "en") {
      if (document.title !== originalTitle) document.title = originalTitle;
    } else if (dict && dict.__title) {
      document.title = dict.__title;
    }
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
    if (code === "en" || loaded[code] || loading[code]) {
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
    if (code !== "en") {
      await loadLang(code);
    }
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
    if (saved !== "en") {
      selectLang(saved);
    } else if (initial !== "en") {
      selectLang(initial);
    } else {
      applyLang("en");
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
