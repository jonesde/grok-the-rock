# Hai Ikthiss — Midjourney Runbook v2

Manual production script for **full Midjourney redo** of *Three Tall Tales* art.
Source canon: `HaiIkthiss-ThreeTallTales.md` (art style + character descriptions = source of truth).
Interface: **midjourney.com** web Imagine bar (no Discord API).
**V7** + **Style Reference** + **Omni Reference** (pin in UI).

Title lettering is **never** in the image — web/print overlays handle chapter titles and body text.

**Paste rule:** Each fenced `text` block is one full Imagine paste (prompt + params).
Before paste: replace `{{SREF_*}}` / `{{OREF_*}}` with real image URLs, **or** pin the same images in the web UI and keep the `--sw` / `--ow` values from the paste. Web often requires **manual pin** for Omni; Style can be URL or pin.

> **What changed from v1** (fixes baked in here):
> 1. SREF_CHAR is now a **real minimal subject** (fern frond), not an abstract wash.
> 2. **Reversed Phase B chain** — full-tree CROWN locks first (no oref, geometry only); face plate is standalone and is **never** pinned as a face-oref onto a full-tree gen. Face is described in prose in scenes.
> 3. **`--seed` discipline** — one seed from first good CROWN lock, reused on QUIET / WALK / KAI.
> 4. **`--no` trimmed to ≤12 tokens** per paste; prose bans deduplicated to one strong phrase.
> 5. **`--ow` defaults fixed** — 100 for full-tree oref (not 50), 80 if inflation.
> 6. **Recovery workflow section** added (reroll / Vary Subtle / Vary Region).
> 7. **Phase D** — MJ can't output 1650×2550 exactly; upscale + external crop/resize.

---

## Progress checklist

### Setup
- [ ] Phase A0 — **character medium** sref (fern frond) approved → `{{SREF_CHAR}}`
- [ ] Phase A1 — **scene** sref approved (existing approved image OK) → `{{SREF_STYLE}}`
- [ ] Phase B — full-tree lock → QUIET → WALK → KAI → cast locks → all `{{OREF_*}}` + master `--seed`
- [ ] One smoke-test LOCK + one smoke-test SCENE look right

### Pages
- [ ] Cover · Dedication
- [ ] p1–p9 · p10–p17 · p18–p26

### Handoff (later)
- [ ] Upscale max + external crop to 1650×2550 under `images/hai/` · triple-book paths in HTML/JS

---

## 0. How to use (web)

### 0.1 Two style refs (do not collapse these)

| Ref | What it is | Use on |
|-----|------------|--------|
| **`{{SREF_CHAR}}`** | Medium + palette as a **real single-subject watercolor** (fern frond on cream). Built in Phase A0. | **Every Phase B lock** |
| **`{{SREF_STYLE}}`** | Full scenic book look — valley, mist, depth, light. One of your existing approved scenic images is fine. | **Every Phase C page** (+ cover) |

**Why two:** A scenic sref teaches "draw a jungle behind everything." A medium sref with a real subject teaches "paint a subject in this style" while the prompt keeps a white void and a single character.
**Do not** pin `{{SREF_STYLE}}` on lock sheets.
**Do not** pin `{{OREF_*}}` as a style ref.

### 0.2 Two job types

| Job | Background | Style pin | Omni pin | Suffix shape |
|-----|------------|-----------|----------|--------------|
| **LOCK** (Phase B) | Pure white void | **`{{SREF_CHAR}}`** `--sw 100` | Tree oref only when chaining (see each step) | see each paste |
| **SCENE** (Phase C) | Full highland jungle | **`{{SREF_STYLE}}`** `--sw 120` | Primary character oref | see each paste |

### 0.3 Hard lessons (baked into pastes)

| Failure | Fix in this runbook |
|--------|---------------------|
| Fat short mascot tree | Ceiba geometry + establishing shot + `--no baobab, oak, squat…` |
| Huge face from face-oref | **Reversed chain** — full-tree locks use no face oref; face is in prose only |
| Scenic junk on character locks | Locks use **`{{SREF_CHAR}}` only** (not scenic sref) + white void + `--no background…` |
| Medium missing on locks | Every lock paste includes `--sref {{SREF_CHAR}} --sw 100` |
| oref ID won't paste on web | Pin Omni in UI; paste still has `--ow` |
| Only one oref allowed in practice | Primary character as oref; others described in text |
| Spring/ground sneaks onto locks | Lock prompts have **no** spring, grass, ground plane, mist bands |
| Scene loses book look | Pages use `{{SREF_STYLE}}` |
| Scene loses character | Pages use body oref + `--ow 100`; drop to 80 if inflation |
| Lettering in art | Every paste ends bans on text/letters/titles |
| Ent/monster creep | Child-safe + `--no scary Ent` on walk/crown |
| Geometry drift between forms | Same `--seed` reused on CROWN / QUIET / WALK / KAI locks |

### 0.4 Defaults

| Control | LOCK | SCENE |
|--------|------|-------|
| `--v` | `7` | `7` |
| `--ar` | `11:17` | `11:17` |
| `--style` | `raw` | `raw` |
| `--s` | `50`–`80` | `100`–`120` |
| `--sw` | **`100`** with `{{SREF_CHAR}}` | **`120`** with `{{SREF_STYLE}}` |
| `--ow` | tree oref **`100`** (80 if inflation); face plate **n/a** (standalone) | **`100`**; drop to 80 if tree/face inflates |
| `--seed` | reuse master seed from first good CROWN | (optional) reuse for page consistency |

**If lock still picks up scenery:** lower `--sw` to `60`–`80` (keep `{{SREF_CHAR}}` — do not switch to scenic sref).
**If lock loses watercolor look:** raise `--sw` to `120`–`150` on `{{SREF_CHAR}}` only.
**If full tree still fat:** reroll with `--ow 80`, or reroll with no oref (geometry only).

### 0.5 Placeholders (fill as you go)

```text
{{SREF_CHAR}} =
{{SREF_STYLE}} =
{{MASTER_SEED}} =
{{OREF_TREE}} =
{{OREF_WALK}} =
{{OREF_KAI}} =
{{OREF_FACE}} =
{{OREF_PIP}} =
{{OREF_MACAW}} =
{{OREF_OWL}} =
{{OREF_HOWLER}} =
{{OREF_TAPIR}} =
{{OREF_TOUCAN}} =
{{OREF_COATI}} =
{{OREF_AGOUTI}} =
```

Note: `{{OREF_TREE}}` doubles as the QUIET lock (faceless rooted ceiba).

### 0.6 Per-job ritual

1. LOCK or SCENE?
2. Pin correct **sref** + **oref** (if any).
3. Paste block (placeholders already filled, or UI pins match).
4. Generate → 4 samples → pick best → upscale.
5. Record URL + seed (for locks) + acceptance.

### 0.7 Acceptance

**LOCK:** white/near-white void · single subject · tall slender tree · watercolor matches book medium · no jungle/mist/ground/spring · no face (CROWN/QUIET) or face only on the face plate
**SCENE:** correct Hai form · text band clear · child-safe · no lettering · no temples/blood · character matches oref

### 0.8 Naming

```text
images/hai/reference/{hai-tree|hai-walk|hai-face|hai-seed|pip|…}-mj-{uuid}.jpg
images/hai/{cover|dedication|page-N}-mj-{uuid}.jpg
```

Upscale to MJ max, then external crop/resize to **1650×2550** for print.

---

## Phase A — Style refs

### A0. `{{SREF_CHAR}}` — medium ref with a real subject (FOR ALL CHARACTER LOCKS)

**Critical:** A subject-less abstract wash transfers poorly as a style ref. Use a **real minimal subject** (fern frond) in the book's medium on cream paper. This teaches "paint a subject in this style" without imposing tree or animal geometry onto later locks.

**UI:** nothing pinned.

```text
A single small tropical fern frond on pure flat cream-white paper, isolated subject, empty background. Soft natural watercolor washes, fine paper grain, loose wet edges, gentle pigment blooms. Living-jungle palette: soft umber, deep leaf green, turquoise-silver tint, cool vapor grey, warm gold, cream. Quiet soft light, children's book illustration medium. No other objects, no scene, no horizon --ar 1:1 --v 7 --style raw --s 100 --no landscape, tree, animal, face, scene, border, text, letters
```

Run 2–4 grids if needed. Pick the one that looks most like the book's *paint*.

**Optional second swatch** (multi-sref both as `{{SREF_CHAR}}`):

```text
Close-up watercolor paper texture, cream-white ground, soft transparent washes in grey-green, leaf green, soft gold, cool grey, turquoise tint, fine granulation, with one small simple leaf as subject, children's book illustration medium --ar 1:1 --v 7 --style raw --s 80 --no landscape, tree, animal, scene, text
```

**Record**
- Job / URL / sref code:
- **`{{SREF_CHAR}}` =**
- Done: [ ]

**Smoke test** (should be white + watercolor tree, not a valley):

```text
Single simple tall slender tree silhouette on pure flat white background, isolated subject, empty white void. Detailed watercolor. No scenery --sref {{SREF_CHAR}} --sw 100 --ar 11:17 --v 7 --style raw --s 50 --no background, scenery, jungle, mist, ground, text
```

If smoke test shows jungle/mist: regenerate A0, or lower `--sw` to 70 on locks.

---

### A1. `{{SREF_STYLE}}` — scenic book look (FOR STORY PAGES)

**You may skip generation** if you already have an approved scenic image — use its URL as `{{SREF_STYLE}}`. Otherwise run one or both of:

```text
Detailed atmospheric watercolor children's book illustration, fine natural texture. Highland Honduran valley: emergent Ceiba kapok above layered canopy, buttress roots, ferns, philodendron, bromeliads, clear natural spring pool, soft tropical vapor-mist in hollows, warm gold god-rays on high canopy, cool mist below, soft far green ridges. Living-jungle palette grey-green bark, deep leaf green, turquoise-silver water, cream sky. Quiet grandeur, kind innocent mood. Empty of people. Portrait, generous clear lower area. No cartoon outlines, no temples --ar 11:17 --v 7 --style raw --s 200
```

```text
Detailed atmospheric watercolor, fine natural texture. Close jungle forest-floor garden: leaf litter, fern edges, root beds, cantaloupe rockmelon vines, filtered gold light through canopy, soft mist depth, clear tiny spring trickle. Living-jungle greens and bark greys, warm cream light. Children's book illustration, empty of characters. Clear lower third. No cartoon outlines, no buildings --ar 11:17 --v 7 --style raw --s 200
```

**Record** · Job: · Notes:

### A2. Lock scene sref

- [ ] Pick 1–3 scenic winners (mix OK as multi-sref)
- [ ] **`{{SREF_STYLE}}` =** _______________
- [ ] Pin **only** on Phase C / cover / dedication

---

## Phase B — Character locks

**Always pin / include `{{SREF_CHAR}}`.**
**Never pin `{{SREF_STYLE}}`.**
**Pin oref only when the step says.**

### ⚠️ Reversed chain (the key fix from v1)

Build the **full-tree lock first, with no oref** (geometry only). Use that locked tree as the oref for QUIET / WALK / scenes. The **face plate is standalone** — never pinned as a face-oref onto a full-tree gen (that produces huge faces). In scenes, the face is described in prose ("kind tiny bark face high in trunk, no larger than a wood knot").

Order: **B1 full tree → B2 QUIET (reuse seed) → B3 WALK (oref tree, reuse seed) → B4 KAI → B5 face plate (standalone) → B6+ cast animals**.

---

### B1. `{{OREF_TREE}}` — full tall thin rooted Ceiba (master lock, no oref, geometry only)

**UI:** pin `{{SREF_CHAR}}` only · **no oref** · record seed
This lock doubles as QUIET (faceless rooted tree).

```text
Character reference sheet, single tall slender Ceiba pentandra kapok tree centered on pure flat pure white background, isolated subject, empty white void, no scenery. Very tall slender straight bole, long narrow columnar trunk, height many times greater than width, high umbrella canopy only at the top of a long clean shaft, small buttress fins only at the base, graceful vertical emergent rainforest silhouette, botanical proportions, wide establishing shot, generous empty white space around it. Pale grey-green bark, soft moss. Detailed atmospheric watercolor, fine natural texture, children's book character design. No face, no ground, no grass, no spring, no water, no mist, no sky, no jungle --sref {{SREF_CHAR}} --sw 100 --ar 11:17 --v 7 --style raw --s 50 --no face, background, scenery, jungle, ground, water, sky, baobab, oak, fat trunk, barrel, text, letters
```

**Pick the tallest, thinnest, most ceiba-like of the 4.** Record URL **and seed** — the seed gets reused on WALK / KAI locks for shared geometry.

**If all 4 are fat/squat:** reroll once. Still fat → `--sw 70` and reroll. Still fat → add to `--no`: `dumpy, short, wide`.

**Record** · Local: `images/hai/reference/hai-tree-mj-________.jpg`
- **`{{OREF_TREE}}` =**
- **`{{MASTER_SEED}}` =**
- Done: [ ]

---

### B2. `{{OREF_WALK}}` — walking tall Ceiba (reuse seed, oref tree)

**UI:** pin `{{SREF_CHAR}}` + Omni `{{OREF_TREE}}`
Append `--seed {{MASTER_SEED}}` for shared geometry.

```text
Character reference sheet on pure flat pure white background, isolated subject, empty white void, no scenery. Lord Ikthiss as a living walking tall slender Ceiba: tall slender proportions, long kind limb-branches of living wood, long narrow grey-green bark body, fine grain and soft moss, deep buttress-root feet that can step slowly, leaf-and-soft-kapok crown, warm wise eyes in a gentle bark face at meetable height — face readable but not huge. Full figure standing, centered, clear tall thin Ceiba silhouette, generous white space. Child-safe. Detailed atmospheric watercolor, fine natural texture. No ground, no jungle, no mist --sref {{SREF_CHAR}} --sw 100 --ow 100 --seed {{MASTER_SEED}} --ar 11:17 --v 7 --style raw --s 50 --no background, scenery, jungle, ground, water, squat, fat trunk, golem, scary Ent, large face, text, letters
```

**Bridge pose** (optional variant — same oref, no seed):

```text
Same walking tall slender Ceiba character on pure flat pure white background, isolated subject, empty white void. Bent like a gentle bridge, one great kind wooden hand open low inviting a small friend. Kind meetable face, never scary. Full figure. Detailed atmospheric watercolor, fine natural texture. No scenery --sref {{SREF_CHAR}} --sw 100 --ow 100 --ar 11:17 --v 7 --style raw --s 50 --no background, scenery, jungle, ground, scary Ent, text, letters
```

**Record** · Local: `images/hai/reference/hai-walk-mj-________.jpg`
- **`{{OREF_WALK}}` =** · Bridge: · Done: [ ]

---

### B3. `{{OREF_KAI}}` — full Kai (reuse seed, optional face oref)

**UI:** pin `{{SREF_CHAR}}` + optional Omni `{{OREF_FACE}}` (if face plate done first — otherwise no oref)
Append `--seed {{MASTER_SEED}}` for shared palette/geometry hints.

```text
Character reference sheet on pure flat pure white background, isolated subject, empty white void, no scenery. Kai: small living walking Ceiba kapok seed-pod creature, child-animal scale, full body centered standing. Oblong warm hull soft green-brown to light bark tone, gentle pod ridges, tiny sturdy root-feet, soft kapok-silk wisp and tiny green sprout-tuft on top, simple friendly face with wise kind eyes and patient seed-smile, tiny arm-like rootlets. Kind, humble, endearing — not cute-flat, not scary. Detailed atmospheric watercolor character design, fine natural texture. No ground, no garden, no jungle, no mist --sref {{SREF_CHAR}} --sw 100 --ow 100 --seed {{MASTER_SEED}} --ar 11:17 --v 7 --style raw --s 50 --no background, scenery, jungle, ground, garden, vines, text, letters
```

(If no face oref pinned, drop `--ow` or leave — UI ignores it.)

**Record** · Local: `images/hai/reference/hai-seed-mj-________.jpg`
- **`{{OREF_KAI}}` =** · Done: [ ]

---

### B4. `{{OREF_FACE}}` — bark face close-up (standalone, never pinned on full-tree gens)

**UI:** pin `{{SREF_CHAR}}` only · **no oref**
**OK for face to be large** — this plate is the face lock, used only for face closeup scenes or as a visual reference. Never pin as oref onto a full-tree gen (that's the v1 trap).

```text
Character face lock, upper trunk only of a living Ceiba. Large clearly visible gentle face in the bark filling the center of the frame: two wise kind eyes, soft brows, small patient smile, nose suggested in wood grain. Face readable as a kind tree spirit, child-safe, not scary — features formed from bark and moss. Pale grey-green bark, soft moss. Pure flat pure white background, isolated subject, empty white void, no scenery. Detailed atmospheric watercolor character design, fine natural texture. No full tree, no jungle, no mist, no ground --sref {{SREF_CHAR}} --sw 100 --ar 11:17 --v 7 --style raw --s 50 --no background, scenery, jungle, mist, ground, full tree, text, letters
```

**Record** · Local: `images/hai/reference/hai-face-mj-________.jpg`
- **`{{OREF_FACE}}` =** · Done: [ ] / skip

---

### B5. `{{OREF_PIP}}`

**UI:** pin `{{SREF_CHAR}}` only

```text
Character reference sheet on pure flat pure white background, isolated subject, empty white void, no scenery. Pip: small young nine-banded armadillo, Dasypus novemcinctus, soft armor bands, warm brown-grey shell, expressive gentle eyes, small ears, kind child-safe face. Standing three-quarter view, full body centered, readable silhouette. Innocent children's book animal, not realistic-scary, not cute-flat. Detailed atmospheric watercolor, fine natural texture. No ground, no garden --sref {{SREF_CHAR}} --sw 100 --ar 11:17 --v 7 --style raw --s 50 --no background, scenery, jungle, ground, text, letters
```

**Record** · **`{{OREF_PIP}}` =** · Done: [ ]

---

### B6. `{{OREF_MACAW}}`

**UI:** pin `{{SREF_CHAR}}` only

```text
Character reference sheet on pure flat pure white background, isolated subject, empty white void, no scenery. Scarlet macaw, brilliant red yellow blue plumage, long elegant tail, grand but not mean expression, proud not cruel. Full body perched or standing, centered, fine feather texture. Minimal perch only if needed. Child-safe. Detailed atmospheric watercolor, fine natural texture. No jungle --sref {{SREF_CHAR}} --sw 100 --ar 11:17 --v 7 --style raw --s 50 --no background, scenery, jungle, text, letters
```

**Record** · **`{{OREF_MACAW}}` =** · Done: [ ]

---

### B7. `{{OREF_OWL}}`

**UI:** pin `{{SREF_CHAR}}` only

```text
Character reference sheet on pure flat pure white background, isolated subject, empty white void, no scenery. Very old spectacled owl, plain soft feathers, pale facial discs like spectacles, round wise gentle face, slow soft dignity. Full body, centered. Child-safe, humble, not scary. Detailed atmospheric watercolor, fine natural texture. No text, no letters --sref {{SREF_CHAR}} --sw 100 --ar 11:17 --v 7 --style raw --s 50 --no background, scenery, jungle, ground, scary owl, text, letters
```

**Record** · **`{{OREF_OWL}}` =** · Done: [ ]

---

### B8. `{{OREF_HOWLER}}`

**UI:** pin `{{SREF_CHAR}}` only

```text
Character reference sheet on pure flat pure white background, isolated subject, empty white void, no scenery. Howler monkey, rich coat, expressive face mid cheerful proud call, never ferocious, never teeth-bared aggression. Full body, centered, child-safe. Detailed atmospheric watercolor, fine natural texture. No text, no letters --sref {{SREF_CHAR}} --sw 100 --ar 11:17 --v 7 --style raw --s 50 --no background, scenery, jungle, ground, ferocious, text, letters
```

**Record** · **`{{OREF_HOWLER}}` =** · Done: [ ]

---

### B9. `{{OREF_TAPIR}}`

**UI:** pin `{{SREF_CHAR}}` only

```text
Character reference sheet on pure flat pure white background, isolated subject, empty white void, no scenery. Sturdy Baird's tapir, solid gentle body, short flexible trunk-nose, kind calm eyes, bowing-ready posture. Full body, centered. Child-safe. Detailed atmospheric watercolor, fine natural texture. No text, no letters --sref {{SREF_CHAR}} --sw 100 --ar 11:17 --v 7 --style raw --s 50 --no background, scenery, jungle, ground, text, letters
```

**Record** · **`{{OREF_TAPIR}}` =** · Done: [ ]

---

### B10. `{{OREF_TOUCAN}}`

**UI:** pin `{{SREF_CHAR}}` only

```text
Character reference sheet on pure flat pure white background, isolated subject, empty white void, no scenery. Keel-billed toucan, bright multicolor bill, bright eye, open bill in grand joyful praise-call — never gothic, never omen-dark. Full body, centered, minimal perch ok. Child-safe. Detailed atmospheric watercolor, fine natural texture. No text, no letters --sref {{SREF_CHAR}} --sw 100 --ar 11:17 --v 7 --style raw --s 50 --no background, scenery, jungle, ground, gothic, text, letters
```

**Record** · **`{{OREF_TOUCAN}}` =** · Done: [ ]

---

### B11. `{{OREF_COATI}}` (optional)

**UI:** pin `{{SREF_CHAR}}` only

```text
Character reference sheet on pure flat pure white background, isolated subject, empty white void, no scenery. Coati, sleek body, long snout, ringed tail, sharp-eyed slightly muttering expression, still child-safe not villainous. Full body, centered. Detailed atmospheric watercolor, fine natural texture. No text, no letters --sref {{SREF_CHAR}} --sw 100 --ar 11:17 --v 7 --style raw --s 50 --no background, scenery, jungle, ground, text, letters
```

**Record** · **`{{OREF_COATI}}` =** · Done: [ ] / skip

---

### B12. `{{OREF_AGOUTI}}` (optional)

**UI:** pin `{{SREF_CHAR}}` only

```text
Character reference sheet on pure flat pure white background, isolated subject, empty white void, no scenery. Agouti, small quick warm brown-orange coat, demanding but not scary expression, child-safe. Full body, centered. Detailed atmospheric watercolor, fine natural texture. No text, no letters --sref {{SREF_CHAR}} --sw 100 --ar 11:17 --v 7 --style raw --s 50 --no background, scenery, jungle, ground, text, letters
```

**Record** · **`{{OREF_AGOUTI}}` =** · Done: [ ] / skip

---

### B13. Multi-cast plate (optional)

**UI:** pin `{{SREF_CHAR}}` only

```text
Character reference sheet on pure flat pure white background, isolated subjects only, empty white void, no scenery. Multiple figures spaced clearly left to right equal standing: Pip nine-banded armadillo; old spectacled owl; scarlet macaw; howler monkey; Baird's tapir. Each full body, child-safe, consistent watercolor design. No jungle, no ground --sref {{SREF_CHAR}} --sw 100 --ar 11:17 --v 7 --style raw --s 50 --no background, scenery, jungle, ground, labels, text, letters
```

**Record** · Multi-cast URL: · Done: [ ] / skip

---

### Phase B gate

- [ ] All locks used **`{{SREF_CHAR}}`**, never scenic sref
- [ ] White void holds; medium matches book
- [ ] OREF_TREE tall thin + faceless; WALK / KAI done; face plate standalone
- [ ] `{{MASTER_SEED}}` reused on WALK / KAI

---

## Phase C — Story pages

**Always pin `{{SREF_STYLE}}` + the single listed primary oref.**
`--sw 120` and `--ow 100` by default (drop to 80 if tree/face inflates).
Order: Cover → p1–p9 → Dedication → p10–p17 → p18–p26.

Face in scenes is described in prose ("kind tiny bark face high in trunk, no larger than a wood knot"). Never pin the face plate as oref onto a full-tree scene.

---

### Cover

**Pin:** `{{SREF_STYLE}}` + `{{OREF_TREE}}`

```text
Children's picture book cover, portrait. Detailed atmospheric watercolor, fine natural texture; soft distant vapor-mist, clearer near detail. Living-jungle palette. Central: Lord Hai Ikthiss as a vast kind living tall slender Ceiba — long narrow columnar trunk, high umbrella canopy, small buttresses, botanical proportions — gentle tiny bark face high on upper trunk no larger than a wood knot, wise kind eyes, canopy like open hands, roots by a bright spring. Quiet care not pride. Small highland-valley creatures far below look up through layered mist. Glowing jungle pool, canopy slopes, soft far ridges. Soft open band near top or bottom for title overlay later — no lettering in image. Quiet grandeur. No squat fat tree, no huge face, no cartoon outlines, no buildings --sref {{SREF_STYLE}} --sw 120 --ow 100 --ar 11:17 --v 7 --style raw --s 120 --no squat tree, fat trunk, large face, buildings, text, letters
```

**Record** · Local: `images/hai/cover-mj-________.jpg` · Done: [ ]

---

### Dedication

**Pin:** `{{SREF_STYLE}}` only · **no oref**

```text
Almost blank warm cream page, delicate atmospheric watercolor wash. Centre bottom only: three tiny green sprouts beside a single drop of clear water and a small smooth fish-shaped glint of light — very subtle. Very minimal, generous open space above for dedication text overlay. Soft morning mist-light. Delicate ferns and Ceiba leaves at edges only. Optional tiny soft Ceiba silhouette far in cool mist, very small. No buildings. No text, no letters, no numbers --sref {{SREF_STYLE}} --sw 80 --ar 11:17 --v 7 --style raw --s 80 --no text, letters, numbers, buildings, large tree
```

**Record** · Local: `images/hai/dedication-mj-________.jpg` · Done: [ ]

---

### Page 1

**Pin:** `{{SREF_STYLE}}` + `{{OREF_TREE}}`

```text
Chapter-opening illustration, no lettering. Soft cream ground with atmospheric watercolor depth. Large characterful living tall slender Ceiba dominates the upper portion — long narrow trunk, high canopy, botanical proportions — kind tiny bark face high in trunk, no larger than a wood knot, palmate leaves filtering warm early-morning gold; cool vapor-mist at far canopy edge. Below, small valley creatures look upward with bright praise. Clear spring rings buttress roots. Soft ridges beyond. Peaceful, high, slightly lonely quiet grandeur. Clear lower area for text overlay. No cartoon outlines, no buildings, no squat fat tree, no huge face --sref {{SREF_STYLE}} --sw 120 --ow 100 --ar 11:17 --v 7 --style raw --s 120 --no text, letters, squat tree, large face, buildings
```

**Record** · Local: `images/hai/page-1-mj-________.jpg` · Done: [ ]

---

### Page 2

**Pin:** `{{SREF_STYLE}}` + `{{OREF_TREE}}`

```text
Detailed atmospheric watercolor children's illustration. Dawn over a young highland valley in layered vapor-mist. Hai Ikthiss a single tall slender living Ceiba, long narrow bole, high canopy, gentle tiny bark face high in trunk, alone at first, buttress roots drinking a bright new spring — fine near bark and water, soft ridges dissolving into mist. Soft first grasses and one small bird arriving. Warm gold on canopy. Text space clear in lower 40%. Quiet creation mood. No squat fat tree, no huge face, no cartoon outlines, no buildings --sref {{SREF_STYLE}} --sw 120 --ow 100 --ar 11:17 --v 7 --style raw --s 120 --no text, letters, squat tree, large face, buildings
```

**Record** · Local: `images/hai/page-2-mj-________.jpg` · Done: [ ]

---

### Page 3

**Pin:** `{{SREF_STYLE}}` + `{{OREF_TREE}}` (howler described in prose)

```text
Gentle storytelling scene in detailed atmospheric watercolor. Hai Ikthiss tall slender living Ceiba high above through layered canopy. Proud howler monkey leads a cheer at the roots, bright loud call, rich coat, never ferocious. Other small jungle creatures join praise. Hai's kind tiny face above them, softly unseen in bark and leaf-shadow, no larger than a wood knot. Clear spring and ferny forest floor; warm gold on high leaves, cool mist understory. Height and missed connection. Text space about 40% bottom. Child-safe. No buildings --sref {{SREF_STYLE}} --sw 120 --ow 100 --ar 11:17 --v 7 --style raw --s 120 --no text, letters, buildings, ferocious, large face, squat tree
```

**Record** · Local: `images/hai/page-3-mj-________.jpg` · Done: [ ]

---

### Page 4

**Pin:** `{{SREF_STYLE}}` + `{{OREF_TREE}}` (tapir in prose)

```text
Warm earthy scene in detailed atmospheric watercolor. Sturdy Baird's tapir with gentle trunk-nose bows toward great buttress trunk of tall slender Hai Ikthiss. Other animals copy the bow toward bark and shade — fine bark grain, leaf litter, mossy stone foreground. Tree's gentle tiny face high above looks kind and a little alone through soft canopy mist, no larger than a wood knot. Gold-and-cool understory light. Text space about 40% bottom. No buildings --sref {{SREF_STYLE}} --sw 120 --ow 100 --ar 11:17 --v 7 --style raw --s 120 --no text, letters, buildings, squat tree, large face
```

**Record** · Local: `images/hai/page-4-mj-________.jpg` · Done: [ ]

---

### Page 5

**Pin:** `{{SREF_STYLE}}` + `{{OREF_TREE}}` (toucan in prose)

```text
Emotional but safe illustration in detailed atmospheric watercolor. Hai Ikthiss tall slender Ceiba with soft cool hollow-glow near upper trunk — subtle, internal, not scary, not a wound. Keel-billed toucan mid-canopy, bright eye, open bill grand praise-call — never gothic or omen-dark. Animals below cheering. Warm outer leaves, cooler quiet light at hollow. Text area bottom 40%. Lonely grandeur without darkness. No cartoon outlines, no buildings --sref {{SREF_STYLE}} --sw 120 --ow 100 --ar 11:17 --v 7 --style raw --s 120 --no text, letters, buildings, gothic, wound, large face, squat tree
```

**Record** · Local: `images/hai/page-5-mj-________.jpg` · Done: [ ]

---

### Page 6

**Pin:** `{{SREF_STYLE}}` + `{{OREF_TREE}}`

```text
Quiet turning-point scene in detailed atmospheric watercolor. Hai Ikthiss tall slender living Ceiba still and kind, one long root or low branch gently reaching toward clear spring and soft leaf litter — visual hook of connection; fine water and buttress texture near, soft misted jungle beyond. Animals praising softly in distance, unnoticed. Warm understanding mood. Text space about 40% bottom. No anger. Child-safe. No buildings --sref {{SREF_STYLE}} --sw 120 --ow 100 --ar 11:17 --v 7 --style raw --s 120 --no text, letters, buildings, anger, large face, squat tree
```

**Record** · Local: `images/hai/page-6-mj-________.jpg` · Done: [ ]

---

### Page 7

**Pin:** `{{SREF_STYLE}}` + `{{OREF_TREE}}`

```text
Beautiful quiet night scene in detailed atmospheric watercolor. Hai Ikthiss tall slender Ceiba under deep starry sky over highland valley, canopy holding soft silver starlight; cool blues, mist grey, silver leaf-light. Peaceful accepting bark-face, tiny and high, no larger than a wood knot. Internal hollow now warmer, watered, almost glowing — gentle not eerie. Deep calm. Text space about 40% bottom. Gentle night wonder not scary darkness. No buildings --sref {{SREF_STYLE}} --sw 120 --ow 100 --ar 11:17 --v 7 --style raw --s 120 --no text, letters, buildings, horror, large face, squat tree
```

**Record** · Local: `images/hai/page-7-mj-________.jpg` · Done: [ ]

---

### Page 8

**Pin:** `{{SREF_STYLE}}` + `{{OREF_TREE}}` (howler + tapir in prose)

```text
Bright fresh morning in detailed atmospheric watercolor. Hai Ikthiss tall slender Ceiba with soft gold light in his tiny high face, looking down the long trunk toward the ground with gentle resolve, face no larger than a wood knot. Howler monkey and Baird's tapir soft in misted background still cheering without looking into his eyes. Spring bright at buttress roots; canopy slopes beyond. Hopeful quiet self-understanding. Text space about 40% bottom. No buildings --sref {{SREF_STYLE}} --sw 120 --ow 100 --ar 11:17 --v 7 --style raw --s 120 --no text, letters, buildings, large face, squat tree
```

**Record** · Local: `images/hai/page-8-mj-________.jpg` · Done: [ ]

---

### Page 9

**Pin:** `{{SREF_STYLE}}` + `{{OREF_TREE}}`

```text
Warm chapter-closing scene in detailed atmospheric watercolor. Hai Ikthiss tall slender living Ceiba sending visible soft streams of clear water and gentle light down to tiny ferns and small animals at roots — fine leaf and water near, soft golden afternoon valley beyond. Peaceful satisfied tree-smile. Soft vignette optional. Generous text space about 50% bottom. No blood, only clear water and light. No buildings --sref {{SREF_STYLE}} --sw 120 --ow 100 --ar 11:17 --v 7 --style raw --s 120 --no text, letters, buildings, blood, wounds, large face, squat tree
```

**Record** · Local: `images/hai/page-9-mj-________.jpg` · Done: [ ]

---

### Page 10

**Pin:** `{{SREF_STYLE}}` + `{{OREF_KAI}}`

```text
Simple chapter-opening illustration, no lettering. Soft cream background with warm atmospheric watercolor wash. Centre: small living walking Ceiba seed-pod creature — oblong warm hull, tiny root-feet, kapok wisp or sprout-tuft, gentle patient face — standing at foot of great tall slender Ceiba rising into misted canopy, high face gone quiet, no face in upper wood. Fine texture on pod and bark; soft green, cream, bark grey-green; hint of fern and moss. Calm transitional mood. Clear lower area for text overlay. No buildings --sref {{SREF_STYLE}} --sw 120 --ow 120 --ar 11:17 --v 7 --style raw --s 120 --no text, letters, titles, numbers, buildings
```

**Record** · Local: `images/hai/page-10-mj-________.jpg` · Done: [ ]

---

### Page 11

**Pin:** `{{SREF_STYLE}}` + `{{OREF_KAI}}`

```text
Cheerful sunny morning jungle forest-floor garden at roots of tall Ceiba. Detailed atmospheric watercolor. Tall slender Ceiba upper portion — canopy full, high face gone quiet, soft mist in upper leaves. Below, Kai small living walking Ceiba seed-pod, oblong warm hull, kapok wisp, friendly face, tiny root-feet, among healthy cantaloupe rockmelon vines, fern edges, root beds, leaf litter. Warm early light through leaves. Gentle wonder. Text space about 40% bottom. No cartoon outlines, no buildings --sref {{SREF_STYLE}} --sw 120 --ow 120 --ar 11:17 --v 7 --style raw --s 120 --no text, letters, buildings
```

**Record** · Local: `images/hai/page-11-mj-________.jpg` · Done: [ ]

---

### Page 12

**Pin:** `{{SREF_STYLE}}` + `{{OREF_KAI}}` (Pip in prose)

```text
Soft dynamic moment in detailed atmospheric watercolor. Small young nine-banded armadillo Pip horrified mid-step. Big cantaloupe rockmelon smashed open at Kai's feet, juice and seeds — fine wet texture, not messy-scary. Kai small living walking Ceiba seed-pod, kind steady face, tiny root-feet. Jungle forest-floor garden, root beds, ferns, leaf litter. Mild gentle disaster. Text space about 40% bottom. Child-safe. No buildings --sref {{SREF_STYLE}} --sw 120 --ow 120 --ar 11:17 --v 7 --style raw --s 120 --no text, letters, buildings, gore
```

**Record** · Local: `images/hai/page-12-mj-________.jpg` · Done: [ ]

---

### Page 13

**Pin:** `{{SREF_STYLE}}` + `{{OREF_KAI}}` (Pip, coati, agouti in prose)

```text
Emotional group scene in detailed atmospheric watercolor. Pip nine-banded armadillo curled a little in fear and shame. Kai small living walking Ceiba-pod standing still, kind concerned face. Background coati with ringed tail and agouti looking judgmental, softened by shallow depth and jungle mist. Soft light on Kai and Pip. Text space about 40% bottom. Innocent tone. No harsh darkness. No buildings --sref {{SREF_STYLE}} --sw 120 --ow 120 --ar 11:17 --v 7 --style raw --s 120 --no text, letters, buildings, harsh darkness
```

**Record** · Local: `images/hai/page-13-mj-________.jpg` · Done: [ ]

---

### Page 14

**Pin:** `{{SREF_STYLE}}` + `{{OREF_KAI}}` (Pip in prose)

```text
Key emotional turning-point in detailed atmospheric watercolor. Kai small living walking Ceiba pod kneeling, offering digging stick toward Pip nine-banded armadillo with open kind body language. Pip slowly uncurling, hope in eyes. Broken melon visible but not centre. Soft hopeful gold through leaves; fine leaf litter. Tall Ceiba watches in misted background, face gone quiet. Text space about 40% bottom. No cartoon outlines, no buildings --sref {{SREF_STYLE}} --sw 120 --ow 120 --ar 11:17 --v 7 --style raw --s 120 --no text, letters, buildings
```

**Record** · Local: `images/hai/page-14-mj-________.jpg` · Done: [ ]

---

### Page 15

**Pin:** `{{SREF_STYLE}}` + `{{OREF_KAI}}` (Pip in prose)

```text
Warm working-together scene in detailed atmospheric watercolor. Kai living walking Ceiba pod and Pip nine-banded armadillo side-by-side planting seeds, watering with a leaf, building tiny twig fence. Soft smiles. Soft afternoon light, rich leaf litter, first green shoots; soft jungle depth. Friendship and quiet repair. Text space about 40% bottom. Child-safe. No buildings --sref {{SREF_STYLE}} --sw 120 --ow 120 --ar 11:17 --v 7 --style raw --s 120 --no text, letters, buildings
```

**Record** · Local: `images/hai/page-15-mj-________.jpg` · Done: [ ]

---

### Page 16

**Pin:** `{{SREF_STYLE}}` + `{{OREF_KAI}}` (Pip in prose)

```text
Gentle time-passing scene in detailed atmospheric watercolor. Pip nine-banded armadillo happily watering thriving new melon vines with leaf bucket. Kai living walking Ceiba pod nearby, quiet pride. Soft sense of days passed. Warm greens and moss; forest-floor garden; tall quiet Ceiba soft above in haze. Text space about 45% bottom. Quiet hopeful. No buildings --sref {{SREF_STYLE}} --sw 120 --ow 120 --ar 11:17 --v 7 --style raw --s 120 --no text, letters, buildings
```

**Record** · Local: `images/hai/page-16-mj-________.jpg` · Done: [ ]

---

### Page 17

**Pin:** `{{SREF_STYLE}}` + `{{OREF_KAI}}` (Pip + third creature in prose)

```text
Beautiful chapter-closing illustration in detailed atmospheric watercolor. Kai humble living walking Ceiba pod and Pip nine-banded armadillo sitting beside thriving melon plants in jungle forest-floor garden. Third small jungle creature happily included after a small accident. Soft golden-hour light, layered mist, soft far ridges. Community and healed belonging. Tall Ceiba above peaceful, face gone quiet. Soft vignette optional. Text space about 50% bottom. No buildings --sref {{SREF_STYLE}} --sw 120 --ow 120 --ar 11:17 --v 7 --style raw --s 120 --no text, letters, buildings
```

**Record** · Local: `images/hai/page-17-mj-________.jpg` · Done: [ ]

---

### Page 18

**Pin:** `{{SREF_STYLE}}` + `{{OREF_WALK}}`

```text
Chapter opening illustration, no lettering. Soft cream ground with atmospheric watercolor depth. Centre: living walking tall slender Ceiba, gentle kind form never scary, offering both hands downward to lift not push. Long limb-branches, meetable face, not a squat golem. Small jungle creatures at base unsure, half praise half fear. Soft leaves, buttress roots, quiet jungle mist. Wonder without fright. Clear lower area for text overlay. No harsh darkness, no scary faces, no buildings --sref {{SREF_STYLE}} --sw 120 --ow 100 --ar 11:17 --v 7 --style raw --s 120 --no text, letters, titles, scary Ent, squat golem, buildings
```

**Record** · Local: `images/hai/page-18-mj-________.jpg` · Done: [ ]

---

### Page 19

**Pin:** `{{SREF_STYLE}}` + `{{OREF_TREE}}`

```text
Evening by tall slender Ceiba in detailed atmospheric watercolor. Golden-hour on Hai Ikthiss returned to crown — kind tiny face high again, no larger than a wood knot; warm gold on high canopy, cooler mist at roots. At roots small animals cluster and whisper, worried eyes instead of cheers. Tender sad misunderstanding. Text space about 40% bottom. Child-safe. No buildings --sref {{SREF_STYLE}} --sw 120 --ow 100 --ar 11:17 --v 7 --style raw --s 120 --no text, letters, buildings, large face, squat tree
```

**Record** · Local: `images/hai/page-19-mj-________.jpg` · Done: [ ]

---

### Page 20

**Pin:** `{{SREF_STYLE}}` + `{{OREF_MACAW}}` (CROWN in prose)

```text
Scene under tall slender Ceiba in detailed atmospheric watercolor. Handsome scarlet macaw spectacular long tail red-yellow-blue plumage mid-height, chest out, speaking grand caution — fine feather texture. Small animals nodding. Hai Ikthiss high above rooted living Ceiba, kind and still, not angry, softened by canopy mist. Soft layered light. Fear-as-status storytelling. Text space about 40% bottom. No cartoon outlines, no buildings --sref {{SREF_STYLE}} --sw 120 --ow 120 --ar 11:17 --v 7 --style raw --s 120 --no text, letters, buildings
```

**Record** · Local: `images/hai/page-20-mj-________.jpg` · Done: [ ]

---

### Page 21

**Pin:** `{{SREF_STYLE}}` + `{{OREF_OWL}}` (CROWN in prose)

```text
Quiet contrast scene in detailed atmospheric watercolor. Humble old spectacled owl plain soft feathers pale facial discs round wise face speaking softly toward great tall slender Ceiba — fine feather and bark texture. Hai Ikthiss listening with open attention in high rooted-crown face, tiny and high. Some animals turning away toward flashy scarlet macaw in soft misted background. Gentle dignified tender mood. Cool understory light. Text space about 40% bottom. No buildings --sref {{SREF_STYLE}} --sw 120 --ow 120 --ar 11:17 --v 7 --style raw --s 120 --no text, letters, buildings, horror
```

**Record** · Local: `images/hai/page-21-mj-________.jpg` · Done: [ ]

---

### Page 22

**Pin:** `{{SREF_STYLE}}` + `{{OREF_WALK}}`

```text
Wonder scene in detailed atmospheric watercolor. Hai Ikthiss transforming gently from rooted Ceiba into living walking tall slender Ceiba: long kind limb-branches, bark skin fine grain, leaf-and-soft-kapok crown, buttress-root feet, warm eyes at height animals can face — never scary. Fully mobile walking tree, not half-stuck, not squat golem. Soft non-scary wonder; creatures gasping but safe. Layered canopy light and mist. Text space about 40% bottom. No harsh darkness, no scary faces, no buildings, no Ent-monster --sref {{SREF_STYLE}} --sw 120 --ow 100 --ar 11:17 --v 7 --style raw --s 120 --no text, letters, buildings, scary Ent, squat golem, half-buried tree
```

**Record** · Local: `images/hai/page-22-mj-________.jpg` · Done: [ ]

---

### Page 23

**Pin:** `{{SREF_STYLE}}` + `{{OREF_WALK}}` (Pip in prose)

```text
Lovely generous scene in detailed atmospheric watercolor. Hai Ikthiss gentle walking tall slender Ceiba bending like a bridge, one great kind hand open low for Pip nine-banded armadillo. Pip unafraid stepping forward. Other animals half-hid among roots and mist. Soft gold god-rays through leaves. Invitation and true seeing. Text space about 40% bottom. Child-safe kind wonder. No buildings --sref {{SREF_STYLE}} --sw 120 --ow 100 --ar 11:17 --v 7 --style raw --s 120 --no text, letters, buildings, scary Ent
```

**Record** · Local: `images/hai/page-23-mj-________.jpg` · Done: [ ]

---

### Page 24

**Pin:** `{{SREF_STYLE}}` + `{{OREF_WALK}}` (others in prose)

```text
Hopeful wondrous group scene in detailed atmospheric watercolor. Hai Ikthiss kind walking tall slender Ceiba lifting friends: Pip nine-banded armadillo, old spectacled owl, other valley creatures rising beside him as gentle giants with joyful not scary faces — same animals, shared height, eyes level with far ridges. Soft bright morning light, highland valley opening to soft far ridges. Shared wonder not domination. Text space about 40% bottom. Child-safe. No buildings --sref {{SREF_STYLE}} --sw 120 --ow 100 --ar 11:17 --v 7 --style raw --s 120 --no text, letters, buildings, scary giants, monster
```

**Record** · Local: `images/hai/page-24-mj-________.jpg` · Done: [ ]

---

### Page 25

**Pin:** `{{SREF_STYLE}}` + `{{OREF_WALK}}`

```text
Beautiful final story page in detailed atmospheric watercolor. Hai Ikthiss kind walking tall slender Ceiba and giant animal friends on high ridge at golden hour beside tall rooted Ceiba landmark, looking over whole peaceful highland valley — jungle pool, melon garden at roots, canopy slopes, soft far ridges in mist. Open sky, freedom, quiet understanding. Warm height-gold, deep calm joy. Text space about 50% bottom. No harsh darkness. No buildings --sref {{SREF_STYLE}} --sw 120 --ow 100 --ar 11:17 --v 7 --style raw --s 120 --no text, letters, buildings
```

**Record** · Local: `images/hai/page-25-mj-________.jpg` · Done: [ ]

---

### Page 26

**Pin:** `{{SREF_STYLE}}` + `{{OREF_WALK}}`

```text
Final endpaper-style illustration in detailed atmospheric watercolor. Wide gentle highland valley at peaceful dusk — layered canopy and Ceiba, spring and pool silver, soft far ridges into cool vapor-mist. Hai Ikthiss kind walking tall slender Ceiba among gentle giant friends on a soft rise — Pip, spectacled owl, scarlet macaw and others now as tall as he is, same height, walking among them as equals — small in vast landscape yet glowing with quiet presence. Soft stars beginning. Twilight lavender, soft gold, deep moss, bark grey-green, water turquoise-silver. Large open text area center about 40% height, band simple for overlay. No lettering in image. No cartoon outlines, no harsh darkness, no buildings --sref {{SREF_STYLE}} --sw 120 --ow 100 --ar 11:17 --v 7 --style raw --s 120 --no text, letters, buildings, scary giants
```

**Record** · Local: `images/hai/page-26-mj-________.jpg` · Done: [ ]

---

## Phase D — Export

> **Resolution note:** MJ v7 at `--ar 11:17` base ≈ 1024×1578; upscale ≈ 2048×3156. You **cannot** get exactly 1650×2550 from MJ — upscale to max, then external crop/resize (Affinity / Photoshop / ImageMagick).

1. [ ] Upscale to MJ max · external crop/resize to **1650×2550** JPEG
2. [ ] Save under `images/hai/` + `reference/` with `mj-{uuid}`
3. [ ] Later one commit: `tall-tales.html` · `site.js` FILES · `book-text.html` PAGE_BG

---

## Recovery workflow (most MJ time lives here)

When a generation is **close but wrong**, do not start fresh. Use these in order:

| Situation | Action |
|-----------|--------|
| All 4 samples wrong in the same way | Edit the prompt (tweak prose, adjust `--no` / `--ow` / `--sw`) and reroll — fresh roll, no parent |
| 1 of 4 is good, want variants of it | **Vary (Subtle)** on that image — keeps composition, rolls small changes |
| 1 of 4 is good except one area (e.g., face too big, fat trunk) | **Vary Region** on that image — select the bad area, prompt only that area |
| Tree goes fat in-scene | Reroll with `--ow 80`; still fat → `--ow 60` + add "thin vertical silhouette, height many times width" |
| Face huge/missing | Adjust face phrase: "face no larger than a wood knot, small detail high on trunk, does not widen the trunk." Reroll |
| Watercolor look weak | Raise `--sw` on the sref to 150. Reroll |
| Good image but want same composition with tweaks | **Vary (Subtle)**, not a fresh roll |
| Good image, want a different aspect | Reroll with new `--ar`; do not crop the locked image |

**Efficiency rule:** Vary Subtle / Vary Region are cheaper and more reliable than fresh rolls when you already have a near-miss. Use them.

---

## Quick reference

| Job | sref | oref |
|-----|------|------|
| All Phase B locks | **`{{SREF_CHAR}}`** | as listed (tree oref only when chaining) |
| Cover, p1–9, p19 | `{{SREF_STYLE}}` | TREE |
| Dedication | `{{SREF_STYLE}}` | — |
| p10–11, 14–15, 17 | `{{SREF_STYLE}}` | KAI |
| p12, 16 | `{{SREF_STYLE}}` | KAI |
| p13 | `{{SREF_STYLE}}` | KAI |
| p18, 22–26 | `{{SREF_STYLE}}` | WALK |
| p20 | `{{SREF_STYLE}}` | MACAW |
| p21 | `{{SREF_STYLE}}` | OWL |
| p3 / p4 / p23 | `{{SREF_STYLE}}` | TREE / TREE / WALK (howler / tapir / pip in prose) |

| Symptom | Fix |
|---------|-----|
| Lock has jungle | Wrong sref (use CHAR); or lower `--sw` to 70 |
| Lock has no watercolor | Raise `--sw` on CHAR to 120-150; confirm A0 is real subject, not wash |
| Fat tree | Geometry line + `--ow 80` + `--no baobab, squat, oak, barrel` |
| Huge face | Face-oref-on-tree trap — remove face oref, put face in prose |
| No face in scene | Add "kind tiny bark face high in trunk, no larger than a wood knot"; reroll |
| Web oref fails | Pin Omni in UI; keep `--ow` in paste |
| Two characters drift | Only one oref — primary; describe other in prose |
| Forms don't match across CROWN/QUIET/WALK/KAI | Reuse `{{MASTER_SEED}}` on every lock |

---

## Session log

```text
{{SREF_CHAR}} =
{{SREF_STYLE}} =
{{MASTER_SEED}} =
{{OREF_TREE}} =
{{OREF_WALK}} =
{{OREF_KAI}} =
{{OREF_FACE}} =
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

*Canon story: `HaiIkthiss-ThreeTallTales.md`.*
*Quick viability test (4 prompts, run first): `HaiIkthiss-MJ-Viability.md`.*
*v1 runbook (has known structural flaws, kept for reference): `HaiIkthiss-MidjourneyRunbook.md`.*
