(function () {
  "use strict";

  var ZIP_NAME = "grok-the-rock-site.zip";
  var ROOT = "grok-the-rock/";

  // Runnable site only. Add new page images / locales here when they ship.
  var FILES = [
    "LICENSE",
    "index.html",
    "about-grok.html",
    "grok-rules.html",
    "tall-tales.html",
    "nav.js",
    "i18n.js",
    "img-desc.js",
    "download-archive.js",
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

  function restoreLabel(btn) {
    var key = btn.getAttribute("data-i18n");
    if (key && btn.dataset.i18nEn) {
      btn.textContent = t(key, btn.dataset.i18nEn);
    } else {
      btn.textContent = t("nav.download", "Download");
    }
  }

  function run(btn) {
    if (btn.disabled) return;
    btn.disabled = true;
    var total = FILES.length;
    btn.textContent = t("nav.downloadProgress", "Fetching… {done}/{total}")
      .replace("{done}", "0")
      .replace("{total}", String(total));

    fetchFiles(function (done, tot) {
      btn.textContent = t("nav.downloadProgress", "Fetching… {done}/{total}")
        .replace("{done}", String(done))
        .replace("{total}", String(tot));
    })
      .then(function (files) {
        btn.textContent = t("nav.downloadZipping", "Zipping…");
        return zipFiles(files);
      })
      .then(function (data) {
        downloadBlob(data, ZIP_NAME);
        btn.textContent = t("nav.downloadDone", "Downloaded");
        setTimeout(function () {
          restoreLabel(btn);
          btn.disabled = false;
        }, 1600);
      })
      .catch(function (err) {
        console.error(err);
        window.alert(
          t(
            "nav.downloadError",
            "Download failed. Open the site over http(s), not as a local file."
          )
        );
        restoreLabel(btn);
        btn.disabled = false;
      });
  }

  function init() {
    var btn = document.getElementById("download-archive-btn");
    if (!btn) return;
    btn.addEventListener("click", function () {
      run(btn);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
