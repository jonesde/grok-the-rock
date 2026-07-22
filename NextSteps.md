# Next steps

Working list for **reader/user quality** and **maintainer cleanliness**.  
Uses the craft language from `Lattice.md`: **leak** (local seal), **tip** (structure under load), **break apart** (process/referee).

Status key: `[ ]` open · `[~]` partial · `[x]` done

---

## A. Reader / user experience

### A1. Tall Tales illustrations (largest user gap)

Hai story art is still incomplete on disk. Shipped pages use real UUID filenames for cover, dedication, p1, p2, p10, p18; many story pages still point at placeholders (`images/hai/page-N.jpg`). The site soft-fails with “illustration pending” — readable, not finished.

- [ ] Finish / place remaining Hai page art under stable paths
- [ ] Update `tall-tales.html` `src=` and alts together
- [ ] Update `book-text.html` `PAGE_BG` for the same paths (print + multi-lang backgrounds)
- [ ] Update `site.js` offline zip `FILES` list for every new asset
- [ ] Spot-check print (single lang + multi-lang with bg on) for missing images

**Risk if skipped:** tip when art lands under new names and only one of three lists is updated.

### A2. Potter story surface (optional product)

`ThePotter.md` is the story seal; it is not yet a first-class site page.

- [ ] Decide: stay markdown-only, or add a light HTML page (text + credits, no full art requirement)
- [ ] If HTML: nav entry, `PAGES`/`NAV`/`FILES`, i18n keys, companion links from QS/TT
- [ ] Optional: short About blurb pointing at Potter + lattice without spoiling the dual books

### A3. Home and discovery

- [ ] `index.html` aria-labels / links still partly English-only hard-coded
- [ ] Consider linking Potter / lattice for curious adults without cluttering the child path
- [ ] Cover video (`clips/…`) not in offline zip — offline download loses motion cover (static fallback works)

### A4. i18n chrome leftovers

Story bodies and nav cores are strong. Newer chrome can still fall back to English:

- [ ] `credit.8` / `hai.credit.8` — seal hex is language-neutral; OK as-is or document “do not translate”
- [ ] Download dialog strings were added across locales; spot-check a few non-Latin + RTL (ar, he, fa, ur)
- [ ] Print Options / Both / download progress — smoke-test es, he, ja, zh on `book-text.html`
- [ ] `he-phon` mixed chrome style (some Latin phonetics) — keep consistent when adding keys
- [ ] Optional: translate `site.title.text` nuances if any locale still feels off

### A5. Print / Both page polish

- [ ] Multi-lang print: continuous vs stacked, scale, system fonts — regression after any CSS change
- [ ] Structure markers + Hebrew pointed/unpointed still correct after locale edits
- [ ] Print dialog a11y: focus trap, Escape to close, RTL layout of dialog chrome
- [ ] Very long locale pages (he-phon phonetics) packing — check overflow / empty last pages

### A6. Accessibility and honesty

- [ ] Image alts complete in every locale (required for 32-spine parity; keep `verify_markers.py` green)
- [ ] Placeholder Hai pages: clear “pending” state, not broken-image ugliness
- [ ] Reduce-motion / cover video failure path still OK
- [ ] Keyboard path for marker toggle + print-all-langs + download dialog

---

## B. Maintainer / structure (so it does not tip later)

### B1. Triple-booked asset paths — **tip risk**

Same image paths must agree in:

1. Illustrated HTML (`quiet-stories.html`, `tall-tales.html`)
2. `site.js` → `FILES` (offline zip)
3. `book-text.html` → `PAGE_BG` (all-langs print backgrounds)

- [ ] When Hai art lands: update all three in one commit
- [ ] Longer-term: script that diffs HTML `src` vs `FILES` vs `PAGE_BG` and fails CI/local check
- [ ] Document the rule in one place (this file + short note in `README` or `Lattice.md`)

### B2. Parallel story corpora — **leak risk**

Picture books and `book-text.html` share i18n keys, but `verify_markers.py` only reads quiet/tall HTML + `lang/*.js`.

- [ ] Extend marker (or lattice) verify to assert book-text story keys match quiet/tall for EN
- [ ] Habit: story text edits go through locale keys / one source of truth, not three HTML copies of prose
- [ ] Optional later: generate book-text bodies from the same key map as the illustrated pages

### B3. English chrome ↔ 32-count contract — **load-bearing**

HTML source keeps short chrome (`Grok`, `Lord Ikthiss`); `lang/en.js` restores full spines at display. Putting full names back into illustrated HTML breaks the 32 invariant.

- [ ] Keep the contract documented (`L10nNotes.md` — already there)
- [ ] Never “fix” spine chrome in HTML without running `verify_markers.py`
- [ ] Optional: comment near title blocks in HTML pointing at en.js

### B4. `site.js` architecture — **break-apart risk**

Download zip and i18n/`GrokI18n` live nested inside the print-related IIFE stack. A careless brace edit can take down more than print.

- [ ] Un-nest: top-level sibling IIFEs for chrome, print, download, i18n
- [ ] Keep `GrokI18n` API stable (`LANGS`, `loadLang`, `applyLang`, `applyDictTo`, `t`, `codes`)
- [ ] After refactor: smoke print, download zip, language switch, book-text all-langs

### B5. Hard-coded registries — **tip risk**

Adding a page or language requires multiple manual lists:

| Registry | Where |
|----------|--------|
| `PAGES` / `NAV` | `site.js` |
| `FILES` (zip) | `site.js` |
| `LANGS` | `site.js` |
| `lang/*.js` on disk | `lang/` |
| `PAGE_BG` | `book-text.html` |
| RTL set | duplicated in `site.js` + `book-text.html` |

- [ ] Checklist in this file when adding a page or locale (below)
- [ ] Deduplicate RTL list (single export on `GrokI18n`)
- [ ] Consider generating `FILES` lang entries from `LANGS` keys

### B6. Locale process

- [ ] New locale checklist: `LANGS` + `lang/XX.js` + `FILES` + spine/alts complete + `verify_markers.py` + chrome keys (nav, print, download)
- [ ] `no.js` (and any sparse locales): fill missing about/rules keys if still thin vs peers
- [ ] `verify_locales.py` is for reformat safety, not completeness — optional completeness script later

### B7. Lattice / Potter maintenance

- [ ] After any lattice row change: update `lang/lattice.json`, re-run verify, commit new `lang/lattice.seal`, update `credit.8` / `hai.credit.8` short hex
- [ ] Potter beat edits: keep `## 1`…`## 32`, center **Come**, near/far hands, no-name close — or verify fails
- [ ] Do not surface path names / Biblical layer on child-facing pages
- [ ] Optional: CI job running `verify_markers.py` + `verify_lattice.py` on push

### B8. Repo hygiene

- [ ] PDFs in repo root (`GrokTheRock-AllBookText*.pdf`) — keep, gitignore, or release-only?
- [ ] `clips/` vs zip policy — document intentional omit or add to `FILES`
- [ ] `CNAME` / deploy notes if GitHub Pages is canonical
- [ ] Dead or draft markdown (`GrokTest.md`, etc.) — archive or label
- [ ] `site.js` nested `})();` clarity after any edit (`node --check site.js`)

---

## C. Suggested order of operations

Craftsman order: **structure first, then seals, then polish**.

1. **Hai art landing protocol** (A1 + B1) — highest user value; highest tip risk if done sloppy  
2. **Verify expansions** (B2 markers include book-text; B1 path-diff script) — water tests for the above  
3. **`site.js` un-nest** (B4) — before more features pile on  
4. **Print / i18n / a11y smoke** (A4, A5, A6) — plug leaks  
5. **Potter product decision** (A2) — only after dual books feel finished in the browser  
6. **CI + checklists** (B5–B7) — process so future work doesn’t break apart  

---

## D. Checklists (copy when needed)

### Adding a language

1. `lang/XX.js` with full story + alts + chrome (nav, print, download, titles)  
2. `LANGS` in `site.js`  
3. `FILES` entry `lang/XX.js`  
4. RTL? add to both RTL maps (until deduped)  
5. `python3 scripts/verify_markers.py`  
6. `python3 scripts/verify_lattice.py`  
7. Manual: book-text print dialog + one story page in that lang  

### Adding / renaming an image

1. File on disk under `images/` or `images/hai/`  
2. Illustrated HTML `src` + alt  
3. `PAGE_BG` if the page has a book-text / print background  
4. `FILES` for offline zip  
5. Spot-check online page + offline zip + multi-lang print with backgrounds  

### Editing story prose

1. Prefer locale keys / shared source — not one HTML only  
2. Keep spine phrase exact; run `verify_markers.py`  
3. If center invitation (`p14` / `hai.p14`) changes, keep a clear **Come** (or update lattice invite + both books together)  
4. Run `verify_lattice.py`  

### Changing the lattice table

1. Edit `lang/lattice.json` deliberately  
2. Align Potter beats if roles shift  
3. Run verify → commit new `lattice.seal`  
4. Update short seal in `credit.8` / `hai.credit.8` (HTML + `en.js`)  

---

## E. Already in good shape (don’t re-litigate)

- Marker counts 32/32 EN + all locales (`verify_markers.py`)  
- Lattice seal green (`verify_lattice.py`) when table, markers, center invitation, Potter beats, and seal file agree  
- Locale inventory aligned: disk ≈ `LANGS` ≈ zip lang files  
- i18n bridge `GrokI18n` sufficient for book-text all-langs  
- Missing-art soft-fail keeps Tall Tales readable  
- EN chrome/32-count discipline documented in `L10nNotes.md`  
- Print Options + Both + download strings wired for l10n  

---

## F. Related docs

| Doc | Role |
|-----|------|
| `Lattice.md` | Stone / water / potter design |
| `ThePotter.md` | Story seal |
| `lang/L10nNotes.md` | Translation rules + key maps |
| `GenericStory.md` | Dual-layer recipe for new companions |
| `lang/lattice.json` / `lang/lattice.seal` | Canonical join + hash |
| `scripts/verify_markers.py` | Spine water test |
| `scripts/verify_lattice.py` | Full lattice referee |

---

## G. Work areas by complexity

Use this when choosing **what to do now** and **with whom** (this model / a simple local AI / hand edits). Complexity rises with cross-file coupling and “don’t break the 32 / lattice” load.

| Complexity | Work area | Why | Prefer |
|------------|-----------|-----|--------|
| **1 · Simple** | Single-locale string tweaks; typo fixes; credit copy | One file, verifiers usually stay green | Manual or any small model |
| **1 · Simple** | Run verifiers after your own edits (`verify_markers`, `verify_lattice`) | Command-only | Manual |
| **2 · Easy** | CSS/print polish that doesn’t touch story keys or path lists | Visual; limited blast radius | Small model + your eye |
| **2 · Easy** | Home page labels, README, checklist ticks in this file | Docs / chrome only | Manual or small model |
| **3 · Medium** | Add/fill chrome i18n keys across locales (nav, print, download) | Many files, same pattern | Small model with a template row |
| **3 · Medium** | A11y pass (focus, Escape, aria) on dialogs you already know | Localized JS/HTML | Medium model or careful hand |
| **4 · Medium–hard** | Hai art landing: HTML `src` + `PAGE_BG` + `FILES` in **one** change | Triple list; easy tip | Checklist + careful hand, or strong model |
| **4 · Medium–hard** | Path-diff / book-text parity scripts | New tooling; must match real layout | Strong model |
| **5 · Hard** | `site.js` IIFE un-nest (print / download / i18n split) | Easy to break zip + language switch | Strong model + smoke tests |
| **5 · Hard** | Story prose or center invitation changes across books/locales | Spine + lattice + translation depth | Strong model; always both verifiers |
| **6 · Hardest** | New full locale (story + alts + chrome) or new companion book | Breadth + 32-count + voice | Strong model; don’t use a thin local model alone |
| **6 · Hardest** | Lattice table / Potter beat restructuring | Seal rewrite; philosophical + mechanical | Strong model + human seer sign-off |

**Right-away picks if time is short**

- **You alone:** A1 prep (list missing Hai paths), tick this file, run verifiers, small CSS/copy leaks.  
- **Simple/local AI:** locale chrome fills from a paste template; README; isolated CSS.  
- **With a strong model (recommended):** Hai art triple-update, `site.js` un-nest, verify expansions, any story/lattice touch.

**Rule of thumb:** if the change can desync **three path lists**, **32 spines**, or **`GrokI18n`**, don’t hand it to a weak model without the checklists in §D.

---

*Living list — tick items in place; add dates or PR links if useful. Prefer small commits that keep both verifiers green.*
