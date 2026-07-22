/* =============================================================================
   book-text.js — marker numbering + multi-language print options
   Load after site.js (needs window.GrokI18n).
   ============================================================================= */

/* --- Structure markers (spine numbering) --- */
(function () {
  var btn = document.getElementById('marker-toggle');
  if (!btn) return;
  function resolve(key, fallback) {
    if (window.GrokI18n && typeof window.GrokI18n.t === 'function') {
      return window.GrokI18n.t(key, fallback);
    }
    var lang =
      (document.documentElement &&
        document.documentElement.getAttribute('data-lang')) ||
      'en';
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
  function syncMarkerLabels() {
    var label = resolve('print.markersToggle', 'Number story markers');
    btn.setAttribute('aria-label', label);
    btn.setAttribute('title', label);
  }
  syncMarkerLabels();
  function bookList() {
    var lang =
      (document.documentElement &&
        document.documentElement.getAttribute('data-lang')) ||
      'en';
    var q = [resolve('title.h1', 'Grok the Rock')];
    var h = [resolve('hai.title.h1', 'Hai Ikthiss')];
    // Hebrew story body uses niqqud; chrome/alts use unpointed title.h1 forms.
    if (lang === 'he' || lang === 'he-phon') {
      q.push('גְּרוֹק הַצּוּר');
      h.push('הָאִי אִיקְתִּיס');
    }
    return [
      { sel: '#quiet-stories', phrases: q },
      { sel: '#tall-tales', phrases: h }
    ];
  }
  function escapeRe(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
  btn.addEventListener('click', function () {
    bookList().forEach(function (book) {
      var root = document.querySelector(book.sel);
      if (!root) return;
      var phrases = book.phrases.filter(Boolean);
      // Longer phrases first so pointed/unpointed do not double-count overlaps.
      phrases.sort(function (a, b) { return b.length - a.length; });
      var re = new RegExp('(' + phrases.map(escapeRe).join('|') + ')', 'g');
      var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
        acceptNode: function (n) {
          if (!n.nodeValue || !n.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
          var p = n.parentElement;
          if (!p) return NodeFilter.FILTER_REJECT;
          var tag = p.tagName;
          if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'NOSCRIPT') return NodeFilter.FILTER_REJECT;
          if (p.closest('button')) return NodeFilter.FILTER_REJECT;
          if (p.closest('.skipc')) return NodeFilter.FILTER_REJECT;
          re.lastIndex = 0;
          return re.test(n.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
        }
      });
      var nodes = [];
      while (walker.nextNode()) nodes.push(walker.currentNode);
      var counter = 0;
      nodes.forEach(function (node) {
        re.lastIndex = 0;
        var text = node.nodeValue;
        var frag = document.createDocumentFragment();
        var last = 0, m;
        while ((m = re.exec(text))) {
          if (m.index > last) frag.appendChild(document.createTextNode(text.slice(last, m.index)));
          counter++;
          var mark = document.createElement('mark');
          mark.className = 'marker-hl';
          mark.textContent = m[0];
          frag.appendChild(mark);
          var sup = document.createElement('sup');
          sup.className = 'marker-num';
          sup.textContent = String(counter);
          frag.appendChild(sup);
          last = m.index + m[0].length;
        }
        if (last < text.length) frag.appendChild(document.createTextNode(text.slice(last)));
        node.parentNode.replaceChild(frag, node);
      });
    });
    btn.disabled = true;
  });
  document.addEventListener('i18n:applied', function () {
    btn.disabled = false;
    syncMarkerLabels();
  });
})();

/* --- Print Options / all-languages build --- */
(function () {
  if (!window.GrokI18n) return;
  var I = window.GrokI18n;
  var LANGS = I.LANGS;
  var RTL = { ar: 1, fa: 1, he: 1, "he-phon": 1, ur: 1 };
  var allCodes = I.codes();
  function t(key, fallback) {
    return I.t ? I.t(key, fallback) : fallback;
  }

  var btn = document.getElementById("print-all-langs-btn");
  var dlg = document.getElementById("all-langs-dialog");
  if (!btn || !dlg) return;

  function syncPrintToggleLabels() {
    var label = t("print.allLangsToggle", "Print all languages");
    btn.setAttribute("aria-label", label);
    btn.setAttribute("title", label);
  }
  syncPrintToggleLabels();
  document.addEventListener("i18n:applied", syncPrintToggleLabels);

  var listEl = dlg.querySelector("#al-lang-list");
  var tocChk = dlg.querySelector("#al-toc");
  var bgChk = dlg.querySelector("#al-bgimg");
  var iconsChk = dlg.querySelector("#al-icons");
  var markersChk = dlg.querySelector("#al-markers");
  var fontSel = dlg.querySelector("#al-font");
  var layoutSel = dlg.querySelector("#al-layout");
  var selAll = dlg.querySelector("#al-select-all");
  var deselAll = dlg.querySelector("#al-deselect-all");
  var closeBtn = dlg.querySelector("#al-close");
  var okBtn = dlg.querySelector("#al-ok");
  var printBtn = dlg.querySelector("#al-print");
  var scaleRange = dlg.querySelector("#al-scale-range");
  var scaleVal = dlg.querySelector("#al-scale-val");
  var container = document.getElementById("all-langs");
  var built = false;
  var PRINT_ICON_GROK = "images/ico/icon-192.png";
  var PRINT_ICON_HAI = "images/ico/icon-hai-192.png";

  // Build the language checkboxes once.
  allCodes.forEach(function (code) {
    var label = document.createElement("label");
    label.className = "al-lang-item";
    var name = LANGS[code] || code;
    label.innerHTML =
      '<input type="checkbox" value="' + code + '"> <span>' +
      name + ' <small>(' + code + ')</small></span>';
    listEl.appendChild(label);
  });
  var checkboxes = function () {
    return listEl.querySelectorAll('input[type="checkbox"]');
  };

  // Pre-configure from URL params: ?langs=en,es,fr  ?toc=1  ?layout=continuous
  var params = new URLSearchParams(location.search);
  var langParam = params.get("langs");
  if (langParam) {
    var wanted = {};
    langParam.split(",").forEach(function (s) { wanted[s.trim()] = true; });
    checkboxes().forEach(function (cb) { cb.checked = !!wanted[cb.value]; });
  } else {
    var curLang =
      (document.documentElement && document.documentElement.getAttribute("data-lang")) || "en";
    checkboxes().forEach(function (cb) { cb.checked = cb.value === curLang; });
  }
  if (params.get("toc") === "1" || params.get("toc") === "true") tocChk.checked = true;
  if (params.get("bgimg") === "1" || params.get("bgimg") === "true") bgChk.checked = true;
  if (params.get("icons") === "0" || params.get("icons") === "false") iconsChk.checked = false;
  if (params.get("icons") === "1" || params.get("icons") === "true") iconsChk.checked = true;
  if (params.get("markers") === "1" || params.get("markers") === "true") markersChk.checked = true;
  var layParam = params.get("layout");
  if (layParam) {
    for (var i = 0; i < layoutSel.options.length; i++) {
      if (layoutSel.options[i].value === layParam) { layoutSel.value = layParam; break; }
    }
  }
  var fontParam = params.get("font");
  if (fontSel && (fontParam === "system" || fontParam === "web")) fontSel.value = fontParam;
  var scaleParam = params.get("scale");
  if (scaleParam && scaleRange) {
    var sp = parseInt(scaleParam, 10);
    if (!isNaN(sp) && sp >= 70 && sp <= 100) scaleRange.value = String(sp);
  }

  function setScaleLabel() {
    if (scaleVal && scaleRange) scaleVal.textContent = scaleRange.value + "%";
  }
  setScaleLabel();

  function openDlg() { dlg.hidden = false; }
  function exitAllLangs() {
    document.body.classList.remove("all-langs", "al-font-system");
    container.innerHTML = "";
    container.removeAttribute("style");
    container.className = "";
    container.hidden = true;
    built = false;
    if (printBtn) printBtn.disabled = true;
  }
  function closeDlg() {
    exitAllLangs();
    dlg.hidden = true;
  }

  btn.addEventListener("click", openDlg);
  closeBtn.addEventListener("click", closeDlg);
  selAll.addEventListener("click", function () {
    checkboxes().forEach(function (cb) { cb.checked = true; });
  });
  deselAll.addEventListener("click", function () {
    checkboxes().forEach(function (cb) { cb.checked = false; });
  });
  if (printBtn) {
    printBtn.addEventListener("click", function () {
      if (built) window.print();
    });
  }

  okBtn.addEventListener("click", function () {
    var selected = [];
    checkboxes().forEach(function (cb) { if (cb.checked) selected.push(cb.value); });
    if (!selected.length) return;
    okBtn.disabled = true;
    if (printBtn) printBtn.disabled = true;
    okBtn.textContent = t("print.applying", "Applying…");
    var useSystemFont = fontSel && fontSel.value === "system";
    buildAll(
      selected,
      tocChk.checked,
      bgChk.checked,
      layoutSel.value,
      useSystemFont,
      iconsChk.checked,
      markersChk.checked
    ).then(function () {
      okBtn.disabled = false;
      okBtn.textContent = t("print.apply", "Apply");
      if (printBtn) printBtn.disabled = false;
      built = true;
    });
  });

  // Map each page's data-i18n-html key to its illustration image.
  // Missing files (most hai pages) simply render no background.
  var PAGE_BG = {
    "cover.title": "images/cover-grok-2e32b43d-6ffc-4214-8e76-5c2fef65b815.jpg",
    "dedication": "images/dedication-grok-4d644bb0-0b15-4fa8-9b89-b78964cd7026.jpg",
    "c1.title": "images/page-1-grok-66371264-365e-4572-8b05-f6e03851fcf5.jpg",
    "p2": "images/page-2-grok-481c406f-3f25-4f6b-a120-8b8dad85d359.jpg",
    "p3": "images/page-3-grok-028c42fe-70ae-419c-a0ed-0392bafb3fbf.jpg",
    "p4": "images/page-4-grok-f7706229-5e89-4b5f-8828-0865b16eda73.jpg",
    "p5": "images/page-5-grok-8baaf8c8-a887-4764-9205-0f1a03a6f4b8.jpg",
    "p6": "images/page-6-grok-adad39e7-2558-4183-a800-33c1b77419fb.jpg",
    "p7": "images/page-7-grok-7d296a89-a7ac-47d8-abc7-a7cc53a43c97.jpg",
    "p8": "images/page-8-grok-445d26bc-85af-4c13-a44c-26a82f396432.jpg",
    "p9": "images/page-9-grok-432d18f1-c276-4586-8ff8-0b018446122b.jpg",
    "c2.title": "images/page-10-grok-de70e122-f5b5-431e-80ad-bc7e4b341433.jpg",
    "p11": "images/page-11-grok-48e25567-dcf9-4d3c-bc0e-8ba593f47153.jpg",
    "p12": "images/page-12-grok-835f3c58-81fd-4f81-9008-d3add76efeef.jpg",
    "p13": "images/page-13-grok-4df8bae2-ed14-4cfd-8d0e-e0c5257bbc6c.jpg",
    "p14": "images/page-14-grok-99d5188c-864d-4e1e-879e-05cc2c517c5d.jpg",
    "p15": "images/page-15-grok-ceda4f0d-cc29-4021-a249-910129a9c2b2.jpg",
    "p16": "images/page-16-grok-12a7f0b9-63ce-4452-bab1-1e4770ba5fd1.jpg",
    "p17": "images/page-17-grok-a26b509b-7c9a-48ae-a2c6-7410304c7edd.jpg",
    "c3.title": "images/page-18-grok-d333eb0c-afc6-432b-b077-5b89349bd1e4.jpg",
    "p19": "images/page-19-grok-c132c2f7-6323-48cf-b26d-66930226112f.jpg",
    "p20": "images/page-20-grok-a30da3ef-d6ca-4557-88ab-8b959191cf01.jpg",
    "p21": "images/page-21-grok-f3245d42-a912-4596-a2a0-d06d942dc045.jpg",
    "p22": "images/page-22-grok-4ee31946-396e-48fe-8029-2f0107c33f17.jpg",
    "p23": "images/page-23-grok-6894716c-2983-479e-b89d-9c2894f9db2b.jpg",
    "p24": "images/page-24-grok-9d3c9424-bcd3-4089-b277-e1e870dfbd20.jpg",
    "p25": "images/page-25-grok-87bf0bc3-52ea-4af3-ac9b-f89a5ec3f06c.jpg",
    "p26": "images/page-26-grok-97985439-fb8c-40bb-ab0c-2acc180954f9.jpg",
    "hai.cover.title": "images/hai/cover-grok-bffd8ee1-7934-4ec3-94dc-205a63ee3959.jpg",
    "hai.dedication": "images/hai/dedication-grok-03af8e53-3392-4e53-8910-53349a26558e_up.jpg",
    "hai.c1.title": "images/hai/page-1-grok-80969c94-4844-49d1-9022-6475dd08e143.jpg",
    "hai.p2": "images/hai/page-2-grok-37485c9d-64c3-4fca-b2ed-7f7244a42d77_up.jpg",
    "hai.c2.title": "images/hai/page-10-grok-19ea08e8-7651-494a-b944-08b19abf9b9d.jpg",
    "hai.c3.title": "images/hai/page-18-grok-f139627d-9eb2-4b69-98df-402e1bea6633.jpg",
    "hai.p3": "images/hai/page-3.jpg",
    "hai.p4": "images/hai/page-4.jpg",
    "hai.p5": "images/hai/page-5.jpg",
    "hai.p6": "images/hai/page-6.jpg",
    "hai.p7": "images/hai/page-7.jpg",
    "hai.p8": "images/hai/page-8.jpg",
    "hai.p9": "images/hai/page-9.jpg",
    "hai.p11": "images/hai/page-11.jpg",
    "hai.p12": "images/hai/page-12.jpg",
    "hai.p13": "images/hai/page-13.jpg",
    "hai.p14": "images/hai/page-14.jpg",
    "hai.p15": "images/hai/page-15.jpg",
    "hai.p16": "images/hai/page-16.jpg",
    "hai.p17": "images/hai/page-17.jpg",
    "hai.p19": "images/hai/page-19.jpg",
    "hai.p20": "images/hai/page-20.jpg",
    "hai.p21": "images/hai/page-21.jpg",
    "hai.p22": "images/hai/page-22.jpg",
    "hai.p23": "images/hai/page-23.jpg",
    "hai.p24": "images/hai/page-24.jpg",
    "hai.p25": "images/hai/page-25.jpg",
    "hai.p26": "images/hai/page-26.jpg"
  };

  function shrinkPrintIcons(root) {
    Array.prototype.forEach.call(root.querySelectorAll("img.book-cover-icon"), function (img) {
      var src = img.getAttribute("src") || "";
      if (src.indexOf("icon-hai-") !== -1) {
        img.setAttribute("src", PRINT_ICON_HAI);
        img.setAttribute("width", "192");
        img.setAttribute("height", "291");
      } else if (src.indexOf("icon-") !== -1) {
        img.setAttribute("src", PRINT_ICON_GROK);
        img.setAttribute("width", "192");
        img.setAttribute("height", "192");
      }
    });
  }

  function removePrintIcons(root) {
    Array.prototype.forEach.call(root.querySelectorAll("img.book-cover-icon"), function (img) {
      if (img.parentNode) img.parentNode.removeChild(img);
    });
  }

  function escapeRe(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function resolveInDict(dict, key, fallback) {
    if (dict && Object.prototype.hasOwnProperty.call(dict, key) && dict[key] != null) {
      return String(dict[key]);
    }
    return fallback;
  }

  function markerBooksForLang(code) {
    var dict = (window.I18N && window.I18N[code]) || null;
    var en = (window.I18N && window.I18N.en) || null;
    function r(key, fb) {
      var v = resolveInDict(dict, key, null);
      if (v != null) return v;
      return resolveInDict(en, key, fb);
    }
    var q = [r("title.h1", "Grok the Rock")];
    var h = [r("hai.title.h1", "Hai Ikthiss")];
    if (code === "he" || code === "he-phon") {
      q.push("גְּרוֹק הַצּוּר");
      h.push("הָאִי אִיקְתִּיס");
    }
    return [
      { sel: "#quiet-stories", phrases: q },
      { sel: "#tall-tales", phrases: h }
    ];
  }

  function applyStructureMarkers(root, code) {
    markerBooksForLang(code).forEach(function (book) {
      var bookRoot = root.querySelector(book.sel);
      if (!bookRoot) return;
      var phrases = book.phrases.filter(Boolean);
      phrases.sort(function (a, b) { return b.length - a.length; });
      if (!phrases.length) return;
      var re = new RegExp("(" + phrases.map(escapeRe).join("|") + ")", "g");
      var walker = document.createTreeWalker(bookRoot, NodeFilter.SHOW_TEXT, {
        acceptNode: function (n) {
          if (!n.nodeValue || !n.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
          var p = n.parentElement;
          if (!p) return NodeFilter.FILTER_REJECT;
          var tag = p.tagName;
          if (tag === "SCRIPT" || tag === "STYLE" || tag === "NOSCRIPT") return NodeFilter.FILTER_REJECT;
          if (p.closest("button")) return NodeFilter.FILTER_REJECT;
          if (p.closest(".skipc")) return NodeFilter.FILTER_REJECT;
          if (p.closest("mark.marker-hl") || p.closest("sup.marker-num")) return NodeFilter.FILTER_REJECT;
          re.lastIndex = 0;
          return re.test(n.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
        }
      });
      var nodes = [];
      while (walker.nextNode()) nodes.push(walker.currentNode);
      var counter = 0;
      nodes.forEach(function (node) {
        re.lastIndex = 0;
        var text = node.nodeValue;
        var frag = document.createDocumentFragment();
        var last = 0, m;
        while ((m = re.exec(text))) {
          if (m.index > last) frag.appendChild(document.createTextNode(text.slice(last, m.index)));
          counter++;
          var mark = document.createElement("mark");
          mark.className = "marker-hl";
          mark.textContent = m[0];
          frag.appendChild(mark);
          var sup = document.createElement("sup");
          sup.className = "marker-num";
          sup.textContent = String(counter);
          frag.appendChild(sup);
          last = m.index + m[0].length;
        }
        if (last < text.length) frag.appendChild(document.createTextNode(text.slice(last)));
        node.parentNode.replaceChild(frag, node);
      });
    });
  }

  function buildAll(selected, useToc, useBg, layout, useSystemFont, useIcons, useMarkers) {
    var src = document.querySelector("main.booktext");
    container.innerHTML = "";
    container.className = "booktext-all" +
      (layout === "continuous" ? " al-continuous" : "") +
      (useBg ? " al-with-bg" : "") +
      " al-pagefill";
    document.body.classList.toggle("al-font-system", !!useSystemFont);

    if (useToc) {
      var toc = document.createElement("nav");
      toc.className = "al-toc";
      var h = document.createElement("h1");
      h.textContent = t("print.tocHeading", "Table of Contents");
      toc.appendChild(h);
      var ul = document.createElement("ul");
      selected.forEach(function (code) {
        var li = document.createElement("li");
        var a = document.createElement("a");
        a.href = "#lang-" + code;
        a.textContent = (LANGS[code] || code) + " (" + code + ")";
        li.appendChild(a);
        ul.appendChild(li);
      });
      toc.appendChild(ul);
      container.appendChild(toc);
    }

    // Load every needed dictionary, then stack a translated clone per language.
    var chain = Promise.resolve();
    selected.forEach(function (code) {
      chain = chain.then(function () { return I.loadLang(code); }).then(function () {
        var clone = src.cloneNode(true);
        I.applyDictTo(clone, window.I18N[code]);
        if (useIcons) shrinkPrintIcons(clone);
        else removePrintIcons(clone);
        if (useMarkers) applyStructureMarkers(clone, code);
        if (useBg) {
          clone.querySelectorAll(".text-page").forEach(function (page) {
            var body = page.querySelector(".tp-body");
            var key = body && body.getAttribute("data-i18n-html");
            var url = key && PAGE_BG[key];
            if (url) {
              page.style.backgroundImage = 'url("' + url + '")';
              page.classList.add("has-bg");
            }
          });
        }
        var sec = document.createElement("section");
        sec.className = "lang-block";
        sec.id = "lang-" + code;
        sec.lang = code;
        if (RTL[code]) sec.dir = "rtl";
        // Per-language header (and its underline rule) omitted from the print build.
        // var head = document.createElement("h2");
        // head.className = "lang-head";
        // head.textContent = (LANGS[code] || code) + " (" + code + ")";
        // sec.appendChild(head);
        sec.appendChild(clone);
        container.appendChild(sec);
      });
    });
    return chain.then(function () {
      container.hidden = false;
      document.body.classList.add("all-langs");
      var fontsReady = (document.fonts && document.fonts.ready) ? document.fonts.ready : Promise.resolve();
      return fontsReady.then(packPages);
    });
  }

  // US Letter content box matches @page all-langs-page { size: letter portrait; margin: 10mm 8mm }.
  var PAGE_CONTENT_W = "calc(8.5in - 16mm)";
  var PAGE_CONTENT_H = "calc(11in - 20mm)";

  function getPrintScale() {
    var pct = scaleRange ? parseInt(scaleRange.value, 10) : 100;
    if (isNaN(pct)) pct = 100;
    if (pct < 50) pct = 50;
    if (pct > 100) pct = 100;
    return pct / 100;
  }

  // Pack into the real letter content box. Scale shrinks type/spacing via --al-scale
  // (no CSS transform — keeps text vector in print PDFs, especially Firefox).
  function packPages() {
    Array.prototype.forEach.call(container.querySelectorAll(".al-print-page"), function (p) {
      p.remove();
    });

    var scale = getPrintScale();
    container.style.setProperty("--al-scale", String(scale));
    setScaleLabel();

    var headForcesBreak = !container.classList.contains("al-continuous");

    // Build row plans from template clones (pair cards 2-up). Templates stay display:none.
    var rowPlans = [];
    var pending = null;
    var langBlocks = Array.prototype.slice.call(container.querySelectorAll(".lang-block"));
    Array.prototype.forEach.call(langBlocks, function (lb) {
      var head = lb.querySelector(".lang-head");
      var main = lb.querySelector("main.booktext");
      if (!main) return;
      if (head) {
        if (pending) { rowPlans.push({ cards: [pending] }); pending = null; }
        rowPlans.push({ head: head, forceBreak: headForcesBreak });
      }
      Array.prototype.forEach.call(main.querySelectorAll(".text-page"), function (c) {
        if (pending) {
          rowPlans.push({ cards: [pending, c] });
          pending = null;
        } else {
          pending = c;
        }
      });
    });
    if (pending) rowPlans.push({ cards: [pending] });

    function makePage() {
      var pageEl = document.createElement("div");
      pageEl.className = "al-print-page";
      pageEl.style.width = PAGE_CONTENT_W;
      pageEl.style.height = PAGE_CONTENT_H;
      var gridEl = document.createElement("div");
      gridEl.className = "al-page-grid is-packing";
      pageEl.appendChild(gridEl);
      container.appendChild(pageEl);
      void pageEl.offsetHeight;
      return { pageEl: pageEl, gridEl: gridEl };
    }

    function overflows(page) {
      return page.gridEl.scrollHeight > page.pageEl.clientHeight + 0.5;
    }

    function buildRowEl(plan) {
      var rowEl = document.createElement("div");
      rowEl.className = "al-page-row" + (plan.head ? " al-page-row-head" : "");
      if (plan.head) {
        rowEl.appendChild(plan.head.cloneNode(true));
      } else {
        plan.cards.forEach(function (card) {
          var c = card.cloneNode(true);
          if (plan.cards.length === 1) c.classList.add("lone");
          rowEl.appendChild(c);
        });
      }
      return rowEl;
    }

    function tryAppend(page, plan) {
      var rowEl = buildRowEl(plan);
      page.gridEl.appendChild(rowEl);
      void page.pageEl.offsetHeight;
      if (page.gridEl.childNodes.length > 1 && overflows(page)) {
        page.gridEl.removeChild(rowEl);
        return false;
      }
      return true;
    }

    var pages = [];
    var cur = makePage();
    pages.push(cur);

    rowPlans.forEach(function (plan) {
      if (plan.forceBreak && cur.gridEl.childNodes.length) {
        cur = makePage();
        pages.push(cur);
      }
      if (!tryAppend(cur, plan)) {
        cur = makePage();
        pages.push(cur);
        tryAppend(cur, plan);
      }
    });

    for (var i = 0; i < pages.length - 1; i++) {
      var dst = pages[i], src = pages[i + 1];
      while (src.gridEl.firstChild) {
        var move = src.gridEl.firstChild;
        dst.gridEl.appendChild(move);
        void dst.pageEl.offsetHeight;
        if (overflows(dst)) {
          src.gridEl.insertBefore(move, src.gridEl.firstChild);
          break;
        }
      }
    }

    var lastPage = null;
    pages.forEach(function (p) {
      if (!p.gridEl.childNodes.length) {
        p.pageEl.remove();
        return;
      }
      p.gridEl.classList.remove("is-packing");
      lastPage = p.pageEl;
    });
    if (lastPage) {
      lastPage.style.breakAfter = "auto";
      lastPage.style.pageBreakAfter = "auto";
    }
  }

  if (scaleRange) {
    scaleRange.addEventListener("input", function () {
      setScaleLabel();
      schedulePack();
    });
  }

  var resizeTimer = null;
  function schedulePack() {
    if (!built || !document.body.classList.contains("all-langs")) return;
    if (resizeTimer) clearTimeout(resizeTimer);
    resizeTimer = setTimeout(packPages, 150);
  }
  window.addEventListener("resize", schedulePack);
  if (window.visualViewport) {
    window.visualViewport.addEventListener("resize", schedulePack);
  }
})();
