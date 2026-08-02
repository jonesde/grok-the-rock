# Rhetoric audit — inflated claims & institution-of-one risk

Working plan and findings home for reviewing (then softening) language that
reads as **official recovered truth** rather than an **exit trail / working
midrash**. Ethics stay; **authority** claims deflate.

**Stance to preserve**

> Not the official way out — a coherent walk out, for people stuck where the
> author was, free to copy, rewrite, or leave behind.

Stories stay silent on paths. Adult commentary and public chrome are the risk.

### Offer, not disclaimer

Deflate institution-of-one by **offering** meanings and maps that can be chosen,
tested, or left — not by stacked “not doctrine / not my problem” disclaimers.

| Avoid (disclaimer) | Prefer (offer) |
|--------------------|----------------|
| not a claim / not official / not required | this is… / offered as… |
| discard if… / not my problem how it lands | can be chosen / keep if it helps |
| terms-of-service nots | gift held out; free hands |

**Model line** (name / life-meaning):

> This is a meaning of a word, and offered as a life meaning that can be chosen.

Author stays present as giver, not boss. Reader keeps agency without the text
washing its hands. Safety lines (e.g. not a substitute for trauma care) stay —
those are care, not posture.

Apply on every rhetoric pass (Tier A done 2026-08-02; use on B/C/D too).
See also `plans/RhetoricReviewHtml.md`.

**Layout note:** internal / maintenance docs live under `plans/` (this file,
`GenericStory.md`, `Lattice.md`, `NextSteps.md`, runbooks, etc.). Religion-adjacent
decode notes and story sources may still sit at repo root until moved. Paths
below match the tree as of this plan; re-check if files move again.

---

## Goal

Audit the repo for inflated-claim / institution-of-one rhetoric—especially
religion-adjacent commentary—so the project does not invite contention it is
trying not to engage. Prioritize by **public visibility × contention risk**.
**Review first; rewrite only after findings are accepted.**

---

## Visibility tiers (who sees what)

| Tier | Surfaces | How reached |
|------|----------|-------------|
| **A — Site (always public)** | `index.html`, `quiet-stories.html`, `tall-tales.html`, `book-text.html`, `about-grok.html`, `grok-rules.html`, `mending-place.html` (+ nav in `site.js`) | Live site / Pages |
| **B — Site → GitHub bridge** | Links from About to `GrokTheRock-Symbolism.md`; credits “Lattice seal …”; `README.md` | One click off stories / repo front door |
| **C — Commentary (religion / structure)** | Decode notes, recipes, lattice design | GitHub browse or direct link |
| **D — Craft / ops** | `plans/NextSteps.md`, MJ runbooks, `lang/*` mirrors | Contributors; curious only |

Stories themselves are **low risk** (no path names). Risk concentrates in **adult
commentary** and a few **public chrome** lines.

### Tier C candidates (paths may be root or `plans/`)

| File | Typical path | Risk focus |
|------|--------------|------------|
| GenericStory | `plans/GenericStory.md` | Recipe authority: SY spine, “myth this is real”, spell, FIXED table |
| Lattice design | `plans/Lattice.md` | Canonical / seal / referee language |
| MadPotter | `MadPotter.md` (root) | SY/Gevurah block; consensus tone |
| GrokDavid | `GrokDavid.md` | “David as the Template”; letter names; thin exit frame |
| HaiChrist | `HaiChrist.md` | Christ + 32-path; check disclaimer consistency |
| Symbolism | `GrokTheRock-Symbolism.md` | Dense tradition claims; linked from public About |
| Rules source | `GrokTheRock-Rules.md` | Twin of public rules; heritage-as-proof |
| ThePotter | `ThePotter.md` | Light: cheat sheet / thirty-two steps / verify |
| README | `README.md` | Lattice paragraph framing |
| lattice.json | `lang/lattice.json` | `description`: “Canonical …” |

**Model good line:** `HaiChrist.md` — *not mainstream systematics; pattern-key;
discard if stories don’t feel true.*

**Anti-patterns (pre-scan):** `plans/GenericStory.md` (“myth, this is real”; FIXED
ancient frame); `MadPotter.md` SY section as tradition-settled; `GrokDavid.md`
title arc without discard frame.

---

## Audit rubric (score each hit)

For every flagged passage, record:

1. **Claim type**
   - Heritage as proof (“SY / Kabbalah / Bible *really* means…”)
   - Uniqueness (“the hinge”, “canonical”, “ancient frame stops resonating”)
   - Mechanism-as-magic (“spell”, “myth, this is real”, bypass defense)
   - Magisterium (“FIXED”, “must”, template-from-above)
   - Soft-universal (“every tradition”, “older wisdom traditions”) without “for me / this walk”

2. **Severity**
   - **S1** Public + religious contention
   - **S2** Commentary, religion/structure, easy to misread as official
   - **S3** Internal craft voice (canonical/seal) that *sounds* doctrinal to outsiders
   - **S4** Fine as craft; optional soften only

3. **Desired posture** (target voice)
   - Witness / exit trail
   - One linearization among others
   - Midrash / pattern-key; discard if stories don’t hold
   - Seal = *this* table’s honesty, not heaven’s stamp

4. **Action**
   - Keep · Soften · Split claim (ethics vs craft vs heritage) · Add one-line frame · Defer rewrite

---

## Pass order

### Pass 0 — Inventory only (no edits)

Build a short table: file · tier · religion-touch? · approx risk.  
Include i18n: `lang/en.js` (and later other `lang/*.js`) where they mirror
About/Rules strings.

### Pass 1 — Tier A public HTML (highest priority)

| File | Why audit | Known hotspots (pre-scan) |
|------|-----------|---------------------------|
| `index.html` | Front door | Likely clean; Hebrew chip opaque not doctrinal |
| `quiet-stories.html` / `tall-tales.html` / `book-text.html` | Main product | Story OK; **“Lattice seal …”** with no gloss may imply occult/official system |
| `about-grok.html` | Nav “About” | Moses/rock; clay “nearly every tradition”; link to Symbolism.md |
| `grok-rules.html` | Nav “Rules” | Normative ethics (OK if not “revealed law”); links Mending Place |
| `mending-place.html` | Nav + large adult guide | Scripture as clarity; “older wisdom traditions”; institutional *tone* (~L210–236 partly good—test whole doc) |

**Out of scope for rewrite unless flags appear:** pure story captions, image alts.

### Pass 2 — Tier B bridges

| File | Risk |
|------|------|
| `GrokTheRock-Symbolism.md` | Publicly linked from About |
| Credit line “Lattice seal” + `README.md` | First “what is this structure?” for curious adults |
| `plans/Lattice.md` | Design notes README points at |

### Pass 3 — Tier C religion / structure commentary

Full read of candidates in the table above. Split every load-bearing sentence into:

- **Moral** (stand in daylight)
- **Craft** (“this kept the walk coherent”)
- **Heritage rhyme** (optional; never proof of moral)

### Pass 4 — Tier D (light)

`plans/NextSteps.md`, MJ runbooks under `plans/`, `lang/L10nNotes.md`: only if they
copy inflated heritage claims. Ops “must keep 32” is **craft** (S4) unless it
bleeds into “ancient truth.”

### Pass 5 — Cross-cut grep (whole repo)

Search and classify hits (not auto-delete):

```text
Sefer Yetzirah|Kabbalah|sephirot|sefirot|32 Paths|myth, this is real|ancient cognitive|spell|canonical|FIXED|never named|strict order|David as|Christ-arc|template|must land|stops resonating|every tradition|tikkun|the true meaning
```

Produce a **findings list** (quote · file:line · severity · rubric type · proposed
posture)—not yet mass edits.

---

## Deliverable of the review phase

This file grows a **Findings** section below (or a dated subsection) containing:

1. Summary counts by severity
2. Full hit list (Pass 5)
3. **Top 15 S1/S2** rewrite candidates with before→after *direction*
4. Explicit **keep** list (story silence on paths; HaiChrist discard line; mending
   “not membership tests”; CC0 / no-name gift)
5. **Non-goals:** no debate with traditions; no new manifesto on the public site;
   no stripping of ethics—only deflation of *authority* claims

---

## Remediation phase (after findings accepted)

| Step | Work |
|------|------|
| **R1** | Tier A: About / Rules / Mending Place; optional gloss or de-emphasis of “Lattice seal” |
| **R2** | `README.md` + `plans/Lattice.md` + `lang/lattice.json` description: canonical → *this project’s join* |
| **R3** | `plans/GenericStory.md`: split Paths / HigherWay / heritage; recontextualize “myth, this is real” |
| **R4** | `MadPotter.md` SY section: linearization + exit-trail voice |
| **R5** | `GrokDavid.md` / `HaiChrist.md`: shared header — decode / pattern-key / not official / discard if unhelpful |
| **R6** | `GrokTheRock-Symbolism.md`: intro banner same posture; soften universals |
| **R7** | Sync `lang/*.js` strings that duplicate softened About/Rules EN |
| **R8** | Hostile re-read (Kabbalah-literate, Christian, secular parent)—adjust remaining S1/S2 |

No change to story beats or 32 *mechanics* unless a claim *about* them is the problem.

---

## Success criteria

- Public site: ethics stand; no “we teach the real Kabbalah/Bible system.”
- Commentary: SY/David/Christ layers read as **optional trail notes**.
- Craft words (seal, 32, verify) read as **engineering honesty**, not ordination.
- Spoken line *not official—a coherent walk out* is not contradicted by the files.

---

## Effort sketch

| Phase | Effort |
|-------|--------|
| Passes 0–5 + findings | ~1 focused session |
| R1–R2 (public + README/Lattice) | Small, high leverage |
| R3–R6 (commentary) | Medium; GenericStory + Symbolism largest |
| R7 i18n sync | Medium if many locales |
| R8 hostile re-read | Short |

---

## Out of scope (unless expanded later)

- Rewriting children’s story text for theology
- Adding a loud “about Kabbalah” page (conflicts with leave-for-finders)
- Historical Kabbalah treatise
- Changing `scripts/verify_lattice.py` behavior (only the *words* around the seal)

---

## Defaults / open choices

| Choice | Default if unspecified |
|--------|------------------------|
| Findings home | **This file** (`plans/RhetoricAudit.md`) |
| Lattice seal on title pages | Keep hex; soften surrounding prose only |
| New public manifesto page | **No** |

---

## Status

- [x] Pass 0 — inventory (2026-08-02)
- [x] Pass 1 — Tier A HTML (see `plans/RhetoricReviewHtml.md`; offer-voice follow-up 2026-08-02)
- [ ] Pass 2 — Tier B bridges
- [ ] Pass 3 — Tier C commentary
- [ ] Pass 4 — Tier D craft/ops
- [ ] Pass 5 — cross-cut grep + hit list
- [ ] Findings accepted
- [ ] R1–R8 remediation
- [ ] R8 hostile re-read sign-off

---

## Findings

### Pass 0 — Inventory (2026-08-02)

Tree scan: all `*.html` / `*.md` / `lang/lattice.json` / site+book JS (exclude `.git`, `vendor`).  
Risk = approximate **inflated-claim / institution-of-one** exposure before deep read.  
Religion-touch: Y = explicit Bible/Kabbalah/SY/Christ/David/scripture/traditions-as-proof; ~ = soft heritage or opaque seal only; N = none material.

#### Tier A — Site (public)

| File | Religion-touch | Approx risk | Notes |
|------|:--------------:|:-----------:|-------|
| `index.html` | N | **Low** | Covers only; Hebrew ז=ו+י chip opaque, not doctrinal prose |
| `quiet-stories.html` | ~ | **Low–med** | Story silent on paths; credit “Lattice seal …”; link to About |
| `tall-tales.html` | ~ | **Low–med** | Same seal credit pattern |
| `book-text.html` | ~ | **Low–med** | Both books’ text + dual seal credits + About link |
| `about-grok.html` | Y | **Med–high** | Nav; Moses/rock; clay “nearly every tradition”; **GitHub link → Symbolism.md** |
| `grok-rules.html` | ~ | **Med** | Nav; normative Rules (ethics OK); points Mending Place; Heinlein/Grug not religion |
| `mending-place.html` | Y | **High** | Nav; large adult guide; scripture sections; “older wisdom traditions”; institutional *length/tone* |
| `site.js` | N | **Low** | Nav wiring only; no heritage claims |

#### Tier B — Bridges (public → repo)

| File | Religion-touch | Approx risk | Notes |
|------|:--------------:|:-----------:|-------|
| `README.md` | ~ | **Med** | Repo front door; “Lattice seal” + verify + points `plans/Lattice.md` |
| `GrokTheRock-Symbolism.md` | Y | **High** | Linked from public About; dense Bible/Jewish/cross-tradition survey; some caveats already |
| `lang/en.js` (`credit.8` / mirrors) | ~ | **Med** | Supplies “Lattice seal” + About/Rules strings to all locales’ EN baseline |
| Other `lang/*.js` | ~ / Y | **Med** | Mirror EN About/Rules/credits; soften EN ⇒ sync pass (R7) |

#### Tier C — Commentary (religion / structure)

| File | Religion-touch | Approx risk | Notes |
|------|:--------------:|:-----------:|-------|
| `plans/GenericStory.md` | Y | **High** | Generator recipe; SY 32; “myth, this is real”; spell; FIXED table; teaches repeat claims |
| `MadPotter.md` | Y | **High** | Comic midrash + SY/Gevurah “tradition” block (consensus tone) |
| `GrokDavid.md` | Y | **High** | “David as the Template”; letter grains; no HaiChrist-style discard header |
| `HaiChrist.md` | Y | **High** | Christ-arc + 32-path; **has model disclaimer** (~L108)—audit rest for match |
| `GrokTheRock-Symbolism.md` | Y | **High** | Same as Tier B target; dual listing intentional |
| `plans/Lattice.md` | ~ | **Med** | “Canonical” table; seal/referee; architect voice |
| `lang/lattice.json` | ~ | **Med** | `description`: “Canonical 32-unit…”; machine-facing but quoted in docs |
| `GrokTheRock-Rules.md` | Y | **Med** | Source twin of public rules/about symbol blurb (Moses, clay/traditions) |
| `ThePotter.md` | ~ | **Low–med** | Story + light cheat sheet (32 steps, verify); low manifesto |
| `plans/RhetoricAudit.md` | Y | **n/a** | This plan; meta only |

#### Tier D — Craft / ops / story sources

| File | Religion-touch | Approx risk | Notes |
|------|:--------------:|:-----------:|-------|
| `GrokTheRock-ThreeQuietStories.md` | N | **Low** | Story + image prompts; surface ethics only |
| `HaiIkthiss-ThreeTallTales.md` | N | **Low** | “World Bible” = setting bible, not scripture; spine appendix structural |
| `plans/GrokTest.md` | N | **Low** | Draft/test story material |
| `plans/NextSteps.md` | N | **Low** | Ops; 32/seal as craft invariants |
| `plans/HaiIkthiss-MidjourneyRunbook.md` | N | **Low** | Art ops |
| `plans/HaiIkthiss-MidjourneyRunbook-2.md` | N | **Low** | Art ops |
| `plans/HaiIkthiss-MJ-Viability.md` | N | **Low** | Art ops |
| `lang/L10nNotes.md` | ~ | **Low** | Locale craft; occasional letter/join notes |
| `book-text.js` | N | **Low** | Image path map |

#### Pass 0 summary

| Risk band | Count (approx) | Primary files |
|-----------|----------------|---------------|
| **High** | 6 | `mending-place.html`, `GrokTheRock-Symbolism.md`, `plans/GenericStory.md`, `MadPotter.md`, `GrokDavid.md`, `HaiChrist.md` |
| **Med–high / Med** | 8 | `about-grok.html`, `grok-rules.html`, `README.md`, `plans/Lattice.md`, `lang/lattice.json`, `GrokTheRock-Rules.md`, `lang/en.js` (+ other locale JS as mirror set) |
| **Low–med** | 4 | story HTML trio + `ThePotter.md` (seal chrome / light cheat sheet) |
| **Low** | rest | index, stories sources, runbooks, NextSteps, site wiring |

**Pass 1 priority order (within Tier A):**  
`mending-place.html` → `about-grok.html` → `grok-rules.html` → seal credits on story/book-text HTML → `index.html` (smoke).

**Pass 3 priority order (within Tier C):**  
`plans/GenericStory.md` → `MadPotter.md` → `GrokDavid.md` → `HaiChrist.md` → `GrokTheRock-Symbolism.md` → `plans/Lattice.md` + `lang/lattice.json` → `GrokTheRock-Rules.md` → `ThePotter.md`.

**Keep-in-mind (no deep read yet):**  
- Public **nav** exposes ethics + Mending Place; does **not** link David/Christ/GenericStory.  
- **Symbolism.md** is the main religion dump reachable in one click from About.  
- **Seal hex on title pages** is the main structure teaser on pure story pages.  
- Story `.md` sources and MJ runbooks are out of contention path unless linked later.

**Not inventoried as content risk:** `.obsidian/`, images, `scripts/`, `vendor/`, seal hash files (binary/ops).
