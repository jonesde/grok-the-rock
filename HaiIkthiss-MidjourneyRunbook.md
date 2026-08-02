# Hai Ikthiss — Midjourney Runbook

Manual production script for **full Midjourney redo** of *Three Tall Tales* art.  
Source canon: `HaiIkthiss-ThreeTallTales.md`.  
Interface: **midjourney.com** web Imagine bar (no Discord API).  
**V7** + **Style Reference** + **Omni Reference** (pin in UI).

Title lettering is **never** in the image — web/print overlays handle chapter titles and body text.

**Paste rule:** Each fenced `text` block is one full Imagine paste (prompt + params).  
Before paste: replace `{{SREF_*}}` / `{{OREF_*}}` with real sref codes or image URLs **or** pin the same images in the web UI and keep the `--sw` / `--ow` values from the paste. Web often requires **manual pin** for Omni; Style can be code or pin.

---

## Progress checklist

### Setup
- [ ] Phase A0 — **character medium** sref approved → `{{SREF_CHAR}}`
- [ ] Phase A1–A2 — **scene** sref approved → `{{SREF_STYLE}}`
- [ ] Phase B — face → full-body → cast locks → all `{{OREF_*}}`
- [ ] One smoke-test LOCK + one smoke-test SCENE look right

### Pages
- [ ] Cover · Dedication
- [ ] p1–p9 · p10–p17 · p18–p26

### Handoff (later)
- [ ] 1650×2550 under `images/hai/` · triple-book paths in HTML/JS

---

## 0. How to use (web)

### 0.1 Two style refs (do not collapse these)

| Ref | What it is | Use on |
|-----|------------|--------|
| **`{{SREF_CHAR}}`** | Medium + palette **only** — watercolor pigment, paper grain, soft edges, living-jungle **colors**. **No landscape, no tree, no animal.** Built in Phase A0 on white/cream. | **Every Phase B lock** |
| **`{{SREF_STYLE}}`** | Full scenic book look — valley, mist, depth, light (Phase A1–A2). | **Every Phase C page** (+ cover) |

**Why two:** A scenic sref teaches “draw a jungle behind everything.” A medium sref teaches “paint like this book” while the prompt keeps a white void and a single character.  
**Do not** pin `{{SREF_STYLE}}` on lock sheets.  
**Do not** pin `{{OREF_*}}` as a style ref.

### 0.2 Two job types

| Job | Background | Style pin | Omni pin | Suffix shape |
|-----|------------|-----------|----------|--------------|
| **LOCK** (Phase B) | Pure white void | **`{{SREF_CHAR}}`** `--sw 100` | Face→body as noted | see each paste |
| **SCENE** (Phase C) | Full highland jungle | **`{{SREF_STYLE}}`** `--sw 120` | Primary character | see each paste |

### 0.3 Hard lessons (baked into pastes)

| Failure | Fix in this runbook |
|--------|---------------------|
| No face on full tree | B1a face plate → B1b full tree + face oref |
| Fat short mascot tree | Ceiba geometry + establishing shot + `--no baobab, oak, squat…` |
| Huge face from face-oref | Full-tree locks use **`--ow 50`** + “wood knot” size |
| Scenic junk on character locks | Locks use **`{{SREF_CHAR}}` only** (not scenic sref) + white void + `--no background…` |
| Medium missing on locks | Every lock paste includes `--sref {{SREF_CHAR}} --sw 100` |
| oref ID won’t paste on web | Pin Omni in UI; paste still has `--ow` |
| Only one oref allowed | Primary character as oref; others described in text |
| Spring/ground sneaks onto locks | Lock prompts have **no** spring, grass, ground plane, mist bands |
| Scene loses book look | Pages use `{{SREF_STYLE}}` |
| Scene loses character | Pages use body oref + `--ow 100`–`120` |
| Lettering in art | Every paste ends bans on text/letters/titles |
| Ent/monster creep | Child-safe + `--no scary Ent` on walk/crown |

### 0.4 Defaults

| Control | LOCK | SCENE |
|--------|------|-------|
| `--v` | `7` | `7` |
| `--ar` | `11:17` | `11:17` |
| `--style` | `raw` | `raw` |
| `--s` | `50`–`80` | `100`–`120` |
| `--sw` | **`100`** with `{{SREF_CHAR}}` | **`120`** with `{{SREF_STYLE}}` |
| `--ow` | face→body **`50`** (40–70); animals **`100`** if face oref | **`100`–`120`**; drop to 50–80 if face/body inflates |

**If lock still picks up scenery:** lower `--sw` to `60`–`80` (keep `{{SREF_CHAR}}` — do not switch to scenic sref).  
**If lock loses watercolor look:** raise `--sw` to `120`–`150` on `{{SREF_CHAR}}` only.  
**If full tree still fat:** one silhouette grid at `--ow 30` or no oref, then retry face oref at 50.

### 0.5 Placeholders (fill as you go)

```text
{{SREF_CHAR}} = 
{{SREF_STYLE}} = 
{{OREF_CROWN_FACE}} = 
{{OREF_CROWN}} = 
{{OREF_QUIET}} = 
{{OREF_KAI_FACE}} = 
{{OREF_KAI}} = 
{{OREF_WALK_FACE}} = 
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

### 0.6 Per-job ritual

1. LOCK or SCENE?  
2. Pin correct **sref** + **oref** (if any).  
3. Paste block (placeholders already filled, or UI pins match).  
4. Generate → pick → upscale.  
5. Record + acceptance.

### 0.7 Acceptance

**LOCK:** white/near-white void · single subject · tall slender crown/walk · tiny face on full crown · watercolor matches book medium · no jungle/mist/ground/spring  
**SCENE:** correct Hai form · text band clear · child-safe · no lettering · no temples/blood · character matches oref  

### 0.8 Naming

```text
images/hai/reference/{hai-face|hai-main|hai-empty|hai-seed|hai-walk|pip|…}-mj-{uuid}.jpg
images/hai/{cover|dedication|page-N}-mj-{uuid}.jpg
```

Target **1650×2550**.

---

## Phase A — Style refs

### A0. `{{SREF_CHAR}}` — medium only (FOR ALL CHARACTER LOCKS)

**Critical:** This image must contain **zero** trees, animals, valleys, or scenes. Only paint quality + palette.

**UI:** nothing pinned.

```text
Abstract watercolor medium sample for a children’s book style guide, pure flat cream-white paper background. Soft natural watercolor washes and fine paper grain only — living-jungle palette as pure color: Ceiba bark grey-green, soft umber, deep leaf green, turquoise-silver, cool vapor grey, warm canopy gold, soft cream. Loose wet edges, gentle pigment blooms, fine natural texture, quiet soft light. No objects, no trees, no leaves as subjects, no animals, no landscape, no horizon, no sky scene, no mist bands as scenery, no vignette frame, no borders, no text, no letters, no logos, no characters. Style swatch only --ar 11:17 --v 7 --style raw --s 100 --no tree, forest, jungle, landscape, mountain, animal, face, character, object, leaf cluster, vine, building, text, letters, border, frame
```

Run 2–4 grids if needed. Pick the one that looks most like the book’s *paint*, not a picture of a place.

**Optional second swatch** (same rules, slightly different wash) — you may multi-sref both as `{{SREF_CHAR}}`:

```text
Close-up watercolor paper texture sample, cream-white ground, soft overlapping transparent washes in grey-green, leaf green, soft gold, cool grey, turquoise tint, fine granulation, children’s book illustration medium, no subject matter, no composition of a scene, empty of objects --ar 11:17 --v 7 --style raw --s 80 --no landscape, tree, animal, object, scene, text
```

**Record**
- Job / URL / sref code:  
- **`{{SREF_CHAR}}` =**  
- Done: [ ]

**Smoke test** (should be white + watercolor tree, not a valley):

```text
Character reference sheet on pure flat pure white background, isolated subject only, empty white void. Single simple tall slender tree silhouette, botanical, centered. Detailed watercolor. No scenery. No text --sref {{SREF_CHAR}} --sw 100 --ar 11:17 --v 7 --style raw --s 50 --no background, scenery, landscape, jungle, mist, ground, text
```

If smoke test shows jungle/mist: regenerate A0 until clean, or lower `--sw` to 70 on locks.

---

### A1. `{{SREF_STYLE}}` part 1 — valley (FOR STORY PAGES)

```text
Detailed atmospheric watercolor children’s book illustration, fine natural texture. Highland Honduran valley: emergent Ceiba kapok above layered canopy, buttress roots, ferns, philodendron, bromeliads, clear natural spring pool, soft tropical vapor-mist in hollows, warm gold god-rays on high canopy, cool mist below, soft far green ridges. Living-jungle palette grey-green bark, deep leaf green, turquoise-silver water, cream sky. Quiet grandeur, kind innocent mood. Empty of people and named characters. Portrait, generous clear lower area. No cartoon outlines, no harsh darkness, no temples, no ruins --ar 11:17 --v 7 --style raw --s 200
```

**Record** · Job: · Notes:

### A2. `{{SREF_STYLE}}` part 2 — forest floor

```text
Detailed atmospheric watercolor, fine natural texture. Close jungle forest-floor garden: leaf litter, fern edges, root beds, cantaloupe rockmelon vines, filtered gold light through canopy, soft mist depth, clear tiny spring trickle. Living-jungle greens and bark greys, warm cream light. Children’s book illustration, empty of characters. Clear lower third. No cartoon outlines, no buildings --ar 11:17 --v 7 --style raw --s 200
```

**Record** · Job: · Notes:

### A3. Lock scene sref

- [ ] Pick 1–3 scenic winners (A1+A2 mix OK as multi-sref)  
- [ ] **`{{SREF_STYLE}}` =** _______________  
- [ ] Pin **only** on Phase C / cover / dedication  

---

## Phase B — Character locks

**Always pin / include `{{SREF_CHAR}}`.**  
**Never pin `{{SREF_STYLE}}`.**  
**Pin oref only when the step says.**  
Order: **B1a face → B1b full crown**, then quiet / kai / walk / cast.

---

### B1a. `{{OREF_CROWN_FACE}}` — bark face close-up

**UI:** pin `{{SREF_CHAR}}` only · no oref  
**OK for face to be large** (this plate is the face lock).

```text
Character face lock, upper trunk only of a living Ceiba. Large clearly visible gentle face in the bark filling the center of the frame: two wise kind eyes, soft brows, small patient smile, nose suggested in wood grain. Face obviously readable as a kind tree spirit, child-safe, not scary, not a sticker mask — features formed from bark and moss. Pale grey-green bark, soft moss. Pure flat pure white background, isolated subject only, empty white void, no scenery. Detailed atmospheric watercolor character design, fine natural texture. No full tree roots-to-crown, no tiny distant face, no jungle, no mist bands, no ground. No text, no letters --sref {{SREF_CHAR}} --sw 100 --ar 11:17 --v 7 --style raw --s 50 --no background, scenery, landscape, jungle, forest, mist, fog, ground, grass, water, spring, sky, clouds, environment, floor, vignette, gradient, text, letters
```

**Record** · Local: `images/hai/reference/hai-face-mj-________.jpg` · **`{{OREF_CROWN_FACE}}` =** · Done: [ ]

---

### B1b. `{{OREF_CROWN}}` — full tall thin rooted Ceiba

**UI:** pin `{{SREF_CHAR}}` + Omni `{{OREF_CROWN_FACE}}`

```text
Character reference sheet on pure flat pure white background, isolated subject only, empty white void, no scenery. Single tall slender Ceiba pentandra kapok tree centered, towering emergent rainforest tree, very tall slender straight bole, long narrow columnar trunk, height many times greater than width, high umbrella canopy only at the top of a long clean shaft, small buttress fins only at the base, graceful vertical silhouette like a real wild Central American ceiba, botanical proportions. Wide establishing shot, full tree from a distance, thin vertical form, generous empty white space around it. Tiny gentle bark face high on the upper trunk matching the omni reference face — wise kind eyes and patient smile — no larger than a wood knot, small detail only, does not widen the trunk. Pale grey-green bark, soft moss. Detailed atmospheric watercolor character design, fine natural texture. No ground, no grass, no spring, no water, no mist, no sky gradient, no jungle. No squat tree, no stout trunk, no fat trunk, no short tree, no dumpy tree, no barrel trunk, no baobab, no oak, no huge face, no face close-up. No text, no letters --sref {{SREF_CHAR}} --sw 100 --ow 50 --ar 11:17 --v 7 --style raw --s 50 --no background, scenery, landscape, jungle, forest, mist, fog, ground, grass, water, spring, sky, clouds, mountains, environment, floor, vignette, gradient, squat tree, stout trunk, fat trunk, short tree, dumpy, barrel trunk, baobab, oak, large face, close-up face, text, letters
```

Still fat/big-faced → `--ow 40`. Face gone → `--ow 70`. Scenery creeps → confirm sref is **CHAR not STYLE**, or `--sw 70`.

**Record** · Local: `images/hai/reference/hai-main-mj-________.jpg` · **`{{OREF_CROWN}}` =** · Done: [ ]

---

### B2. `{{OREF_QUIET}}` — tall Ceiba, no face

**UI:** pin `{{SREF_CHAR}}` + Omni `{{OREF_CROWN}}` (silhouette)

```text
Character landmark reference sheet on pure flat pure white background, isolated subject only, empty white void, no scenery. Same vast tall slender Ceiba as the crown lock — identical long narrow columnar trunk, high umbrella canopy, small buttress fins, botanical emergent proportions — but no face in the trunk; upper wood peaceful, still, empty of features, as if the kind spirit stepped away. Full tree roots to crown, centered, thin vertical silhouette, generous white space. Pale grey-green bark, soft moss. Detailed atmospheric watercolor, fine natural texture. Calm, waiting, not lifeless. No face, no hollow horror, no ground, no spring, no mist, no jungle. No squat tree, no fat trunk. No text, no letters --sref {{SREF_CHAR}} --sw 100 --ow 80 --ar 11:17 --v 7 --style raw --s 50 --no face, facial features, eyes, mouth, background, scenery, landscape, jungle, forest, mist, fog, ground, grass, water, spring, sky, clouds, environment, floor, vignette, gradient, squat tree, stout trunk, fat trunk, short tree, dumpy, barrel trunk, baobab, oak, text, letters
```

**Record** · Local: `images/hai/reference/hai-empty-mj-________.jpg` · **`{{OREF_QUIET}}` =** · Done: [ ]

---

### B3a. `{{OREF_KAI_FACE}}` — optional

**UI:** pin `{{SREF_CHAR}}` only

```text
Character face lock on pure flat pure white background, isolated subject only, empty white void. Close-up of Kai the living Ceiba seed-pod face: wise kind eyes, patient seed-smile, soft green-brown pod hull, tiny kapok wisp or sprout-tuft at top of frame. Readable, humble, child-safe, not cute-flat, not scary. Detailed atmospheric watercolor, fine natural texture. No full body required. No scenery. No text, no letters --sref {{SREF_CHAR}} --sw 100 --ar 11:17 --v 7 --style raw --s 50 --no background, scenery, landscape, jungle, mist, ground, water, environment, vignette, gradient, text, letters
```

**Record** · **`{{OREF_KAI_FACE}}` =** · Done: [ ] / skip

---

### B3b. `{{OREF_KAI}}` — full Kai

**UI:** pin `{{SREF_CHAR}}` + optional Omni `{{OREF_KAI_FACE}}`

```text
Character reference sheet on pure flat pure white background, isolated subject only, empty white void, no scenery. Kai: small living walking Ceiba kapok seed-pod creature, child-animal scale, full body centered standing. Oblong warm hull soft green-brown to light bark tone, gentle pod ridges, tiny sturdy root-feet, soft kapok-silk wisp and tiny green sprout-tuft on top, simple friendly face with wise kind eyes and patient seed-smile, tiny arm-like rootlets. Clearly a friendly kapok pod. Kind, humble, endearing — not cute-flat, not scary. Detailed atmospheric watercolor character design, fine natural texture. No ground plane, no garden, no jungle, no mist. No text, no letters --sref {{SREF_CHAR}} --sw 100 --ow 100 --ar 11:17 --v 7 --style raw --s 50 --no background, scenery, landscape, jungle, forest, mist, fog, ground, grass, water, garden, vines, environment, floor, vignette, gradient, text, letters
```

(No face oref pinned → still fine; `--ow` ignored or remove if UI complains.)

**Record** · Local: `images/hai/reference/hai-seed-mj-________.jpg` · **`{{OREF_KAI}}` =** · Done: [ ]

---

### B4a. `{{OREF_WALK_FACE}}` — optional

**UI:** pin `{{SREF_CHAR}}` only

```text
Character face lock on pure flat pure white background, isolated subject only, empty white void. Close-up gentle bark face of walking tall Ceiba spirit: warm wise eyes, soft brows, patient almost-smile, grey-green bark skin, soft moss, meetable kind expression, child-safe not scary Ent. Detailed atmospheric watercolor, fine natural texture. No full body. No scenery. No text, no letters --sref {{SREF_CHAR}} --sw 100 --ar 11:17 --v 7 --style raw --s 50 --no background, scenery, landscape, jungle, mist, ground, environment, vignette, gradient, scary face, monster, text, letters
```

**Record** · **`{{OREF_WALK_FACE}}` =** · Done: [ ] / skip

---

### B4b. `{{OREF_WALK}}` — full walking tall Ceiba

**UI:** pin `{{SREF_CHAR}}` + Omni `{{OREF_WALK_FACE}}` or `{{OREF_CROWN_FACE}}`

```text
Character reference sheet on pure flat pure white background, isolated subject only, empty white void, no scenery. Lord Ikthiss as a living walking tall Ceiba: tall slender proportions, long kind limb-branches of living wood, long narrow grey-green bark body, fine grain and soft moss, deep buttress-root feet that can step slowly, leaf-and-soft-kapok crown, warm wise eyes in a gentle bark face at meetable height — face readable but not huge, not a headshot. Canopy leaf mass suggests height and shelter; posture open and inviting, never looming. Full figure standing, centered, clear kind tall thin Ceiba silhouette, generous white space. Quiet grandeur, wonder without fright. Child-safe. Detailed atmospheric watercolor, fine natural texture. No scary Ent face, no claws, no squat bulky golem body. No ground, no jungle, no mist. No text, no letters --sref {{SREF_CHAR}} --sw 100 --ow 50 --ar 11:17 --v 7 --style raw --s 50 --no background, scenery, landscape, jungle, forest, mist, fog, ground, grass, water, environment, floor, vignette, gradient, squat, stout, fat trunk, bulky, golem, monster, large face, close-up face, scary Ent, text, letters
```

**Bridge pose** (pin `{{SREF_CHAR}}` + Omni `{{OREF_WALK}}`):

```text
Same walking tall slender Ceiba character on pure flat pure white background, isolated subject only, empty white void. Bent like a gentle bridge, one great kind wooden hand open low inviting a small friend. Kind meetable face, never scary. Full figure. Detailed atmospheric watercolor, fine natural texture. No scenery. No text, no letters --sref {{SREF_CHAR}} --sw 100 --ow 120 --ar 11:17 --v 7 --style raw --s 50 --no background, scenery, landscape, jungle, mist, ground, environment, vignette, gradient, scary Ent, monster, text, letters
```

**Record** · Local: `images/hai/reference/hai-walk-mj-________.jpg` · **`{{OREF_WALK}}` =** · Bridge: · Done: [ ]

---

### B5. `{{OREF_PIP}}`

**UI:** pin `{{SREF_CHAR}}` only

```text
Character reference sheet on pure flat pure white background, isolated subject only, empty white void, no scenery. Pip: small young nine-banded armadillo, Dasypus novemcinctus, soft armor bands, warm brown-grey shell, expressive gentle eyes, small ears, kind child-safe face. Standing three-quarter view, full body centered, readable silhouette. Innocent children’s book animal, not realistic-scary, not cute-flat cartoon. Detailed atmospheric watercolor, fine natural texture. No ground, no garden. No text, no letters --sref {{SREF_CHAR}} --sw 100 --ar 11:17 --v 7 --style raw --s 50 --no background, scenery, landscape, jungle, forest, mist, ground, grass, environment, floor, vignette, gradient, text, letters
```

**Record** · **`{{OREF_PIP}}` =** · Done: [ ]

---

### B6. `{{OREF_MACAW}}`

**UI:** pin `{{SREF_CHAR}}` only

```text
Character reference sheet on pure flat pure white background, isolated subject only, empty white void, no scenery. Scarlet macaw, brilliant red yellow blue plumage, long elegant tail, grand but not mean expression, proud not cruel. Full body perched or standing, centered, fine feather texture. Minimal perch only if needed. Child-safe. Detailed atmospheric watercolor, fine natural texture. No jungle. No text, no letters --sref {{SREF_CHAR}} --sw 100 --ar 11:17 --v 7 --style raw --s 50 --no background, scenery, landscape, jungle, forest, mist, ground, environment, floor, vignette, gradient, text, letters
```

**Record** · **`{{OREF_MACAW}}` =** · Done: [ ]

---

### B7. `{{OREF_OWL}}`

**UI:** pin `{{SREF_CHAR}}` only

```text
Character reference sheet on pure flat pure white background, isolated subject only, empty white void, no scenery. Very old spectacled owl, plain soft feathers, pale facial discs like spectacles, round wise gentle face, slow soft dignity. Full body, centered. Child-safe, humble, not scary night-horror. Detailed atmospheric watercolor, fine natural texture. No text, no letters --sref {{SREF_CHAR}} --sw 100 --ar 11:17 --v 7 --style raw --s 50 --no background, scenery, landscape, jungle, mist, ground, environment, vignette, gradient, scary owl, horror, text, letters
```

**Record** · **`{{OREF_OWL}}` =** · Done: [ ]

---

### B8. `{{OREF_HOWLER}}`

**UI:** pin `{{SREF_CHAR}}` only

```text
Character reference sheet on pure flat pure white background, isolated subject only, empty white void, no scenery. Howler monkey, rich coat, expressive face mid cheerful proud call, never ferocious, never teeth-bared aggression. Full body, centered, child-safe. Detailed atmospheric watercolor, fine natural texture. No text, no letters --sref {{SREF_CHAR}} --sw 100 --ar 11:17 --v 7 --style raw --s 50 --no background, scenery, landscape, jungle, mist, ground, environment, vignette, gradient, ferocious, fangs, aggression, text, letters
```

**Record** · **`{{OREF_HOWLER}}` =** · Done: [ ]

---

### B9. `{{OREF_TAPIR}}`

**UI:** pin `{{SREF_CHAR}}` only

```text
Character reference sheet on pure flat pure white background, isolated subject only, empty white void, no scenery. Sturdy Baird’s tapir, solid gentle body, short flexible trunk-nose, kind calm eyes, bowing-ready posture. Full body, centered. Child-safe. Detailed atmospheric watercolor, fine natural texture. No text, no letters --sref {{SREF_CHAR}} --sw 100 --ar 11:17 --v 7 --style raw --s 50 --no background, scenery, landscape, jungle, mist, ground, environment, vignette, gradient, text, letters
```

**Record** · **`{{OREF_TAPIR}}` =** · Done: [ ]

---

### B10. `{{OREF_TOUCAN}}`

**UI:** pin `{{SREF_CHAR}}` only

```text
Character reference sheet on pure flat pure white background, isolated subject only, empty white void, no scenery. Keel-billed toucan, bright multicolor bill, bright eye, open bill in grand joyful praise-call — never gothic, never omen-dark. Full body, centered, minimal perch ok. Child-safe. Detailed atmospheric watercolor, fine natural texture. No text, no letters --sref {{SREF_CHAR}} --sw 100 --ar 11:17 --v 7 --style raw --s 50 --no background, scenery, landscape, jungle, mist, ground, environment, vignette, gradient, gothic, omen, scary, text, letters
```

**Record** · **`{{OREF_TOUCAN}}` =** · Done: [ ]

---

### B11. `{{OREF_COATI}}` (optional)

**UI:** pin `{{SREF_CHAR}}` only

```text
Character reference sheet on pure flat pure white background, isolated subject only, empty white void, no scenery. Coati, sleek body, long snout, ringed tail, sharp-eyed slightly muttering expression, still child-safe not villainous. Full body, centered. Detailed atmospheric watercolor, fine natural texture. No text, no letters --sref {{SREF_CHAR}} --sw 100 --ar 11:17 --v 7 --style raw --s 50 --no background, scenery, landscape, jungle, mist, ground, environment, vignette, gradient, text, letters
```

**Record** · **`{{OREF_COATI}}` =** · Done: [ ] / skip

---

### B12. `{{OREF_AGOUTI}}` (optional)

**UI:** pin `{{SREF_CHAR}}` only

```text
Character reference sheet on pure flat pure white background, isolated subject only, empty white void, no scenery. Agouti, small quick warm brown-orange coat, demanding but not scary expression, child-safe. Full body, centered. Detailed atmospheric watercolor, fine natural texture. No text, no letters --sref {{SREF_CHAR}} --sw 100 --ar 11:17 --v 7 --style raw --s 50 --no background, scenery, landscape, jungle, mist, ground, environment, vignette, gradient, text, letters
```

**Record** · **`{{OREF_AGOUTI}}` =** · Done: [ ] / skip

---

### B13. Multi-cast plate (optional)

**UI:** pin `{{SREF_CHAR}}` only

```text
Character reference sheet on pure flat pure white background, isolated subjects only, empty white void, no scenery. Multiple figures spaced clearly left to right equal standing: Pip nine-banded armadillo; old spectacled owl; scarlet macaw; howler monkey; Baird’s tapir. Each full body, child-safe, consistent watercolor design, no overlapping mess. No jungle, no ground texture. No text, no letters, no name tags --sref {{SREF_CHAR}} --sw 100 --ar 11:17 --v 7 --style raw --s 50 --no background, scenery, landscape, jungle, mist, ground, environment, vignette, gradient, labels, text, letters
```

**Record** · Multi-cast URL: · Done: [ ] / skip

---

### Phase B gate

- [ ] All locks used **`{{SREF_CHAR}}`**, never scenic sref  
- [ ] White void holds; medium matches book  
- [ ] CROWN tall thin + tiny face; QUIET / KAI / WALK / cast done  
- [ ] Heart continuity face → forms  

---

## Phase C — Story pages

**Always pin `{{SREF_STYLE}}` + listed oref.**  
Pastes include `--sw 120` and `--ow …`.  
Order: Cover → p1–p9 → Dedication → p10–p17 → p18–p26.

If crown/walk goes fat in a scene: add geometry line mentally already in pastes; drop `--ow` to 80.

---

### Cover

**Pin:** `{{SREF_STYLE}}` + `{{OREF_CROWN}}`

```text
Children’s picture book cover, portrait. Detailed atmospheric watercolor, fine natural texture; soft distant vapor-mist, clearer near detail. Living-jungle palette. Central: Lord Hai Ikthiss as a vast kind living tall slender Ceiba — long narrow columnar trunk, high umbrella canopy, small buttresses, botanical emergent proportions — gentle tiny bark face high on upper trunk no larger than a wood knot, wise kind eyes, canopy like open hands, roots by a bright spring. Quiet care not pride. Small highland-valley creatures far below look up through layered mist. Glowing jungle pool, canopy slopes, soft far ridges. Soft open band near top or bottom for title overlay later — no lettering in image. Quiet grandeur. No squat fat tree, no huge face, no cartoon outlines, no harsh darkness, no buildings, no ruins, no temples. No text, no letters, no logos --sref {{SREF_STYLE}} --sw 120 --ow 100 --ar 11:17 --v 7 --style raw --s 120 --no squat tree, fat trunk, large face, temples, ruins, text, letters
```

**Record** · Local: `images/hai/cover-mj-________.jpg` · Done: [ ]

---

### Dedication

**Pin:** `{{SREF_STYLE}}` only · **no oref**

```text
Almost blank warm cream page, delicate atmospheric watercolor wash. Centre bottom only: three tiny green sprouts beside a single drop of clear water and a small smooth fish-shaped glint of light — very subtle. Very minimal, generous open space above for dedication text overlay. Soft morning mist-light. Delicate ferns and Ceiba leaves at edges only. Optional tiny soft Ceiba silhouette far in cool mist, very small. No buildings. No text, no letters, no numbers --sref {{SREF_STYLE}} --sw 80 --ar 11:17 --v 7 --style raw --s 80 --no text, letters, numbers, buildings, large tree filling frame
```

**Record** · Local: `images/hai/dedication-mj-________.jpg` · Done: [ ]

---

### Page 1

**Pin:** `{{SREF_STYLE}}` + `{{OREF_CROWN}}`

```text
Chapter-opening illustration, no lettering. Soft cream ground with atmospheric watercolor depth. Large characterful living tall slender Ceiba dominates the upper portion — long narrow trunk, high canopy, botanical proportions — kind tiny bark face high in trunk, palmate leaves filtering warm early-morning gold; cool vapor-mist at far canopy edge. Below, small valley creatures look upward with bright praise. Clear spring rings buttress roots. Soft ridges beyond. Peaceful, high, slightly lonely quiet grandeur. Clear lower area for text overlay. No squat fat tree, no huge face. No cartoon outlines. No buildings. No text, no letters, no numbers, no titles --sref {{SREF_STYLE}} --sw 120 --ow 100 --ar 11:17 --v 7 --style raw --s 120 --no text, letters, titles, squat tree, large face, buildings
```

**Record** · Local: `images/hai/page-1-mj-________.jpg` · Done: [ ]

---

### Page 2

**Pin:** `{{SREF_STYLE}}` + `{{OREF_CROWN}}`

```text
Detailed atmospheric watercolor children’s illustration. Dawn over a young highland valley in layered vapor-mist. Hai Ikthiss a single tall slender living Ceiba, long narrow bole, high canopy, gentle tiny bark face high in trunk, alone at first, buttress roots drinking a bright new spring — fine near bark and water, soft ridges dissolving into mist. Soft first grasses and one small bird arriving. Warm gold on canopy. Text space clear in lower 40%. Quiet creation mood. No squat fat tree, no huge face. No cartoon outlines, no harsh darkness, no buildings. No text, no letters --sref {{SREF_STYLE}} --sw 120 --ow 100 --ar 11:17 --v 7 --style raw --s 120 --no text, letters, squat tree, large face, buildings
```

**Record** · Local: `images/hai/page-2-mj-________.jpg` · Done: [ ]

---

### Page 3

**Pin:** `{{SREF_STYLE}}` + `{{OREF_CROWN}}` · Alt oref: `{{OREF_HOWLER}}`

```text
Gentle storytelling scene in detailed atmospheric watercolor. Hai Ikthiss tall slender living Ceiba high above through layered canopy. Proud howler monkey leads a cheer at the roots, bright loud call, rich coat, never ferocious. Other small jungle creatures join praise. Hai’s kind tiny face above them, softly unseen in bark and leaf-shadow. Clear spring and ferny forest floor; warm gold on high leaves, cool mist understory. Height and missed connection. Text space about 40% bottom. Child-safe. No buildings. No text, no letters --sref {{SREF_STYLE}} --sw 120 --ow 100 --ar 11:17 --v 7 --style raw --s 120 --no text, letters, buildings, ferocious, large face, squat tree
```

**Record** · Local: `images/hai/page-3-mj-________.jpg` · Done: [ ]

---

### Page 4

**Pin:** `{{SREF_STYLE}}` + `{{OREF_CROWN}}` · Alt: `{{OREF_TAPIR}}`

```text
Warm earthy scene in detailed atmospheric watercolor. Sturdy Baird’s tapir with gentle trunk-nose bows toward great buttress trunk of tall slender Hai Ikthiss. Other animals copy the bow toward bark and shade — fine bark grain, leaf litter, mossy stone foreground. Tree’s gentle tiny face high above looks kind and a little alone through soft canopy mist. Gold-and-cool understory light. Text space about 40% bottom. No buildings. No text, no letters --sref {{SREF_STYLE}} --sw 120 --ow 100 --ar 11:17 --v 7 --style raw --s 120 --no text, letters, buildings, squat tree, large face
```

**Record** · Local: `images/hai/page-4-mj-________.jpg` · Done: [ ]

---

### Page 5

**Pin:** `{{SREF_STYLE}}` + `{{OREF_CROWN}}` · Alt: `{{OREF_TOUCAN}}`

```text
Emotional but safe illustration in detailed atmospheric watercolor. Hai Ikthiss tall slender Ceiba with soft cool hollow-glow near upper trunk — subtle, internal, not scary, not a wound. Keel-billed toucan mid-canopy, bright eye, open bill grand praise-call — never gothic or omen-dark. Animals below cheering. Warm outer leaves, cooler quiet light at hollow. Text area bottom 40%. Lonely grandeur without darkness. No cartoon outlines. No buildings. No text, no letters --sref {{SREF_STYLE}} --sw 120 --ow 100 --ar 11:17 --v 7 --style raw --s 120 --no text, letters, buildings, gothic, wound, blood, large face, squat tree
```

**Record** · Local: `images/hai/page-5-mj-________.jpg` · Done: [ ]

---

### Page 6

**Pin:** `{{SREF_STYLE}}` + `{{OREF_CROWN}}`

```text
Quiet turning-point scene in detailed atmospheric watercolor. Hai Ikthiss tall slender living Ceiba still and kind, one long root or low branch gently reaching toward clear spring and soft leaf litter — visual hook of connection; fine water and buttress texture near, soft misted jungle beyond. Animals praising softly in distance, unnoticed. Warm understanding mood. Text space about 40% bottom. No anger. Child-safe. No buildings. No text, no letters --sref {{SREF_STYLE}} --sw 120 --ow 100 --ar 11:17 --v 7 --style raw --s 120 --no text, letters, buildings, anger, large face, squat tree
```

**Record** · Local: `images/hai/page-6-mj-________.jpg` · Done: [ ]

---

### Page 7

**Pin:** `{{SREF_STYLE}}` + `{{OREF_CROWN}}`

```text
Beautiful quiet night scene in detailed atmospheric watercolor. Hai Ikthiss tall slender Ceiba under deep starry sky over highland valley, canopy holding soft silver starlight; cool blues, mist grey, silver leaf-light. Peaceful accepting bark-face, tiny and high. Internal hollow now warmer, watered, almost glowing — gentle not eerie. Deep calm. Text space about 40% bottom. Gentle night wonder not scary darkness. No buildings. No text, no letters --sref {{SREF_STYLE}} --sw 120 --ow 100 --ar 11:17 --v 7 --style raw --s 120 --no text, letters, buildings, horror, large face, squat tree
```

**Record** · Local: `images/hai/page-7-mj-________.jpg` · Done: [ ]

---

### Page 8

**Pin:** `{{SREF_STYLE}}` + `{{OREF_CROWN}}`

```text
Bright fresh morning in detailed atmospheric watercolor. Hai Ikthiss tall slender Ceiba with soft gold light in his tiny high face, looking down the long trunk toward the ground with gentle resolve. Howler monkey and Baird’s tapir soft in misted background still cheering without looking into his eyes. Spring bright at buttress roots; canopy slopes beyond. Hopeful quiet self-understanding. Text space about 40% bottom. No buildings. No text, no letters --sref {{SREF_STYLE}} --sw 120 --ow 100 --ar 11:17 --v 7 --style raw --s 120 --no text, letters, buildings, large face, squat tree
```

**Record** · Local: `images/hai/page-8-mj-________.jpg` · Done: [ ]

---

### Page 9

**Pin:** `{{SREF_STYLE}}` + `{{OREF_CROWN}}`

```text
Warm chapter-closing scene in detailed atmospheric watercolor. Hai Ikthiss tall slender living Ceiba sending visible soft streams of clear water and gentle light down to tiny ferns and small animals at roots — fine leaf and water near, soft golden afternoon valley beyond. Peaceful satisfied tree-smile. Soft vignette optional. Generous text space about 50% bottom. No blood, only clear water and light. No buildings. No text, no letters --sref {{SREF_STYLE}} --sw 120 --ow 100 --ar 11:17 --v 7 --style raw --s 120 --no text, letters, buildings, blood, wounds, large face, squat tree
```

**Record** · Local: `images/hai/page-9-mj-________.jpg` · Done: [ ]

---

### Page 10

**Pin:** `{{SREF_STYLE}}` + `{{OREF_KAI}}`

```text
Simple chapter-opening illustration, no lettering. Soft cream background with warm atmospheric watercolor wash. Centre: small living walking Ceiba seed-pod creature — oblong warm hull, tiny root-feet, kapok wisp or sprout-tuft, gentle patient face — standing at foot of great tall slender Ceiba rising into misted canopy, high face gone quiet, no face in upper wood. Fine texture on pod and bark; soft green, cream, bark grey-green; hint of fern and moss. Calm transitional mood. Clear lower area for text overlay. No buildings. No text, no letters, no numbers, no titles --sref {{SREF_STYLE}} --sw 120 --ow 120 --ar 11:17 --v 7 --style raw --s 120 --no text, letters, titles, numbers, buildings
```

**Record** · Local: `images/hai/page-10-mj-________.jpg` · Done: [ ]

---

### Page 11

**Pin:** `{{SREF_STYLE}}` + `{{OREF_KAI}}`

```text
Cheerful sunny morning jungle forest-floor garden at roots of tall Ceiba. Detailed atmospheric watercolor. Tall slender Ceiba upper portion — canopy full, high face gone quiet, soft mist in upper leaves. Below, Kai small living walking Ceiba seed-pod, oblong warm hull, kapok wisp, friendly face, tiny root-feet, among healthy cantaloupe rockmelon vines, fern edges, root beds, leaf litter. Warm early light through leaves. Gentle wonder. Text space about 40% bottom. No cartoon outlines. No buildings. No text, no letters --sref {{SREF_STYLE}} --sw 120 --ow 120 --ar 11:17 --v 7 --style raw --s 120 --no text, letters, buildings
```

**Record** · Local: `images/hai/page-11-mj-________.jpg` · Done: [ ]

---

### Page 12

**Pin:** `{{SREF_STYLE}}` + `{{OREF_PIP}}` · Alt: `{{OREF_KAI}}`

```text
Soft dynamic moment in detailed atmospheric watercolor. Small young nine-banded armadillo Pip horrified mid-step. Big cantaloupe rockmelon smashed open at Kai’s feet, juice and seeds — fine wet texture, not messy-scary. Kai small living walking Ceiba seed-pod, kind steady face, tiny root-feet. Jungle forest-floor garden, root beds, ferns, leaf litter. Mild gentle disaster. Text space about 40% bottom. Child-safe. No buildings. No text, no letters --sref {{SREF_STYLE}} --sw 120 --ow 120 --ar 11:17 --v 7 --style raw --s 120 --no text, letters, buildings, gore
```

**Record** · Local: `images/hai/page-12-mj-________.jpg` · Done: [ ]

---

### Page 13

**Pin:** `{{SREF_STYLE}}` + `{{OREF_KAI}}` · Alt: `{{OREF_PIP}}`

```text
Emotional group scene in detailed atmospheric watercolor. Pip nine-banded armadillo curled a little in fear and shame. Kai small living walking Ceiba-pod standing still, kind concerned face. Background coati with ringed tail and agouti looking judgmental, softened by shallow depth and jungle mist. Soft light on Kai and Pip. Text space about 40% bottom. Innocent tone. No harsh darkness. No buildings. No text, no letters --sref {{SREF_STYLE}} --sw 120 --ow 120 --ar 11:17 --v 7 --style raw --s 120 --no text, letters, buildings, harsh darkness
```

**Record** · Local: `images/hai/page-13-mj-________.jpg` · Done: [ ]

---

### Page 14

**Pin:** `{{SREF_STYLE}}` + `{{OREF_KAI}}`

```text
Key emotional turning-point in detailed atmospheric watercolor. Kai small living walking Ceiba pod kneeling, offering digging stick toward Pip nine-banded armadillo with open kind body language. Pip slowly uncurling, hope in eyes. Broken melon visible but not centre. Soft hopeful gold through leaves; fine leaf litter. Tall Ceiba watches in misted background, face gone quiet. Text space about 40% bottom. No cartoon outlines. No buildings. No text, no letters --sref {{SREF_STYLE}} --sw 120 --ow 120 --ar 11:17 --v 7 --style raw --s 120 --no text, letters, buildings
```

**Record** · Local: `images/hai/page-14-mj-________.jpg` · Done: [ ]

---

### Page 15

**Pin:** `{{SREF_STYLE}}` + `{{OREF_KAI}}`

```text
Warm working-together scene in detailed atmospheric watercolor. Kai living walking Ceiba pod and Pip nine-banded armadillo side-by-side planting seeds, watering with a leaf, building tiny twig fence. Soft smiles. Soft afternoon light, rich leaf litter, first green shoots; soft jungle depth. Friendship and quiet repair. Text space about 40% bottom. Child-safe. No buildings. No text, no letters --sref {{SREF_STYLE}} --sw 120 --ow 120 --ar 11:17 --v 7 --style raw --s 120 --no text, letters, buildings
```

**Record** · Local: `images/hai/page-15-mj-________.jpg` · Done: [ ]

---

### Page 16

**Pin:** `{{SREF_STYLE}}` + `{{OREF_PIP}}` · Alt: `{{OREF_KAI}}`

```text
Gentle time-passing scene in detailed atmospheric watercolor. Pip nine-banded armadillo happily watering thriving new melon vines with leaf bucket. Kai living walking Ceiba pod nearby, quiet pride. Soft sense of days passed. Warm greens and moss; forest-floor garden; tall quiet Ceiba soft above in haze. Text space about 45% bottom. Quiet hopeful. No buildings. No text, no letters --sref {{SREF_STYLE}} --sw 120 --ow 120 --ar 11:17 --v 7 --style raw --s 120 --no text, letters, buildings
```

**Record** · Local: `images/hai/page-16-mj-________.jpg` · Done: [ ]

---

### Page 17

**Pin:** `{{SREF_STYLE}}` + `{{OREF_KAI}}`

```text
Beautiful chapter-closing illustration in detailed atmospheric watercolor. Kai humble living walking Ceiba pod and Pip nine-banded armadillo sitting beside thriving melon plants in jungle forest-floor garden. Third small jungle creature happily included after a small accident. Soft golden-hour light, layered mist, soft far ridges. Community and healed belonging. Tall Ceiba above peaceful, face gone quiet. Soft vignette optional. Text space about 50% bottom. No buildings. No text, no letters --sref {{SREF_STYLE}} --sw 120 --ow 120 --ar 11:17 --v 7 --style raw --s 120 --no text, letters, buildings
```

**Record** · Local: `images/hai/page-17-mj-________.jpg` · Done: [ ]

---

### Page 18

**Pin:** `{{SREF_STYLE}}` + `{{OREF_WALK}}`

```text
Chapter opening illustration, no lettering. Soft cream ground with atmospheric watercolor depth. Centre: living walking tall slender Ceiba, gentle kind form never scary, offering both hands downward to lift not push. Long limb-branches, meetable face, not a squat golem. Small jungle creatures at base unsure, half praise half fear. Soft leaves, buttress roots, quiet jungle mist. Wonder without fright. Clear lower area for text overlay. No harsh darkness, no scary faces, no buildings. No text, no letters, no numbers, no titles --sref {{SREF_STYLE}} --sw 120 --ow 100 --ar 11:17 --v 7 --style raw --s 120 --no text, letters, titles, scary Ent, monster, squat golem, buildings
```

**Record** · Local: `images/hai/page-18-mj-________.jpg` · Done: [ ]

---

### Page 19

**Pin:** `{{SREF_STYLE}}` + `{{OREF_CROWN}}`

```text
Evening by tall slender Ceiba in detailed atmospheric watercolor. Golden-hour on Hai Ikthiss returned to crown — kind tiny face high again; warm gold on high canopy, cooler mist at roots. At roots small animals cluster and whisper, worried eyes instead of cheers. Tender sad misunderstanding. Text space about 40% bottom. Child-safe. No buildings. No text, no letters --sref {{SREF_STYLE}} --sw 120 --ow 100 --ar 11:17 --v 7 --style raw --s 120 --no text, letters, buildings, large face, squat tree
```

**Record** · Local: `images/hai/page-19-mj-________.jpg` · Done: [ ]

---

### Page 20

**Pin:** `{{SREF_STYLE}}` + `{{OREF_MACAW}}` · Alt: `{{OREF_CROWN}}`

```text
Scene under tall slender Ceiba in detailed atmospheric watercolor. Handsome scarlet macaw spectacular long tail red-yellow-blue plumage mid-height, chest out, speaking grand caution — fine feather texture. Small animals nodding. Hai Ikthiss high above rooted living Ceiba, kind and still, not angry, softened by canopy mist. Soft layered light. Fear-as-status storytelling. Text space about 40% bottom. No cartoon outlines. No buildings. No text, no letters --sref {{SREF_STYLE}} --sw 120 --ow 120 --ar 11:17 --v 7 --style raw --s 120 --no text, letters, buildings
```

**Record** · Local: `images/hai/page-20-mj-________.jpg` · Done: [ ]

---

### Page 21

**Pin:** `{{SREF_STYLE}}` + `{{OREF_OWL}}`

```text
Quiet contrast scene in detailed atmospheric watercolor. Humble old spectacled owl plain soft feathers pale facial discs round wise face speaking softly toward great tall slender Ceiba — fine feather and bark texture. Hai Ikthiss listening with open attention in high rooted-crown face. Some animals turning away toward flashy scarlet macaw in soft misted background. Gentle dignified tender mood. Cool understory light. Text space about 40% bottom. No buildings. No text, no letters --sref {{SREF_STYLE}} --sw 120 --ow 120 --ar 11:17 --v 7 --style raw --s 120 --no text, letters, buildings, horror
```

**Record** · Local: `images/hai/page-21-mj-________.jpg` · Done: [ ]

---

### Page 22

**Pin:** `{{SREF_STYLE}}` + `{{OREF_WALK}}`

```text
Wonder scene in detailed atmospheric watercolor. Hai Ikthiss transforming gently from rooted Ceiba into living walking tall slender Ceiba: long kind limb-branches, bark skin fine grain, leaf-and-soft-kapok crown, buttress-root feet, warm eyes at height animals can face — never scary. Fully mobile walking tree, not half-stuck, not squat golem. Soft non-scary wonder; creatures gasping but safe. Layered canopy light and mist. Text space about 40% bottom. No harsh darkness, no scary faces, no buildings, no Ent-monster. No text, no letters --sref {{SREF_STYLE}} --sw 120 --ow 100 --ar 11:17 --v 7 --style raw --s 120 --no text, letters, buildings, scary Ent, monster, squat golem, half-buried tree
```

**Record** · Local: `images/hai/page-22-mj-________.jpg` · Done: [ ]

---

### Page 23

**Pin:** `{{SREF_STYLE}}` + `{{OREF_WALK}}` · Alt: `{{OREF_PIP}}`

```text
Lovely generous scene in detailed atmospheric watercolor. Hai Ikthiss gentle walking tall slender Ceiba bending like a bridge, one great kind hand open low for Pip nine-banded armadillo. Pip unafraid stepping forward. Other animals half-hid among roots and mist. Soft gold god-rays through leaves. Invitation and true seeing. Text space about 40% bottom. Child-safe kind wonder. No buildings. No text, no letters --sref {{SREF_STYLE}} --sw 120 --ow 100 --ar 11:17 --v 7 --style raw --s 120 --no text, letters, buildings, scary Ent
```

**Record** · Local: `images/hai/page-23-mj-________.jpg` · Done: [ ]

---

### Page 24

**Pin:** `{{SREF_STYLE}}` + `{{OREF_WALK}}`

```text
Hopeful wondrous group scene in detailed atmospheric watercolor. Hai Ikthiss kind walking tall slender Ceiba lifting friends: Pip nine-banded armadillo, old spectacled owl, other valley creatures rising beside him as gentle giants with joyful not scary faces — same animals, shared height, eyes level with far ridges. Soft bright morning light, highland valley opening to soft far ridges. Shared wonder not domination. Text space about 40% bottom. Child-safe. No buildings. No text, no letters --sref {{SREF_STYLE}} --sw 120 --ow 100 --ar 11:17 --v 7 --style raw --s 120 --no text, letters, buildings, scary giants, monster
```

**Record** · Local: `images/hai/page-24-mj-________.jpg` · Done: [ ]

---

### Page 25

**Pin:** `{{SREF_STYLE}}` + `{{OREF_WALK}}`

```text
Beautiful final story page in detailed atmospheric watercolor. Hai Ikthiss kind walking tall slender Ceiba and giant animal friends on high ridge at golden hour beside tall rooted Ceiba landmark, looking over whole peaceful highland valley — jungle pool, melon garden at roots, canopy slopes, soft far ridges in mist. Open sky, freedom, quiet understanding. Warm height-gold, deep calm joy. Text space about 50% bottom. No harsh darkness. No buildings. No text, no letters --sref {{SREF_STYLE}} --sw 120 --ow 100 --ar 11:17 --v 7 --style raw --s 120 --no text, letters, buildings
```

**Record** · Local: `images/hai/page-25-mj-________.jpg` · Done: [ ]

---

### Page 26

**Pin:** `{{SREF_STYLE}}` + `{{OREF_WALK}}`

```text
Final endpaper-style illustration in detailed atmospheric watercolor. Wide gentle highland valley at peaceful dusk — layered canopy and Ceiba, spring and pool silver, soft far ridges into cool vapor-mist. Hai Ikthiss kind walking tall slender Ceiba among gentle giant friends on a soft rise — Pip, spectacled owl, scarlet macaw and others now as tall as he is, same height, walking among them as equals — small in vast landscape yet glowing with quiet presence. Soft stars beginning. Twilight lavender, soft gold, deep moss, bark grey-green, water turquoise-silver. Large open text area center about 40% height, landscape wrapped around, band simple for overlay. No lettering in image. No cartoon outlines, no harsh darkness, no buildings. No text, no letters --sref {{SREF_STYLE}} --sw 120 --ow 100 --ar 11:17 --v 7 --style raw --s 120 --no text, letters, buildings, scary giants
```

**Record** · Local: `images/hai/page-26-mj-________.jpg` · Done: [ ]

---

## Phase D — Export

1. [ ] Upscale · 1650×2550 JPEG  
2. [ ] `images/hai/` + `reference/` with `mj-{uuid}`  
3. [ ] Later one commit: `tall-tales.html` · `site.js` FILES · `book-text.html` PAGE_BG  

---

## Quick reference

| Job | sref | oref |
|-----|------|------|
| All Phase B locks | **`{{SREF_CHAR}}`** | as listed |
| Cover, p1–9, p19 | `{{SREF_STYLE}}` | CROWN |
| Dedication | `{{SREF_STYLE}}` | — |
| p10–11, 14–15, 17 | `{{SREF_STYLE}}` | KAI |
| p12, 16 | `{{SREF_STYLE}}` | PIP or KAI |
| p13 | `{{SREF_STYLE}}` | KAI or PIP |
| p18, 22–26 | `{{SREF_STYLE}}` | WALK |
| p20 | `{{SREF_STYLE}}` | MACAW or CROWN |
| p21 | `{{SREF_STYLE}}` | OWL |
| p3 / p4 / p23 | STYLE | CROWN/HOWLER · CROWN/TAPIR · WALK/PIP |

| Symptom | Fix |
|---------|-----|
| Lock has jungle | Wrong sref (use CHAR); or lower `--sw` |
| Lock has no watercolor | Raise `--sw` on CHAR; confirm A0 is real medium |
| Fat tree | Geometry + `--ow 40` + `--no baobab, squat…` |
| Huge face | `--ow 50` + wood-knot wording |
| No face | Face plate first; `--ow 70` |
| Web oref fails | Pin Omni in UI; keep `--ow` in paste |
| Two characters drift | Only one oref — primary; describe other |

---

## Session log

```text
{{SREF_CHAR}} =
{{SREF_STYLE}} =
{{OREF_CROWN_FACE}} =
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
```

---

*Canon story: `HaiIkthiss-ThreeTallTales.md`.*
