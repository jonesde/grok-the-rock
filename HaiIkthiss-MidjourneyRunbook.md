# Hai Ikthiss — Midjourney Runbook

Manual production script for **full Midjourney redo** of *Three Tall Tales* art.
Source canon: `HaiIkthiss-ThreeTallTales.md`.
Interface: **midjourney.com** web Imagine bar (no Discord API).
Character lock: **V7 + Omni Reference (`--oref`)**. Style lock: **Style Reference (`--sref`)**.

Title lettering is **never** in the image — web/print overlays handle chapter titles and body text.

**Paste rule:** Each fenced `text` block is one full Imagine paste — prompt **and** parameters at the end. Fill `{{…}}` placeholders with real image URLs (or pin the same refs in the web UI and delete the `--sref` / `--oref` flags if the UI already has them locked).

---

## Progress checklist

### Setup
- [ ] Phase A — style lock approved → fill `{{SREF_STYLE}}`
- [ ] Phase B — all character / landmark sheets approved → fill all `{{OREF_*}}`
- [ ] Defaults tested (one throwaway scene) and stylize/ow/sw dialed

### Pages
- [ ] Cover
- [ ] Dedication
- [ ] p1 · p2 · p3 · p4 · p5 · p6 · p7 · p8 · p9
- [ ] p10 · p11 · p12 · p13 · p14 · p15 · p16 · p17
- [ ] p18 · p19 · p20 · p21 · p22 · p23 · p24 · p25 · p26

### Handoff (later; not this file)
- [ ] Export 1650×2550 JPEGs under `images/hai/`
- [ ] Triple-book paths: `tall-tales.html` · `site.js` FILES · `book-text.html` PAGE_BG

---

## 0. How to use (web)

### 0.1 Fixed defaults

| Control | Value | Notes |
|--------|--------|--------|
| Version | **V7** | Omni Reference forces V7; keep it intentional |
| Aspect | **`--ar 11:17`** | Matches site 1650×2550 portrait |
| Style raw | **`--style raw`** | Less default MJ gloss; closer to atmospheric watercolor |
| Stylize | **`--s 150`** | Raise only if images feel stiff; lower if style drifts |
| Style weight | **`--sw 150`** | With `{{SREF_STYLE}}` |
| Omni weight | **`--ow 150`** | Raise toward 200–300 if character slips; keep under ~400 |
| Chaos | omit / **`--c 0`** | Consistency over surprise |
| Speed | Relax OK | Omni Reference costs **2× GPU**; not Fast/Draft |

Tune `--s` / `--sw` / `--ow` once in Phase A/B; then change the same numbers in every paste block (or search-replace) unless a job notes otherwise.

**Default suffix shapes** (already baked into each block):

```text
# Phase A (no refs yet)
--ar 11:17 --v 7 --style raw --s 200

# Phase B sheets (sref only)
--sref {{SREF_STYLE}} --sw 150 --ar 11:17 --v 7 --style raw --s 150

# Story pages (sref + oref)
--sref {{SREF_STYLE}} --sw 150 --oref {{OREF_…}} --ow 150 --ar 11:17 --v 7 --style raw --s 150
```

### 0.2 Placeholders (fill as you go)

| Placeholder | Meaning |
|-------------|---------|
| `{{SREF_STYLE}}` | Style Reference image URL(s) — book watercolor lock |
| `{{OREF_CROWN}}` | Lord Ikthiss — rooted crown (face high in trunk) |
| `{{OREF_QUIET}}` | Quiet crown — same tree, no face |
| `{{OREF_KAI}}` | Kai — living walking seed-pod |
| `{{OREF_WALK}}` | Walking Hai — living walking tall tree |
| `{{OREF_PIP}}` | Pip — nine-banded armadillo |
| `{{OREF_MACAW}}` | Scarlet macaw |
| `{{OREF_OWL}}` | Old spectacled owl |
| `{{OREF_HOWLER}}` | Howler monkey |
| `{{OREF_TAPIR}}` | Baird’s tapir |
| `{{OREF_TOUCAN}}` | Keel-billed toucan |
| `{{OREF_COATI}}` | Coati (optional; p13) |
| `{{OREF_AGOUTI}}` | Agouti (optional; p13) |

**Web alternative:** Image icon → drag into **Style Reference** / **Omni Reference** → lock pin. If refs are pinned in the UI, strip `--sref …` / `--oref …` / `--sw` / `--ow` from the paste so you do not double-apply. Parameters for aspect/version/style/stylize still paste fine.

Only **one** Omni Reference per job. For multi-character pages: primary character as `--oref`; describe others in text. Optional: combined cast plate as oref on group pages.

### 0.3 Per-job ritual

1. Replace `{{…}}` in the paste block with real URLs (or pin refs in UI and trim flags).
2. Copy the entire fenced block → Imagine bar.
3. Generate → pick best of 4 (or reroll / vary).
4. Upscale winner.
5. Fill **Record** fields under that job.
6. Acceptance check before marking the page done.

### 0.4 Acceptance (every image)

- [ ] Correct Hai **form** (crown / quiet / Kai / walking) — never mixed
- [ ] Kind face, child-safe — no scary Ent, no claws, no harsh darkness
- [ ] Clear **lower ~40%** (or as noted) open for text overlay — no critical faces/action in the text band
- [ ] No title lettering, no chapter numbers, no captions in the art
- [ ] No buildings, temples, ruins, pyramids, glyphs, stelae
- [ ] No blood/wounds — water and light only for “outpouring”
- [ ] Not Australian outback; not English oak; Honduran highland Ceiba jungle feel
- [ ] No cartoon black outlines; atmospheric watercolor texture
- [ ] Portrait 11:17; export path noted

### 0.5 Naming when you save locally

```text
images/hai/reference/{hai-main|hai-empty|hai-seed|hai-walk|pip|macaw|owl|…}-mj-{uuid}.jpg
images/hai/{cover|dedication|page-N}-mj-{uuid}.jpg
```

Target display size: **1650×2550**. Upscale in MJ, then crop/resize if needed (`scripts/lanczos_upscale.py` only if you already use it for Grok assets).

### 0.6 Canon bans (already in prompts)

No soft colored-pencil Grug look; no cartoon outlines; no harsh contrast; no scary Ent faces; no war/darkness; no outback red earth or Australian animals; no Maya archaeology; no blood or ritual violence.

### 0.7 Art style one-liner (for style-only jobs)

Detailed atmospheric watercolor, fine natural texture; soft vapor-mist distance, clearer bark/leaf/buttress/water near; quiet grandeur; living-jungle palette: Ceiba grey-green bark, soft umber, deep leaf tiers, spring turquoise-silver, cool vapor grey, warm gold on high canopy, soft cream sky; kind child-safe wonder.

---

## Phase A — Style lock

**Goal:** 1–3 images that define the book’s medium, palette, depth, and light. Those URLs become `{{SREF_STYLE}}`.

**Do not** put story plot or specific named characters in these (generic Ceiba valley OK).

### A1. Style grid — valley atmosphere

**Pin / oref:** none

```text
Detailed atmospheric watercolor children’s book illustration, fine natural texture. Highland Honduran valley: emergent Ceiba kapok above layered canopy, buttress roots, ferns, philodendron, bromeliads, clear natural spring pool, soft tropical vapor-mist in hollows, warm gold god-rays on high canopy, cool mist below, soft far green ridges. Living-jungle palette grey-green bark, deep leaf green, turquoise-silver water, cream sky. Quiet grandeur, kind innocent mood, soft edges in distance, sharper near detail. Empty of people and buildings. Portrait page, generous clear lower area. No cartoon outlines, no harsh darkness, no temples, no ruins --ar 11:17 --v 7 --style raw --s 200
```

**Record**
- Job / URL:
- Seed:
- Chosen:
- Local:
- Notes:

### A2. Style grid — forest floor close

```text
Detailed atmospheric watercolor, fine natural texture. Close jungle forest-floor garden: leaf litter, fern edges, root beds, cantaloupe rockmelon vines, filtered gold light through canopy, soft mist depth, clear tiny spring trickle. Living-jungle greens and bark greys, warm cream light. Children’s book illustration, quiet intimate grandeur, empty of characters. Clear lower third. No cartoon outlines, no buildings, no harsh darkness --ar 11:17 --v 7 --style raw --s 200
```

**Record**
- Job / URL:
- Seed:
- Chosen:
- Local:
- Notes:

### A3. Pick and lock

- [ ] Choose 1–3 winners (mix A1 wide + A2 close works well as multi-sref)
- [ ] Fill (space-separate multiple URLs if needed):

```text
{{SREF_STYLE}} = 5657360796
```

**Smoke test** (after lock — optional):

```text
Detailed atmospheric watercolor children’s book illustration. A vast kind living tall Ceiba by a clear spring in a highland Honduran valley, gentle face high in the trunk, soft vapor-mist, warm gold on canopy, quiet grandeur, clear lower area for text. No cartoon outlines, no buildings, no text, no letters --sref {{SREF_STYLE}} --sw 150 --ar 11:17 --v 7 --style raw --s 150
```

---

## Phase B — Character and cast reference sheets

Plain / minimal background. Character is the subject. Same art style as Phase A.
After each approval, paste the **image URL** into the placeholder.

First generation of a sheet: **sref only** (creating the lock).
Later variants may add `--oref` of the approved sheet to tighten.

---

### B1. `{{OREF_CROWN}}` — Lord Ikthiss, rooted crown

**Use when:** Cover, Ch.1 pages, Ch.3 p19–21, any rooted tall-tree face.

```text
Character reference sheet, portrait. Detailed atmospheric watercolor, fine natural texture. Lord Ikthiss as a vast kind living tall Ceiba kapok of a Honduran highland valley: pale grey-green trunk with readable bark, great buttress roots, soft moss in bark creases, high tiered canopy of palmate leaf-green like open hands filtering warm gold light. A gentle face set high in the upper trunk — wise kind eyes, soft bark brows, patient almost-smile; face is part of the wood, not a mask stuck on. Deep buttress roots at the base touching a thin bright spring. Full figure from roots to crown, centered, clear Ceiba silhouette. Soft cream or light vapor-mist background, minimal. Quiet grandeur, child-safe, innocent. No cartoon outlines, no scary Ent face, no harsh darkness, no buildings or ruins. No text, no letters, no labels --sref 5657360796 --sw 150 --ar 11:17 --v 7 --style raw --s 150
```

**Record**
- Job / URL:
- Seed:
- Chosen:
- Local: `images/hai/reference/hai-main-mj-________.jpg`
- **`{{OREF_CROWN}}` =**

```
Character reference sheet, portrait, white background. Detailed atmospheric watercolor, fine natural texture. Full figure of Lord Ikthiss as a kind living tall thin Ceiba kapok, roots to crown, centered. Pale grey-green trunk, great buttress roots, soft moss in bark creases, high tiered palmate canopy like open hands filtering warm gold light. The same gentle bark face as the reference — wise kind eyes, soft brows, patient almost-smile — set high in the upper trunk, small but clearly readable, part of the wood. Deep buttress roots touching a thin bright spring. Clear Ceiba silhouette. Soft cream or light vapor-mist background, minimal. Quiet grandeur, child-safe, innocent. Match the face from the omni reference; keep body and canopy consistent with that face. No cartoon outlines, no scary Ent face, no harsh darkness, no buildings or ruins. No text, no letters, no labels --sref 5657360796 --sw 100 --ow 120 --ar 11:17 --v 7 --style raw --s 120
```

Face only: 8b696544-8a14-4095-b4d1-257be4d2f5c7
```
Character reference sheet, portrait, FLAT WHITE BACKGROUND, no decoration outside the character. Naturalistic Ceiba pentandra kapok, towering emergent rainforest tree, very tall slender straight bole, long narrow columnar trunk, height many times greater than width, high umbrella canopy only at the top of a long clean shaft, small buttress fins only at the base, graceful vertical silhouette like a real wild Central American ceiba, botanical proportions. Wide establishing shot, full tree from a distance, thin vertical form, generous empty cream space around it. Tiny gentle bark face high on the upper trunk — same wise kind eyes and patient smile as the omni reference, no larger than a wood knot, small detail only, does not widen the trunk. Pale grey-green bark, soft moss, warm gold light in the high canopy, thin bright spring at roots. Detailed atmospheric watercolor, fine natural texture, quiet grandeur, child-safe. Soft cream background. No squat tree, no stout trunk, no fat trunk, no short tree, no dumpy tree, no barrel trunk, no baobab, no oak, no huge face, no face close-up, no cartoon outlines, no scary Ent, no buildings. No text, no letters --sref 5657360796 --sw 100 --ow 50 --ar 11:17 --v 7 --style raw --s 100 --no squat tree, stout trunk, fat trunk, short tree, dumpy, barrel trunk, baobab, oak, large face, close-up face, decoration around character, non-white background
```


---

### B2. `{{OREF_QUIET}}` — Quiet crown (no face)

**Use when:** Ch.2 scenes with Kai on the ground; landmark tree behind.

```text
Character landmark reference sheet, portrait. Detailed atmospheric watercolor, fine natural texture. The same vast living tall Ceiba as Lord Ikthiss crown form — identical buttress shape, grey-green bark, moss creases, palmate leaf-green canopy — but no face in the trunk; upper wood peaceful, still, empty of features, as if the kind spirit stepped away. Roots and a hint of clear spring at the base. Full tree from roots to crown, centered. Soft cream or light vapor-mist background. Calm, waiting, not lifeless. Child-safe. No face, no hollow horror, no cartoon outlines, no buildings. No text, no letters --sref {{SREF_STYLE}} --sw 150 --ar 11:17 --v 7 --style raw --s 150
```

**Optional tighten** (after B1 approved — lower ow so face stays gone):

```text
Character landmark reference sheet, portrait. Detailed atmospheric watercolor, fine natural texture. The same vast living tall Ceiba as Lord Ikthiss crown form — identical buttress shape, grey-green bark, moss creases, palmate leaf-green canopy — but no face in the trunk; upper wood peaceful, still, empty of features, as if the kind spirit stepped away. Roots and a hint of clear spring at the base. Full tree from roots to crown, centered. Soft cream or light vapor-mist background. Calm, waiting, not lifeless. Child-safe. No face, no hollow horror, no cartoon outlines, no buildings. No text, no letters --sref {{SREF_STYLE}} --sw 150 --oref {{OREF_CROWN}} --ow 80 --ar 11:17 --v 7 --style raw --s 150
```

**Record**
- Job / URL:
- Seed:
- Chosen:
- Local: `images/hai/reference/hai-empty-mj-________.jpg`
- **`{{OREF_QUIET}}` =**

---

### B3. `{{OREF_KAI}}` — Kai, living walking seed

**Use when:** All Ch.2 story pages (and p10 chapter art).

```text
Character reference sheet, portrait. Detailed atmospheric watercolor, fine natural texture. Kai: a small living walking Ceiba kapok seed-pod creature, roughly child-animal scale. Oblong warm hull soft green-brown to light bark tone, gentle pod ridges ok, tiny sturdy root-feet, a soft kapok-silk wisp and tiny green sprout-tuft on top, simple friendly face with wise kind eyes and patient seed-smile. Tiny arm-like rootlets that can hold a digging stick. Whole figure clearly readable as a friendly kapok pod, centered, standing. Soft cream or light garden-mist background, minimal. Kind, humble, endearing — not cute-flat, not scary. No cartoon outlines. No text, no letters --sref {{SREF_STYLE}} --sw 150 --ar 11:17 --v 7 --style raw --s 150
```

**Record**
- Job / URL:
- Seed:
- Chosen:
- Local: `images/hai/reference/hai-seed-mj-________.jpg`
- **`{{OREF_KAI}}` =**

---

### B4. `{{OREF_WALK}}` — Walking Hai

**Use when:** Ch.3 from p22 onward (and p18 chapter art).

```text
Character reference sheet, portrait. Detailed atmospheric watercolor, fine natural texture. Lord Ikthiss as a living walking tall Ceiba: long kind limb-branches of living wood, grey-green bark skin with fine grain and soft moss, deep buttress-root feet that can step slowly, leaf-hair or living leaf-and-soft-kapok crown, warm wise eyes in a gentle bark face at a height small animals can meet — meetable, not sky-high. Canopy leaf mass suggests height and shelter; posture open and inviting, never looming to dominate. Full figure standing, centered, clear kind Ceiba silhouette. Soft cream or jungle-mist background, minimal. Quiet grandeur, wonder without fright. Child-safe. No scary Ent face, no claws, no harsh darkness, no cartoon outlines, no buildings. No text, no letters --sref {{SREF_STYLE}} --sw 150 --ar 11:17 --v 7 --style raw --s 150
```

**Optional bridge pose** (after standing lock):

```text
Same character as walking tall Ceiba reference, detailed atmospheric watercolor. Bent like a gentle bridge, one great kind wooden hand open low inviting a small friend. Kind meetable face, never scary. Soft cream mist background, full figure. No text, no letters --sref {{SREF_STYLE}} --sw 150 --oref {{OREF_WALK}} --ow 150 --ar 11:17 --v 7 --style raw --s 150
```

**Record**
- Job / URL:
- Seed:
- Chosen:
- Local: `images/hai/reference/hai-walk-mj-________.jpg`
- **`{{OREF_WALK}}` =**
- Bridge variant URL (optional):

---

### B5. `{{OREF_PIP}}` — Pip the nine-banded armadillo

**Appears:** p12–17, p23–24, p25–26. **Lock required.**

```text
Character reference sheet, portrait. Detailed atmospheric watercolor, fine natural texture. Pip: a small young nine-banded armadillo, Dasypus novemcinctus, soft armor bands, warm brown-grey shell, expressive gentle eyes, small ears, kind child-safe face. Standing three-quarter view, full body centered, readable silhouette. Soft cream or light garden-mist background. Innocent children’s book animal, not realistic-scary, not cute-flat cartoon. No cartoon black outlines. No text, no letters --sref {{SREF_STYLE}} --sw 150 --ar 11:17 --v 7 --style raw --s 150
```

**Record**
- Job / URL:
- Seed:
- Chosen:
- Local: `images/hai/reference/pip-mj-________.jpg`
- **`{{OREF_PIP}}` =**

---

### B6. `{{OREF_MACAW}}` — Scarlet macaw

**Appears:** p20–21, p24–26. **Lock required.**

```text
Character reference sheet, portrait. Detailed atmospheric watercolor, fine natural texture. A scarlet macaw with brilliant red yellow blue plumage, long elegant tail, grand but not mean expression, chest-out caution personality readable as proud not cruel. Full body perched or standing, centered, fine feather texture. Soft cream or light mist background. Child-safe children’s book animal. No cartoon outlines. No text, no letters --sref {{SREF_STYLE}} --sw 150 --ar 11:17 --v 7 --style raw --s 150
```

**Record**
- Job / URL:
- Seed:
- Chosen:
- Local: `images/hai/reference/macaw-mj-________.jpg`
- **`{{OREF_MACAW}}` =**

---

### B7. `{{OREF_OWL}}` — Old spectacled owl

**Appears:** p21, p24–26. **Lock required.**

```text
Character reference sheet, portrait. Detailed atmospheric watercolor, fine natural texture. A very old spectacled owl, plain soft feathers, pale facial discs like spectacles, round wise gentle face, slow soft dignity. Full body, centered. Soft cream or cool mist background. Child-safe, humble, not scary night-horror. No cartoon outlines. No text, no letters --sref {{SREF_STYLE}} --sw 150 --ar 11:17 --v 7 --style raw --s 150
```

**Record**
- Job / URL:
- Seed:
- Chosen:
- Local: `images/hai/reference/owl-mj-________.jpg`
- **`{{OREF_OWL}}` =**

---

### B8. `{{OREF_HOWLER}}` — Howler monkey

**Appears:** p3, p8. **Lock required.**

```text
Character reference sheet, portrait. Detailed atmospheric watercolor, fine natural texture. A howler monkey with rich coat, expressive face mid cheerful proud call, never ferocious, never teeth-bared aggression. Full body, centered, child-safe. Soft cream or canopy-mist background. No cartoon outlines. No text, no letters --sref {{SREF_STYLE}} --sw 150 --ar 11:17 --v 7 --style raw --s 150
```

**Record**
- Job / URL:
- Seed:
- Chosen:
- Local: `images/hai/reference/howler-mj-________.jpg`
- **`{{OREF_HOWLER}}` =**

---

### B9. `{{OREF_TAPIR}}` — Baird’s tapir

**Appears:** p4, p8. **Lock required.**

```text
Character reference sheet, portrait. Detailed atmospheric watercolor, fine natural texture. A sturdy Baird’s tapir, solid gentle body, short flexible trunk-nose, kind calm eyes, bowing-ready posture. Full body, centered. Soft cream or forest-floor mist background. Child-safe children’s book animal. No cartoon outlines. No text, no letters --sref {{SREF_STYLE}} --sw 150 --ar 11:17 --v 7 --style raw --s 150
```

**Record**
- Job / URL:
- Seed:
- Chosen:
- Local: `images/hai/reference/tapir-mj-________.jpg`
- **`{{OREF_TAPIR}}` =**

---

### B10. `{{OREF_TOUCAN}}` — Keel-billed toucan

**Appears:** p5. **Lock recommended.**

```text
Character reference sheet, portrait. Detailed atmospheric watercolor, fine natural texture. A keel-billed toucan with bright multicolor bill, bright eye, open bill in grand joyful praise-call — never gothic, never omen-dark. Full body on a simple branch suggestion, centered. Soft cream mist background. Child-safe. No cartoon outlines. No text, no letters --sref {{SREF_STYLE}} --sw 150 --ar 11:17 --v 7 --style raw --s 150
```

**Record**
- Job / URL:
- Seed:
- Chosen:
- Local: `images/hai/reference/toucan-mj-________.jpg`
- **`{{OREF_TOUCAN}}` =**

---

### B11. `{{OREF_COATI}}` — Coati (optional)

**Appears:** p13 crowd.

```text
Character reference sheet, portrait. Detailed atmospheric watercolor, fine natural texture. A coati, sleek body, long snout, ringed tail, sharp-eyed slightly muttering expression, still child-safe not villainous. Full body, centered. Soft cream mist background. No cartoon outlines. No text, no letters --sref {{SREF_STYLE}} --sw 150 --ar 11:17 --v 7 --style raw --s 150
```

**Record**
- **`{{OREF_COATI}}` =**
- Local:

---

### B12. `{{OREF_AGOUTI}}` — Agouti (optional)

**Appears:** p13 crowd.

```text
Character reference sheet, portrait. Detailed atmospheric watercolor, fine natural texture. An agouti, small quick warm brown-orange coat, demanding but not scary expression, child-safe. Full body, centered. Soft cream mist background. No cartoon outlines. No text, no letters --sref {{SREF_STYLE}} --sw 150 --ar 11:17 --v 7 --style raw --s 150
```

**Record**
- **`{{OREF_AGOUTI}}` =**
- Local:

---

### B13. Optional multi-cast plate (for hard group pages)

If p13 / p24 / p26 refuse to hold multiple animals, make one plate with Pip + macaw + owl (+ howler/tapir) on cream ground, then `--oref` that plate on group pages.

```text
Character reference sheet, multiple figures on one page. Detailed atmospheric watercolor, fine natural texture. Equal standing cast on soft cream mist background, spaced clearly left to right: Pip nine-banded armadillo; old spectacled owl; scarlet macaw; howler monkey; Baird’s tapir. Each full body, child-safe, consistent children’s book style, fine natural texture, no overlapping mess. No cartoon outlines. No text, no letters, no labels, no name tags --sref {{SREF_STYLE}} --sw 150 --ar 11:17 --v 7 --style raw --s 150
```

**Record**
- Multi-cast plate URL:
- Local:

---

### Phase B gate

- [ ] All of CROWN, QUIET, KAI, WALK, PIP, MACAW, OWL, HOWLER, TAPIR approved
- [ ] TOUCAN approved (or accept single-page drift)
- [ ] Placeholder table filled
- [ ] Same eyes/gentleness readable across CROWN → KAI → WALK

---

## Phase C — Pages

**Production order** (consistency first):

1. Cover → p1 → p2 → p3–p9 (crown form)
2. Dedication
3. p10 → p11–p17 (Kai + quiet + Pip)
4. p18 → p19–p21 (crown return)
5. p22–p26 (walking form; hardest)

Strip rule: **no titles, no “1. Being”, no hand-lettering, no captions in frame.**

Lower `--ow` to ~80–100 in a copy if oref freezes pose; raise toward 200–300 if identity slips.

---

### Cover

**Beat:** Hai as living height over valley; creatures look up.
**Form:** Rooted crown · **oref:** `{{OREF_CROWN}}`

```text
Children’s picture book cover, portrait orientation. Detailed atmospheric watercolor with fine natural texture; soft distant vapor-mist, clearer near detail. Living-jungle palette: Ceiba bark grey-green and soft umber, deep leaf green, clear spring turquoise-silver, cool mist grey, warm gold on high canopy, soft cream sky. Central character: Lord Hai Ikthiss — a vast kind living tall Ceiba with a gentle face in the upper trunk, wise kind eyes, canopy like open hands, deep buttress roots drinking a bright spring. He rules from the crown with quiet care, not pride. Small highland-valley creatures far below look up in awe through layered mist. Ancient highland valley with glowing jungle pool, canopy slopes, and soft far ridges in atmospheric perspective. Quiet grandeur, calm, wondrous mood. Soft open space near top or bottom for later title overlay — keep that band simple, no lettering in the image. No cartoon outlines, no harsh darkness, no buildings, no ruins, no temples. No text, no letters, no logos --sref {{SREF_STYLE}} --sw 150 --oref {{OREF_CROWN}} --ow 150 --ar 11:17 --v 7 --style raw --s 150
```

**Record**
- Job / URL: · Seed: · Variant:
- Local: `images/hai/cover-mj-________.jpg`
- Done: [ ]

---

### Dedication

**Beat:** Minimal cream page; sprouts, water drop, optional tiny far Ceiba.
**oref:** none

```text
Almost blank warm cream page, delicate atmospheric watercolor wash. At the centre bottom: three tiny green sprouts beside a single drop of clear water and a small smooth fish-shaped glint of light on the water — very subtle, fine natural texture. Very minimal, generous open space, soft morning mist-light. Delicate ferns and Ceiba leaves at the edges with soft detail. Calm, quiet, inviting large negative space above for dedication text overlay. Portrait children’s book page. Optional: tiny soft silhouette of a tall Ceiba far in cool mist over a highland valley, very small. No buildings. No text, no letters, no numbers --sref {{SREF_STYLE}} --sw 120 --ar 11:17 --v 7 --style raw --s 100
```

**Record**
- Job / URL: · Seed: · Variant:
- Local: `images/hai/dedication-mj-________.jpg`
- Done: [ ]

---

### Page 1 — Ch.1 opener (Being)

**oref:** `{{OREF_CROWN}}`

```text
Chapter-opening illustration, no lettering. Soft cream ground with atmospheric watercolor depth. A large characterful living tall Ceiba dominates the upper portion — Hai Ikthiss as the first tree of the highland valley, palmate leaves filtering warm early-morning gold, a kind face suggested in finely textured bark; cool vapor-mist softens the far canopy edge. Below, small valley creatures look upward with bright praise. A clear spring rings the buttress roots. Soft ridges hinted beyond the green canopy. Peaceful, high, slightly lonely quiet grandeur. Portrait children’s book page, clear lower area for text overlay. No cartoon outlines. No buildings. No text, no letters, no numbers, no titles --sref {{SREF_STYLE}} --sw 150 --oref {{OREF_CROWN}} --ow 150 --ar 11:17 --v 7 --style raw --s 150
```

**Record** · Local: `images/hai/page-1-mj-________.jpg` · Done: [ ]

---

### Page 2 — First tree alone

**oref:** `{{OREF_CROWN}}`

```text
Detailed atmospheric watercolor children’s illustration. Dawn over a young highland valley in layered vapor-mist. Hai Ikthiss is a single tall living Ceiba with a gentle face high in the trunk, alone at first, buttress roots drinking a bright new spring — fine bark and water texture in the near ground, soft canopy ridges dissolving into mist beyond. Soft first grasses and one small bird arriving. Warm gold height-light on the canopy. Text space clear in lower 40%. Innocent, quiet creation mood; quiet grandeur. Portrait page. No cartoon outlines, no harsh darkness, no buildings. No text, no letters --sref {{SREF_STYLE}} --sw 150 --oref {{OREF_CROWN}} --ow 150 --ar 11:17 --v 7 --style raw --s 150
```

**Record** · Local: `images/hai/page-2-mj-________.jpg` · Done: [ ]

---

### Page 3 — Howler cheers; eyes unseen

**Primary oref:** `{{OREF_CROWN}}` · **Alt oref:** `{{OREF_HOWLER}}` (if monkey identity matters more)

```text
Gentle storytelling scene in detailed atmospheric watercolor. Hai Ikthiss the tall living Ceiba high above through layered canopy depth. A proud howler monkey leads a cheer at the roots, head lifted toward the canopy with a bright loud call — rich coat, never ferocious. Other small jungle creatures join the praise. Hai’s kind face is above them, softly unseen in bark and leaf-shadow. Clear spring and ferny forest floor with fine near detail; warm morning gold on high leaves, cool mist in the understory. Clear sense of height and missed connection. Quiet grandeur, child-safe. Text space about 40% height at bottom. Portrait page. No buildings. No text, no letters --sref {{SREF_STYLE}} --sw 150 --oref {{OREF_CROWN}} --ow 150 --ar 11:17 --v 7 --style raw --s 150
```

**Alt (howler lock):**

```text
Gentle storytelling scene in detailed atmospheric watercolor. Hai Ikthiss the tall living Ceiba high above through layered canopy depth, gentle face high in grey-green bark, buttress roots and clear spring. A proud howler monkey leads a cheer at the roots, head lifted toward the canopy with a bright loud call — rich coat, never ferocious. Other small jungle creatures join the praise. Hai’s kind face is above them, softly unseen in bark and leaf-shadow. Fine near detail; warm morning gold on high leaves, cool mist in the understory. Quiet grandeur, child-safe. Text space about 40% height at bottom. Portrait page. No buildings. No text, no letters --sref {{SREF_STYLE}} --sw 150 --oref {{OREF_HOWLER}} --ow 150 --ar 11:17 --v 7 --style raw --s 150
```

**Record** · Local: `images/hai/page-3-mj-________.jpg` · Done: [ ]

---

### Page 4 — Tapir bows to bark

**Primary oref:** `{{OREF_CROWN}}` · **Alt:** `{{OREF_TAPIR}}`

```text
Warm earthy scene in detailed atmospheric watercolor. Sturdy Baird’s tapir with gentle trunk-nose bows toward the great buttress trunk of Hai Ikthiss, praising loudly. Other animals copy the bow toward bark and shade — fine bark grain, leaf litter, and mossy stone in the foreground. The tree’s gentle face high above looks kind and a little alone through soft canopy mist. Jungle understory, gentle gold-and-cool light. Tender moment of praise without seeing. Quiet grandeur. Text space about 40% height at bottom. Portrait page. No buildings. No text, no letters --sref {{SREF_STYLE}} --sw 150 --oref {{OREF_CROWN}} --ow 150 --ar 11:17 --v 7 --style raw --s 150
```

**Alt (tapir lock):**

```text
Warm earthy scene in detailed atmospheric watercolor. Sturdy Baird’s tapir with gentle trunk-nose bows toward the great buttress trunk of Hai Ikthiss the tall living Ceiba, praising loudly. Other animals copy the bow toward bark and shade — fine bark grain, leaf litter, and mossy stone in the foreground. The tree’s gentle face high above looks kind and a little alone through soft canopy mist. Jungle understory, gentle gold-and-cool light. Text space about 40% height at bottom. Portrait page. No buildings. No text, no letters --sref {{SREF_STYLE}} --sw 150 --oref {{OREF_TAPIR}} --ow 150 --ar 11:17 --v 7 --style raw --s 150
```

**Record** · Local: `images/hai/page-4-mj-________.jpg` · Done: [ ]

---

### Page 5 — Toucan; hollow cup

**Primary oref:** `{{OREF_CROWN}}` · **Alt:** `{{OREF_TOUCAN}}`

```text
Emotional but safe illustration in detailed atmospheric watercolor. Hai Ikthiss the tall Ceiba with a soft cool hollow-glow near his upper trunk — subtle, internal, not scary, not a wound. Keel-billed toucan perched mid-canopy with bright eye and open bill in grand praise-call — never gothic or omen-dark. Animals below cheering. Layered jungle depth; warm light on outer leaves, cooler quiet light at the hollow. Fine natural texture; clear text area in bottom 40%. Innocent children’s book tone. Lonely grandeur without darkness. No cartoon outlines. No buildings. No text, no letters --sref {{SREF_STYLE}} --sw 150 --oref {{OREF_CROWN}} --ow 150 --ar 11:17 --v 7 --style raw --s 150
```

**Alt (toucan lock):**

```text
Emotional but safe illustration in detailed atmospheric watercolor. Hai Ikthiss the tall Ceiba with gentle face high in bark and a soft cool hollow-glow near his upper trunk — subtle, internal, not scary, not a wound. Keel-billed toucan perched mid-canopy with bright eye and open bill in grand praise-call — never gothic or omen-dark. Animals below cheering. Layered jungle depth; warm light on outer leaves, cooler quiet light at the hollow. Fine natural texture; clear text area in bottom 40%. No cartoon outlines. No buildings. No text, no letters --sref {{SREF_STYLE}} --sw 150 --oref {{OREF_TOUCAN}} --ow 150 --ar 11:17 --v 7 --style raw --s 150
```

**Record** · Local: `images/hai/page-5-mj-________.jpg` · Done: [ ]

---

### Page 6 — Hook to the ground

**oref:** `{{OREF_CROWN}}`

```text
Quiet turning-point scene in detailed atmospheric watercolor. Hai Ikthiss the tall living Ceiba still and kind, one long root or low branch gently reaching toward the clear spring and soft leaf litter — a visual hook of connection; fine water and buttress-root texture near, soft misted jungle background. Animals still praising softly in the distance, unnoticed. Warm understanding mood, quiet grandeur. Text space about 40% height at bottom. No anger, only longing to join. Portrait page. Child-safe, no harsh darkness. No buildings. No text, no letters --sref {{SREF_STYLE}} --sw 150 --oref {{OREF_CROWN}} --ow 150 --ar 11:17 --v 7 --style raw --s 150
```

**Record** · Local: `images/hai/page-6-mj-________.jpg` · Done: [ ]

---

### Page 7 — Night; hollow softens

**oref:** `{{OREF_CROWN}}`

```text
Beautiful quiet night scene in detailed atmospheric watercolor. Hai Ikthiss the tall Ceiba under a deep starry sky over the highland valley, canopy holding soft silver starlight; cool blues, mist grey, and silver leaf-light with fine natural texture. Peaceful accepting expression in the bark-face. The internal hollow now warmer, watered, almost glowing — gentle, not eerie. Deep calm, contemplative, healing mood; quiet grandeur. Portrait layout, generous text space about 40% height at bottom. No scary darkness — gentle night wonder. No buildings. No text, no letters --sref {{SREF_STYLE}} --sw 150 --oref {{OREF_CROWN}} --ow 150 --ar 11:17 --v 7 --style raw --s 150
```

**Record** · Local: `images/hai/page-7-mj-________.jpg` · Done: [ ]

---

### Page 8 — Morning resolve

**oref:** `{{OREF_CROWN}}` · cast BG: howler + tapir

```text
Bright fresh morning in detailed atmospheric watercolor. Hai Ikthiss the tall Ceiba with soft gold light in his face, looking down the trunk toward the ground with gentle resolve. Same howler monkey and Baird’s tapir soft in misted background still cheering without looking up into his eyes. Spring bright and clear at buttress roots with fine near detail; canopy slopes beyond. Soft warm light, hopeful free feeling of quiet self-understanding. Quiet grandeur. Text space about 40% height at bottom. Portrait page. No buildings. No text, no letters --sref {{SREF_STYLE}} --sw 150 --oref {{OREF_CROWN}} --ow 150 --ar 11:17 --v 7 --style raw --s 150
```

**Record** · Local: `images/hai/page-8-mj-________.jpg` · Done: [ ]

---

### Page 9 — Ch.1 close; water and light down

**oref:** `{{OREF_CROWN}}` · text band ~50%

```text
Warm closing scene for a chapter in detailed atmospheric watercolor. Hai Ikthiss the tall living Ceiba happily sending visible soft streams of clear water and gentle light down to tiny ferns and small animals at the roots — fine leaf and water texture near, soft golden afternoon depth over the highland valley beyond. Peaceful satisfied tree-smile of simple contentment. Surrounded by gentle canopy with atmospheric perspective. Soft vignette edges optional. Innocently joyful quiet grandeur. Generous space for text about 50% height at bottom. No blood, only clear water and light. No buildings. No text, no letters --sref {{SREF_STYLE}} --sw 150 --oref {{OREF_CROWN}} --ow 150 --ar 11:17 --v 7 --style raw --s 150
```

**Record** · Local: `images/hai/page-9-mj-________.jpg` · Done: [ ]

---

### Page 10 — Ch.2 opener (Mending)

**oref:** `{{OREF_KAI}}` · quiet tree described in text

```text
Simple chapter-opening illustration, no lettering. Soft cream background with warm atmospheric watercolor wash. At centre: a small living walking Ceiba seed-pod creature — oblong warm hull, tiny root-feet, a soft kapok-silk wisp or sprout-tuft, gentle simple patient face — standing at the foot of a great tall Ceiba whose trunk rises into soft misted canopy, high face gone quiet, no face in the upper wood. Fine natural texture on pod-hull and bark; soft green, cream, and bark grey-green; hint of fern and moss. Minimal soft foliage frame. Calm transitional, caring mood. Portrait children’s book page, clear lower area for text overlay. No buildings. No text, no letters, no numbers, no titles --sref {{SREF_STYLE}} --sw 150 --oref {{OREF_KAI}} --ow 150 --ar 11:17 --v 7 --style raw --s 150
```

**Record** · Local: `images/hai/page-10-mj-________.jpg` · Done: [ ]

---

### Page 11 — Kai among melons

**oref:** `{{OREF_KAI}}`

```text
Cheerful sunny morning in a jungle forest-floor garden at the roots of the tall Ceiba. Detailed atmospheric watercolor; living-jungle palette of bark grey-green, leaf green, spring turquoise-silver, warm cream, muted sky. The tall Ceiba dominates the upper portion — same landmark, canopy full but the high face gone quiet, soft mist in upper leaves. Below, Kai: a small living walking Ceiba seed-pod creature, oblong warm hull, soft kapok wisp or sprout-tuft, friendly simple face, tiny root-feet, standing among healthy low cantaloupe rockmelon vines — fern edges, root beds, leaf litter, fine near detail on vines and pod-hull. Warm early light through layered leaves. Feeling of gentle wonder at a great one made small as a seed. Quiet grandeur kept intimate. Generous clear text space about 40% height at bottom. Portrait page. No cartoon outlines. No buildings. No text, no letters --sref {{SREF_STYLE}} --sw 150 --oref {{OREF_KAI}} --ow 150 --ar 11:17 --v 7 --style raw --s 150
```

**Record** · Local: `images/hai/page-11-mj-________.jpg` · Done: [ ]

---

### Page 12 — Melon splits

**Primary oref:** `{{OREF_PIP}}` · **Alt:** `{{OREF_KAI}}`

```text
Soft dynamic moment in detailed atmospheric watercolor. Small young nine-banded armadillo Pip looking horrified mid-step. A big cantaloupe rockmelon smashed open at the feet of Kai, juice and seeds everywhere — fine wet texture, not messy-scary. Kai is a small living walking Ceiba seed-pod creature, oblong warm hull, sprout-tuft, kind steady face, tiny root-feet. Jungle forest-floor garden carefully detailed with root beds, ferns, and leaf litter. Mild disaster kept gentle and safe. Warm earthy light, clear text space about 40% height at bottom. Portrait page. Child-safe. No buildings. No text, no letters --sref {{SREF_STYLE}} --sw 150 --oref {{OREF_PIP}} --ow 150 --ar 11:17 --v 7 --style raw --s 150
```

**Alt (Kai lock):**

```text
Soft dynamic moment in detailed atmospheric watercolor. Small young nine-banded armadillo Pip looking horrified mid-step. A big cantaloupe rockmelon smashed open at the feet of Kai, juice and seeds everywhere — fine wet texture, not messy-scary. Kai is a small living walking Ceiba seed-pod creature, oblong warm hull, sprout-tuft, kind steady face, tiny root-feet. Jungle forest-floor garden carefully detailed with root beds, ferns, and leaf litter. Mild disaster kept gentle and safe. Warm earthy light, clear text space about 40% height at bottom. Portrait page. Child-safe. No buildings. No text, no letters --sref {{SREF_STYLE}} --sw 150 --oref {{OREF_KAI}} --ow 150 --ar 11:17 --v 7 --style raw --s 150
```

**Record** · Local: `images/hai/page-12-mj-________.jpg` · Done: [ ]

---

### Page 13 — Shame and crowd

**Primary oref:** `{{OREF_KAI}}` · **Alt:** `{{OREF_PIP}}`

```text
Emotional group scene in detailed atmospheric watercolor. Pip the nine-banded armadillo curled a little in fear and shame. Kai, small living walking Ceiba-pod form, standing still with a kind concerned face. A few background animals looking judgmental or noisy — a coati with ringed tail and an agouti — softened by shallow depth of field and jungle mist. Soft lighting focused on Kai and Pip; fine natural texture. Warm but tense moment of decision. Innocent tone, quiet care. Text space about 40% height at bottom. Portrait page. No harsh darkness. No buildings. No text, no letters --sref {{SREF_STYLE}} --sw 150 --oref {{OREF_KAI}} --ow 150 --ar 11:17 --v 7 --style raw --s 150
```

**Alt (Pip lock):**

```text
Emotional group scene in detailed atmospheric watercolor. Pip the nine-banded armadillo curled a little in fear and shame. Kai, small living walking Ceiba-pod form, standing still with a kind concerned face. A few background animals looking judgmental or noisy — a coati with ringed tail and an agouti — softened by shallow depth of field and jungle mist. Soft lighting focused on Kai and Pip; fine natural texture. Warm but tense moment of decision. Innocent tone, quiet care. Text space about 40% height at bottom. Portrait page. No harsh darkness. No buildings. No text, no letters --sref {{SREF_STYLE}} --sw 150 --oref {{OREF_PIP}} --ow 150 --ar 11:17 --v 7 --style raw --s 150
```

**Record** · Local: `images/hai/page-13-mj-________.jpg` · Done: [ ]

---

### Page 14 — Digging stick offered

**oref:** `{{OREF_KAI}}`

```text
Key emotional turning-point in detailed atmospheric watercolor. Kai, Hai Ikthiss as small living walking Ceiba pod, kneeling, offering a digging stick toward Pip the nine-banded armadillo with open kind body language. Pip slowly uncurling, hope appearing in his eyes. Broken melon still visible but no longer the centre. Soft hopeful gold light through leaves; fine leaf litter and wood texture near. Beautiful gentle connection and understanding. The tall Ceiba watches softly in misted background, face gone quiet. Portrait page with generous text space about 40% height at bottom. Quiet grandeur kept intimate. No cartoon outlines. No buildings. No text, no letters --sref {{SREF_STYLE}} --sw 150 --oref {{OREF_KAI}} --ow 150 --ar 11:17 --v 7 --style raw --s 150
```

**Record** · Local: `images/hai/page-14-mj-________.jpg` · Done: [ ]

---

### Page 15 — Work together

**oref:** `{{OREF_KAI}}`

```text
Warm working-together scene in detailed atmospheric watercolor. Kai the living walking Ceiba pod and Pip the nine-banded armadillo side-by-side planting seeds, watering with a leaf, building a tiny twig fence. Both with soft smiles. Soft afternoon light, rich leaf litter and leaf textures, first green shoots with fine near detail; soft jungle depth beyond. Friendship and quiet repair mood. Clear text space about 40% height at bottom. Portrait page. Child-safe, kind, innocent. No buildings. No text, no letters --sref {{SREF_STYLE}} --sw 150 --oref {{OREF_KAI}} --ow 150 --ar 11:17 --v 7 --style raw --s 150
```

**Record** · Local: `images/hai/page-15-mj-________.jpg` · Done: [ ]

---

### Page 16 — Pip waters; days pass

**Primary oref:** `{{OREF_PIP}}` · **Alt:** `{{OREF_KAI}}` · text ~45%

```text
Gentle time-passing scene in detailed atmospheric watercolor. Pip the nine-banded armadillo happily watering thriving new melon vines with a leaf bucket. Kai the living walking Ceiba pod nearby, watching with quiet pride and warmth. Soft sense of days having passed. Peaceful daily life and growing trust. Warm greens and moss tones with fine plant texture; jungle forest-floor garden beds; tall quiet Ceiba soft above in atmospheric haze. Larger text space about 45% height at bottom. Portrait page. Quiet, hopeful, innocent. No buildings. No text, no letters --sref {{SREF_STYLE}} --sw 150 --oref {{OREF_PIP}} --ow 150 --ar 11:17 --v 7 --style raw --s 150
```

**Alt (Kai lock):**

```text
Gentle time-passing scene in detailed atmospheric watercolor. Pip the nine-banded armadillo happily watering thriving new melon vines with a leaf bucket. Kai the living walking Ceiba pod nearby, watching with quiet pride and warmth. Soft sense of days having passed. Peaceful daily life and growing trust. Warm greens and moss tones with fine plant texture; jungle forest-floor garden beds; tall quiet Ceiba soft above in atmospheric haze. Larger text space about 45% height at bottom. Portrait page. Quiet, hopeful, innocent. No buildings. No text, no letters --sref {{SREF_STYLE}} --sw 150 --oref {{OREF_KAI}} --ow 150 --ar 11:17 --v 7 --style raw --s 150
```

**Record** · Local: `images/hai/page-16-mj-________.jpg` · Done: [ ]

---

### Page 17 — Ch.2 close; three friends

**oref:** `{{OREF_KAI}}` · text ~50%

```text
Beautiful closing illustration in detailed atmospheric watercolor. Kai, humble living walking Ceiba pod, and Pip the nine-banded armadillo sitting together beside thriving melon plants in the jungle forest-floor garden. A third small jungle creature who had a recent small accident is now happily included. Soft golden-hour light over the highland valley with layered mist and atmospheric depth toward soft ridges. Sense of community, quiet strength, and healed belonging. The tall Ceiba above is peaceful, face gone quiet. Warm, hopeful, innocent mood; quiet grandeur. Soft vignette optional. Space for final text block about 50% height at bottom. Portrait page. No buildings. No text, no letters --sref {{SREF_STYLE}} --sw 150 --oref {{OREF_KAI}} --ow 150 --ar 11:17 --v 7 --style raw --s 150
```

**Record** · Local: `images/hai/page-17-mj-________.jpg` · Done: [ ]

---

### Page 18 — Ch.3 opener (Seeing)

**oref:** `{{OREF_WALK}}`

```text
Chapter opening illustration, no lettering. Soft cream ground with atmospheric watercolor depth. Centre: a living walking tall Ceiba, gentle kind form never scary, offering both hands downward — not to push, but to lift. Small jungle creatures at the base looking unsure, half praise and half fear. Soft leaves, buttress roots, fine bark and leaf texture; quiet jungle mist. Quiet, thoughtful, discovering mood. Wonder without fright. Portrait children’s book page, clear lower area for text overlay. No harsh darkness, no scary faces, no buildings. No text, no letters, no numbers, no titles --sref {{SREF_STYLE}} --sw 150 --oref {{OREF_WALK}} --ow 150 --ar 11:17 --v 7 --style raw --s 150
```

**Record** · Local: `images/hai/page-18-mj-________.jpg` · Done: [ ]

---

### Page 19 — Home in crown; whispers

**oref:** `{{OREF_CROWN}}`

```text
Evening by the tall Ceiba in detailed atmospheric watercolor. Golden-hour light on Hai Ikthiss returned to the crown — kind face high in the living Ceiba again; warm gold on high canopy, cooler shadow and soft mist at the roots. Living-jungle palette glowing with evening gold over a highland valley. At the roots, small animals cluster and whisper, looking up with worried eyes instead of cheers — fine near detail, atmospheric height. Tender, slightly sad misunderstanding. Quiet grandeur. Generous clear text space about 40% height at bottom. Portrait page. Child-safe, no scary faces. No buildings. No text, no letters --sref {{SREF_STYLE}} --sw 150 --oref {{OREF_CROWN}} --ow 150 --ar 11:17 --v 7 --style raw --s 150
```

**Record** · Local: `images/hai/page-19-mj-________.jpg` · Done: [ ]

---

### Page 20 — Macaw caution

**Primary oref:** `{{OREF_MACAW}}` · **Alt:** `{{OREF_CROWN}}`

```text
Scene under the tall Ceiba in detailed atmospheric watercolor. Handsome scarlet macaw with spectacular long tail and rich red-yellow-blue plumage perched mid-height, chest out, speaking grandly of caution — fine feather texture. Small animals nodding. Hai Ikthiss high above as rooted living Ceiba, kind and still, not angry, half-softened by canopy depth and mist. Soft layered light. Gentle visual storytelling of fear-as-status. Quiet grandeur. Clear text space about 40% height at bottom. Portrait page. No cartoon outlines. No buildings. No text, no letters --sref {{SREF_STYLE}} --sw 150 --oref {{OREF_MACAW}} --ow 150 --ar 11:17 --v 7 --style raw --s 150
```

**Alt (crown lock):**

```text
Scene under the tall Ceiba in detailed atmospheric watercolor. Handsome scarlet macaw with spectacular long tail and rich red-yellow-blue plumage perched mid-height, chest out, speaking grandly of caution — fine feather texture. Small animals nodding. Hai Ikthiss high above as rooted living Ceiba with gentle face, kind and still, not angry, half-softened by canopy depth and mist. Soft layered light. Quiet grandeur. Clear text space about 40% height at bottom. Portrait page. No cartoon outlines. No buildings. No text, no letters --sref {{SREF_STYLE}} --sw 150 --oref {{OREF_CROWN}} --ow 150 --ar 11:17 --v 7 --style raw --s 150
```

**Record** · Local: `images/hai/page-20-mj-________.jpg` · Done: [ ]

---

### Page 21 — Owl’s slow truth

**oref:** `{{OREF_OWL}}`

```text
Quiet contrast scene in detailed atmospheric watercolor. Humble old spectacled owl with plain soft feathers, pale facial discs, and round wise face speaking softly toward the great Ceiba — fine feather and bark texture. Hai Ikthiss listening carefully with open attention in his high rooted-crown face. A couple of animals already turning away toward the flashy scarlet macaw in soft misted background. Gentle, dignified, slightly tender mood. Earthy jungle palette with cool understory light. Text space about 40% height at bottom. Portrait page. Quiet grandeur. No buildings. No text, no letters --sref {{SREF_STYLE}} --sw 150 --oref {{OREF_OWL}} --ow 150 --ar 11:17 --v 7 --style raw --s 150
```

**Record** · Local: `images/hai/page-21-mj-________.jpg` · Done: [ ]

---

### Page 22 — Steps out; becomes walking tree

**oref:** `{{OREF_WALK}}`

```text
Wonder scene in detailed atmospheric watercolor. Hai Ikthiss transforming gently from rooted Ceiba into a living walking tall Ceiba: long kind limb-branches, bark skin with fine natural grain, leaf-and-soft-kapok crown, buttress-root feet, warm eyes at a height animals can finally face — never scary. Fully mobile walking tree form, not half-stuck in ground. Soft non-scary wonder; jungle creatures gasping but safe. Layered canopy light and mist; quiet grandeur. Soft learning-and-discovery feeling. Text space about 40% height at bottom. Portrait page. No harsh darkness, no scary faces, no buildings, no Ent-monster look. No text, no letters --sref {{SREF_STYLE}} --sw 150 --oref {{OREF_WALK}} --ow 150 --ar 11:17 --v 7 --style raw --s 150
```

**Record** · Local: `images/hai/page-22-mj-________.jpg` · Done: [ ]

---

### Page 23 — Bridge bend; Pip comes

**Primary oref:** `{{OREF_WALK}}` · **Alt:** `{{OREF_PIP}}`

```text
Lovely generous scene in detailed atmospheric watercolor. Hai Ikthiss as gentle walking Ceiba bending like a bridge, one great kind hand open low for Pip the nine-banded armadillo. Pip unafraid, stepping forward. Other animals half-hid among buttress roots and mist, watching. Soft gold light beams through leaves, gentle god-rays. Fine bark and leaf texture; warm spirit of invitation and true seeing. Quiet grandeur. Text space about 40% height at bottom. Portrait page. Child-safe, kind wonder. No buildings. No text, no letters --sref {{SREF_STYLE}} --sw 150 --oref {{OREF_WALK}} --ow 150 --ar 11:17 --v 7 --style raw --s 150
```

**Alt (Pip lock):**

```text
Lovely generous scene in detailed atmospheric watercolor. Hai Ikthiss as gentle walking tall Ceiba bending like a bridge, one great kind wooden hand open low for Pip the nine-banded armadillo. Pip unafraid, stepping forward. Other animals half-hid among buttress roots and mist, watching. Soft gold light beams through leaves, gentle god-rays. Fine bark and leaf texture; warm spirit of invitation and true seeing. Quiet grandeur. Text space about 40% height at bottom. Portrait page. Child-safe, kind wonder. No buildings. No text, no letters --sref {{SREF_STYLE}} --sw 150 --oref {{OREF_PIP}} --ow 150 --ar 11:17 --v 7 --style raw --s 150
```

**Record** · Local: `images/hai/page-23-mj-________.jpg` · Done: [ ]

---

### Page 24 — Shared height lift

**oref:** `{{OREF_WALK}}` · hard page — multi-cast plate oref if needed

```text
Hopeful wondrous group scene in detailed atmospheric watercolor. Hai Ikthiss as kind walking tall Ceiba lifting friends: Pip the nine-banded armadillo, old spectacled owl, and other valley creatures rising beside him, gently becoming tall giants with joyful not scary faces — same animals, shared height, eyes level with far ridges. Soft bright morning light, layered highland valley opening toward soft far ridges in atmospheric perspective. Feeling of growing clear sight and togetherness. Quiet grandeur. Text space about 40% height at bottom. No domination; shared wonder. Portrait page. Child-safe. No buildings. No text, no letters --sref {{SREF_STYLE}} --sw 150 --oref {{OREF_WALK}} --ow 150 --ar 11:17 --v 7 --style raw --s 150
```

**Record** · Local: `images/hai/page-24-mj-________.jpg` · Done: [ ]

---

### Page 25 — Ridge far sight

**oref:** `{{OREF_WALK}}` · text ~50%

```text
Beautiful final story page in detailed atmospheric watercolor. Hai Ikthiss as kind walking tall Ceiba and his giant animal friends standing together on a high ridge of gentle air beside the tall rooted Ceiba landmark at golden hour, looking out over the whole peaceful highland valley — jungle pool, melon garden at the roots, canopy slopes, soft far ridges in layered mist and atmospheric depth. Sense of open sky, freedom, and quiet understanding. Warm glowing height-gold, deep calm and innocent joy. Quiet grandeur; masterpiece feel for children’s book ending. Generous text space about 50% height at bottom. Portrait page. No harsh darkness. No buildings. No text, no letters --sref {{SREF_STYLE}} --sw 150 --oref {{OREF_WALK}} --ow 150 --ar 11:17 --v 7 --style raw --s 150
```

**Record** · Local: `images/hai/page-25-mj-________.jpg` · Done: [ ]

---

### Page 26 — Closing / endpaper

**oref:** `{{OREF_WALK}}` · text ~40% center wrap

```text
Final endpaper-style illustration in detailed atmospheric watercolor. Wide landscape of the gentle highland valley at peaceful dusk — strongest quiet grandeur: layered planes of canopy and Ceiba, spring and pool silver, soft far ridges dissolving into cool vapor-mist. Hai Ikthiss visible as a kind walking tall Ceiba among other gentle giant friends on a soft rise — Pip armadillo, spectacled owl, scarlet macaw and other valley creatures now as tall as he is, same height, walking among them as if he were no different — small in the vast landscape yet glowing with quiet presence and living leaves. Soft stars beginning to appear. Twilight palette of lavender, soft gold, deep moss green, Ceiba bark grey-green, and water turquoise-silver. Vast calm feeling of shared height in a big kind world. Large open text area in the center about 40% height with the landscape wrapped around it — keep center band simple for overlay, no lettering in the image. Heart-warmingly complete. No cartoon outlines, no harsh darkness, no buildings. No text, no letters --sref {{SREF_STYLE}} --sw 150 --oref {{OREF_WALK}} --ow 150 --ar 11:17 --v 7 --style raw --s 150
```

**Record** · Local: `images/hai/page-26-mj-________.jpg` · Done: [ ]

---

## Phase D — Export and site handoff (checklist)

When art is chosen:

1. [ ] Upscale finals in Midjourney
2. [ ] Resize/crop to **1650×2550** JPEG as needed
3. [ ] Save under `images/hai/` and `images/hai/reference/` with `mj-{uuid}` names
4. [ ] Update in **one** commit later:
   - `tall-tales.html` `src=` + alts
   - `site.js` offline `FILES`
   - `book-text.html` `PAGE_BG`
5. [ ] Spot-check print single-lang + multi-lang with backgrounds
6. [ ] Archive or leave prior Grok Imagine files; do not mix styles in the live book without intent

---

## Quick reference — which oref on which page

| Asset | Primary oref | Notes |
|-------|----------------|-------|
| Cover | CROWN | |
| Dedication | — | sref only |
| p1–p2, p5–p9, p19 | CROWN | |
| p3 | CROWN or HOWLER | alt paste included |
| p4 | CROWN or TAPIR | alt paste included |
| p8 | CROWN | howler+tapir BG |
| p10–p11, p14–p15, p17 | KAI | quiet tree described |
| p12, p16 | PIP or KAI | alt paste included |
| p13 | KAI or PIP | coati/agouti optional |
| p18, p22–p26 | WALK | |
| p20 | MACAW or CROWN | alt paste included |
| p21 | OWL | macaw BG |
| p23 | WALK or PIP | alt paste included |
| p24–p26 | WALK | multi-cast plate if needed |

---

## Session log (optional freeform)

Date:
Defaults used (`--s` / `--sw` / `--ow` / raw?):
What drifted:
What fixed it:

```text
{{SREF_STYLE}} =
{{OREF_CROWN}} =
{{OREF_QUIET}} =
{{OREF_KAI}} =
{{OREF_WALK}} =
{{OREF_PIP}} =
{{OREF_MACAW}} =
{{OREF_OWL}} =
{{OREF_HOWLER}} =
{{OREF_TAPIR}} =
{{OREF_TOUCAN}} =
{{OREF_COATI}} =
{{OREF_AGOUTI}} =
```

---

*End of runbook. Canon story and longer prompts live in `HaiIkthiss-ThreeTallTales.md`.*
