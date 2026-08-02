# Hai Ikthiss — MJ Viability Test

Minimal ordered prompt list to prove the MidJourney approach works before expanding to full book. **Run these 4 prompts in order.** Stop at step 4 — if it works, the rest of the book is repetition and gets written then. If it doesn't, almost no tokens spent and we know.

Source canon: `HaiIkthiss-ThreeTallTales.md` (art style + character descriptions = source of truth).
Interface: **midjourney.com** web Imagine bar.
Target: one locked character + one coherent page = viability proven.

**Paste rule:** each fenced block is one full Imagine paste (prompt + params). Replace `{{SREF_*}}` / `{{OREF_*}}` with the real image URLs you record as you go (or pin in the web UI and keep the `--sw` / `--ow` values from the paste).

---

## Decisions baked in (so you don't have to)

1. **SREF_STYLE = one of your existing approved scenic images.** You already have good style images — use one. Skip the runbook's Phase A1/A2.
2. **SREF_CHAR = a watercolor of a single small fern frond on cream paper.** A *real subject*, not an abstract color wash. An empty wash transfers poorly as a style ref; a single-subject painting teaches "how to paint a subject in this style" without imposing tree or animal geometry onto later locks.
3. **Reverse the chain.** Lock the faceless full tree *first* (geometry only, no oref). Use that locked tree as the oref for everything else. The face is described in prose in scenes — never pinned as a face-oref onto a full-tree gen. (Face-oref → full-tree is the main trap in the old runbook.)
4. **No `--profile` in the main flow.** One-line fallback at the very end only if this fails.
5. **MJ's default output is already 4 images** — no special grid param. Just run, pick the best, record the seed.
6. **`--no` lists kept short** (≤12 tokens). Long negatives eat prompt budget and can paradoxically introduce the banned concept.

---

## Step 1 — SREF_CHAR (medium ref with a subject)

Run once. Pick the one that looks most like the book's *paint*. Record its URL.

```text
A single small tropical fern frond on pure flat cream-white paper, isolated subject, empty background. Soft natural watercolor washes, fine paper grain, loose wet edges, gentle pigment blooms. Living-jungle palette: soft umber, deep leaf green, turquoise-silver tint, cool vapor grey, warm gold, cream. Quiet soft light, children's book illustration medium. No other objects, no scene, no horizon --ar 1:1 --v 7 --style raw --s 100 --no landscape, tree, animal, face, scene, border, text, letters
```

**What good looks like:** cream paper, one fern in watercolor, soft edges, fine grain, the book's palette. Not a landscape, not a scene.

**Record:** `{{SREF_CHAR}}` = __________________________________

---

## Step 2 — Smoke test (cheap insurance)

Confirms SREF_CHAR transfers *paint quality*, not scene. Fast and worth it.

```text
Single simple tall slender tree silhouette on pure flat white background, isolated subject, empty white void. Detailed watercolor. No scenery --sref {{SREF_CHAR}} --sw 100 --ar 11:17 --v 7 --style raw --s 50 --no background, scenery, jungle, mist, ground, text, letters
```

**What good looks like:** white bg, watercolor tree, no valley/mist/jungle.
**If jungle appears:** regenerate step 1, or lower `--sw` to 70 and reroll this.

---

## Step 3 — OREF_TREE (the master character lock)

**No oref pinned.** Geometry-only prompt + SREF_CHAR + white void. This is the keystone — get this right and the rest follows.

```text
Character reference sheet, single tall slender Ceiba pentandra kapok tree centered on pure flat pure white background, isolated subject, empty white void, no scenery. Very tall slender straight bole, long narrow columnar trunk, height many times greater than width, high umbrella canopy only at the top of a long clean shaft, small buttress fins only at the base, graceful vertical emergent rainforest silhouette, botanical proportions, wide establishing shot, generous empty white space around it. Pale grey-green bark, soft moss. Detailed atmospheric watercolor, fine natural texture, children's book character design. No face, no ground, no grass, no spring, no water, no mist, no sky, no jungle --sref {{SREF_CHAR}} --sw 100 --ar 11:17 --v 7 --style raw --s 50 --no face, background, scenery, jungle, mist, ground, grass, water, sky, squat tree, baobab, oak, fat trunk, barrel, text, letters
```

**What good looks like:** tall, thin, columnar, ceiba-like, white void, watercolor medium, no face. This doubles as QUIET (faceless rooted tree).
**Pick the tallest, thinnest, most ceiba-like of the 4.** Record its **URL and its `--seed`** — the seed gets reused on later WALK/KAI locks for shared geometry.

**If all 4 are fat/squat:** reroll once. Still fat → lower `--sw` to 70 and reroll. Still fat → add to `--no`: `dumpy, short, wide` (and reroll pulls different samples).

**Record:**
- `{{OREF_TREE}}` = __________________________________
- `--seed` = __________

---

## Step 4 — Page 1 (the viability test)

**Pin:** `{{SREF_STYLE}}` (your existing approved scenic image) + `{{OREF_TREE}}` as omni.

```text
Chapter-opening illustration, no lettering. Soft cream ground with atmospheric watercolor depth. Large characterful living tall slender Ceiba dominates the upper portion — long narrow trunk, high canopy, botanical proportions — kind tiny bark face high in trunk, no larger than a wood knot, wise kind eyes, palmate leaves filtering warm early-morning gold; cool vapor-mist at far canopy edge. Below, small valley creatures look upward with bright praise. Clear spring rings buttress roots. Soft ridges beyond. Peaceful, high, slightly lonely quiet grandeur. Clear lower area for text overlay. No cartoon outlines, no buildings, no squat fat tree, no huge face --sref {{SREF_STYLE}} --sw 120 --ow 100 --ar 11:17 --v 7 --style raw --s 120 --no text, letters, titles, squat tree, large face, buildings
```

**What good looks like:** tall thin ceiba with tiny knot-sized face, watercolor book look, soft valley, clear lower text area, no lettering, no buildings.

**If it works → approach is viable.** I then expand this file into the full ordered prompt list (QUIET, WALK, KAI, cast, all 26 pages) using the same reversed-chain logic. Tell me to proceed and I'll write it.

### Recovery (most MJ time lives here — the old runbook was silent on this)

- **Tree goes fat in-scene:** reroll with `--ow 80`. Still fat → `--ow 60` + add one line to prompt: "thin vertical silhouette, height many times width."
- **Face huge/missing:** adjust face phrase — "face no larger than a wood knot, small detail high on trunk, does not widen the trunk." Reroll.
- **Watercolor look weak:** raise `--sw` to 150 on SREF_STYLE. Reroll.
- **Close but one thing wrong:** use **Vary (Subtle)** on the best image, not a fresh roll. Vary Region for one area (e.g., face).
- **Two-three rerolls no progress:** see fallback below.

---

## Fallback (only if step 4 fails after 2-3 real rerolls)

Train a `--profile` on your 3-5 best approved style images (the ones you already like). It can only bias toward images you've already chosen — lowest-risk version of personalization. Append `--p <code>` to every paste. If you hit this wall, ask and I'll write the profile-training step.

---

## Session log

```text
{{SREF_CHAR}} =
{{SREF_STYLE}} =   (one of your existing approved scenic images)
{{OREF_TREE}} =
OREF_TREE --seed =
```

---

*Full runbook (large, has known structural flaws — see warning at its top): `HaiIkthiss-MidjourneyRunbook.md`.*
*Canon story: `HaiIkthiss-ThreeTallTales.md`.*
