# Rhetoric review — Tier A (public HTML)

Dated findings and remediation proposals for **site-facing** HTML only.  
Companion to `plans/RhetoricAudit.md` (overall plan + Pass 0 inventory).  
**Status:** Pass 1 review complete · remediation not yet applied · choices locked below.

**Stance**

> Not the official way out — a coherent walk out, free to copy, rewrite, or leave behind.

Stories stay silent on paths. This file covers inflated-claim / institution-of-one risk on the **public web surface**.

---

## Locked choices (author)

| # | Topic | Decision |
|---|--------|----------|
| **Seal chrome** | Title-page `Lattice seal …` | **Drop “lattice seal”** on title pages. Light line only: **`Checksum 1f0aa3b8a6fc`** (hex stays current short form). Plain craft; no mystery brand. |
| **Scripture appendix** | Mending Place closing list | **Keep the appendix**; **soften the title** (and TOC) so it does not claim proof of the rules. |
| **Rest of Pass 1** | About / Rules / Mending / index | Proceed as proposed below (defaults accepted where not overridden). |

### Seal wording (implement when R1 runs)

Source keys: `lang/en.js` → `credit.8` / `hai.credit.8` (HTML fallbacks if present).

**Locked line:**

```text
Checksum 1f0aa3b8a6fc
```

Light/small. No “lattice seal” on title pages. Full SHA-256 / `verify_lattice.py` / “lattice” language stays in README / `plans/Lattice.md` for the curious — craft integrity of *this* join, not ordination.

### Scripture title (implement when R1 runs)

| Avoid | Prefer |
|-------|--------|
| Scripture Passages That **Directly Support** the Rules | Scripture that **illuminates** these practices (optional) |
| | Optional scripture echoes (for readers who use these texts) |
| | Scripture passages (clarity, not membership) |

Keep body disclaimer: sources of clarity, not membership requirements. Keep cite list.

---

## Overall Tier A picture

| File | Verdict | Main risk type |
|------|---------|----------------|
| `index.html` | **Keep** | None material (opaque Hebrew chip) |
| `quiet-stories.html` / `tall-tales.html` / `book-text.html` | **Light soften** | Opaque “Lattice seal” → plain `Checksum 1f0aa3b8a6fc` |
| `about-grok.html` | **Targeted soften** | Soft-universal heritage; living-water teleology; bridge to Symbolism.md |
| `grok-rules.html` | **Mostly keep; small soften** | “Gospel” / absolute “only” / “doesn’t decay” vs already-good anti-authority origin |
| `mending-place.html` | **Highest Tier A priority** | Length + program tone; scripture title; soft-universal pattern; certainty claims |
| `site.js` | **Keep** | Nav only |

**No SY/Kabbalah/32 on the public site** — good. Contention risk is **Bible-adjacent + “this is the way communities work”**, not Tree-of-Life branding.

---

## 1. `index.html` — Keep

- Two covers + book-text link; Hebrew `ז = ו + י` is opaque, not a claim.
- **Action:** none for rhetoric audit.

---

## 2. Story / book-text HTML — Low–med (seal only)

### Hit

| Where | Quote / pattern | Type | Sev |
|-------|-----------------|------|-----|
| Title credits (`credit.8` / `hai.credit.8` via `lang/en.js`) | `Lattice seal 1f0aa3b8a6fc` | Uniqueness / occult-official teaser if unexplained | S1 soft |

Story prose (“true word”, “Lord Ikthiss” as character title) = **surface story — Keep**.

### Decision (locked)

Replace with light technical line only:

```text
Checksum 1f0aa3b8a6fc
```

Also **Keep:** AI-curated + CC0 credits (anti-institution).

**Files to touch at R1:** `lang/en.js` (and later R7 other `lang/*.js`); confirm HTML fallbacks in `quiet-stories.html`, `tall-tales.html`, `book-text.html` if they hardcode the string.

---

## 3. `about-grok.html` — Med–high

| # | Location | Issue | Type | Sev | Propose |
|---|----------|--------|------|-----|---------|
| A1 | `about.rock.1` | “across many traditions” + Moses as if shared symbol bank | Soft-universal + heritage | S1 | “In some stories…” / “one familiar image is Moses…” — not proof text |
| A2 | `about.clay.2` | “nearly every tradition names as the substance of the first human” | Soft-universal (overclaim; Symbolism already has Adhesion caveat) | S1 | “a making-image in many places, including…” or “in the author’s home stories…” |
| A3 | `about.name.1` | “deepest intended meaning… **the purpose of life**: … drink of living water until we… never thirst again” | Teleology / almost-gospel | S1 | Own as **author’s intended reading**, not cosmic purpose; or soft allusion for some readers |
| A4 | Link to `GrokTheRock-Symbolism.md` | One-click dump of Bible/Kabbalah survey from public About | Bridge heat | S1 | Keep link; add “optional deep notes / not required / not official doctrine” on the chip line |
| A5 | `about.stranger` “gospel of peace” | Religious register on public page | Magisterium-adjacent tone | S2 | Keep if clearly prompt/metaphor; or “peace politics” / “repair ethic” in body |
| A6 | Shame/fear/repentance sections | Strong moral voice | Ethics (allowed) | S4 / Keep | Fine if not “revealed law” |
| A7 | Link to Mending Place | Funnel to long guide | Tone depends on mending | — | OK once mending gets exit-trail header |

**Keep:** gray rock, melon accident, Grug/Heinlein literary compare, CC0 footnote, no path names.

**i18n:** A1–A5 live in `data-i18n-html` → change `lang/en.js` (+ later R7 locales), not only HTML fallback.

**Default for A3 when implementing:** author-intent framing (“the meaning intended here…”), not “the purpose of life” as universal.

**Default for A5 when implementing:** keep “gospel of peace” where it is clearly the Rules/prompt metaphor; do not expand it into doctrinal claim.

---

## 4. `grok-rules.html` — Med (paradox: best disclaimer + loud register)

### Already good (Keep)

- Origin: “I didn’t arrive at these by authority… aren’t laws handed down.”
- AI-written origin story (disarms ordination).
- Rules as practice ethics; CC0.

### Hits

| # | Location | Issue | Type | Sev | Propose |
|---|----------|--------|------|-----|---------|
| R1 | Hero essence + origin.2 | “operating instructions for a bond… **that doesn’t decay**” | Uniqueness / absolute | S2 | “aimed at bonds that can endure” / “don’t have to decay” |
| R2 | Prompt quote | “rules of a **gospel of peace**” | Religious brand | S2 | Keep as *historical prompt quote* (clearly the AI prompt); body may say “peace ethic” |
| R3 | r3 body | “Restoration is **the only** move that doesn’t plant the next wound” | Absolute | S2 | “the move that doesn’t…” / “among the few that don’t…” |
| R4 | r7 body | “**the only** gift that builds trust” | Absolute | S2 | Soften similarly |
| R5 | closing “These are the rules. They’re **good news**” | Gospel cadence | Tone | S2 | Optional: soften or keep as deliberate echo of origin prompt |
| R6 | Rule content itself | Normative “you” | Ethics | Keep | Not the audit target |

**Default when implementing:** do R1, R3, R4; keep R2 as quoted prompt; R5 optional leave.

Same i18n path: `rules.*` keys in `lang/en.js`.

---

## 5. `mending-place.html` — High (main Tier A work)

### Already good (Keep and lean on)

- Preface: “does not offer a new ideology”
- Pattern note: no required theological/historical agreement; test in ordinary life
- Scripture body: “sources of clarity, not membership tests/requirements”
- Trauma/care disclaimer; not substitute for skilled help
- Part Six: rules not hardening into performance
- CC0; “Available, Not Central”; warns against holding “only correct” explanation
- **Scripture appendix kept** (locked choice); title softened only

### Hits

| # | Location | Issue | Type | Sev | Propose |
|---|----------|--------|------|-----|---------|
| M1 | Hero / missing | No one-line **exit-trail / not a church / fork freely** at top | Missing frame | S1 | Add 1–2 sentences under subtitle: working guide from lived repair; not ordination; discard or rewrite what doesn’t hold water |
| M2 | `#a-short-note-on-the-pattern` | “Across **older wisdom traditions** there is a recurring shape…” | Soft-universal | S1 | “A shape many repair stories share…” / “one shape that shows up often…” |
| M3 | TOC + heading | “Scripture Passages That **Directly Support** the Rules” | Heritage-as-proof | S1 | **Locked:** soften title (see above); keep appendix + disclaimers |
| M4 | Preface ~L168 | “The sequence is **not theoretical**. It has been **observed**…” | Certainty / implied universal method | S2 | “observed in small settings the author trusts” / “worth testing, not guaranteed weather” |
| M5 | Body scale | Household → community “weather”, PRA pattern, saturation | Program / institution-of-one *feel* | S2 | Keep content; optional “optional map / not a franchise” callouts in Parts 4–5 openers |
| M6 | Inline “See also: Isaiah… Matthew…” | Scripture as rule footnotes | Heritage | S2 | Keep if M3 frame is clear; optional later demote cites to appendix only |
| M7 | Rule absolutes (mirror Rules) | “the only…” etc. | Absolute | S2 | Same soften as R3–R4 |
| M8 | Length (~2.6k lines) | Reads as **the** adult system | Magisterium-by-bulk | S2 | Not cut in R1; optional later “short path” TOC |

**Do not introduce** Kabbalah/SY on this page.

---

## 6. `site.js` — Keep

Nav labels only. No heritage claims.

---

## R1 execution order (when applying)

1. **`mending-place.html`:** M1 header + M2 + M3 (title/TOC) + optional M4; leave bulk practice text.
2. **`about-grok.html` + `lang/en.js`:** A1–A4 (A3 highest theological heat).
3. **`grok-rules.html` + `lang/en.js`:** R1, R3–R4; R2 keep as prompt quote clarity if needed.
4. **Seal credits:** `credit.8` / `hai.credit.8` → `Checksum 1f0aa3b8a6fc` (+ HTML fallbacks).
5. **Defer R7** full locale sync until EN settled.
6. **Do not** edit story narrative; **do not** touch Symbolism/GenericStory/MadPotter in R1 (Tier B/C).

---

## Tier A keep list (do not “fix”)

- Story silence on paths / David / Christ  
- CC0 + copy/share/grow  
- Rules origin anti-authority paragraph  
- Mending ideology disclaimer + membership-not-required + trauma care  
- Scripture appendix (kept; title only softens)  
- Short checksum on title pages (hex; no “lattice seal” brand on public credits)  
- Ethics of restore / node / open gift  
- Literary Heinlein/Grug comparison  

---

## Success criteria (Tier A after R1)

- Parent can use site without meeting “official Bible/Kabbalah system.”  
- Curious adult still finds optional scripture and (via About) Symbolism — framed as optional.  
- “Not laws handed down / not membership / test in life” is visible at the top of the longest public guide.  
- Absolutes (“only”, “doesn’t decay”, “every tradition”) no longer do the ordaining work.  
- Title credits show plain **`Checksum …`**, not “lattice seal” mystery brand.

---

## Cross-links

- Overall audit plan + Pass 0 inventory: `plans/RhetoricAudit.md`  
- Seal design notes (craft): `plans/Lattice.md`, `lang/lattice.json`  
- Bridge heat (Tier B, not this pass): `GrokTheRock-Symbolism.md` via About  

---

## Status

- [x] Pass 1 review written  
- [x] Seal choice locked (`Checksum 1f0aa3b8a6fc` only; drop “lattice seal” on title pages)  
- [x] Scripture choice locked (keep appendix + soften title)  
- [x] R1 applied to HTML / `lang/en.js` (2026-08-02)  
- [x] Spot-check story title pages + Mending TOC after edit  
- [x] Offer-not-disclaimer pass on R1 voice (2026-08-02); standing rule in `plans/RhetoricAudit.md`  
- [ ] R7 locale sync (after EN stable) — other `lang/*.js` may still say “Lattice seal” until synced  

### R1 apply log (2026-08-02)

| Item | Done |
|------|------|
| M1 mending hero exit-trail frame | yes |
| M2 pattern soft-universal | yes |
| M3 scripture title + TOC + anchor id | yes |
| M4 preface certainty soften | yes |
| M7 restoration “only” in mending Rule 3 | yes |
| A1–A4 about-grok.html | yes |
| R1, R3, R4 grok-rules.html | yes |
| Checksum credits: en.js + quiet/tall/book-text HTML | yes |
| GrokTheRock-Rules.md source twin aligned | yes (extra consistency) |
| R7 other locales | deferred |

**Spot-check:** `Checksum 1f0aa3b8a6fc` on quiet/tall/book-text (×2); mending TOC/heading “Scripture That Illuminates These Practices (Optional)”; no remaining `Lattice seal` or `Directly Support` on Tier A HTML.
