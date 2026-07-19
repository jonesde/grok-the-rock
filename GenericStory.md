# Generic Story Prompt (Hidden Dual-Layer Picture Book)

A reusable prompt for generating a children's picture-book text (ages 7–10) in the
voice and hidden-structure mode of *Grok the Rock: Three Quiet Stories*, but
generalized so **any surface character** and **any Biblical life-arc** can be
substituted. The 32 Paths of Wisdom spine and the *hidden, unmarked* dual-layer
technique stay identical to the original book.

---

## How to use this prompt

Fill in the four parameters, then paste the assembled block (below) to the model.

### Parameters

- **`{SurfaceCharacter}`** — a character with well-known lore and a recognizable
  voice/temperament (e.g., a gentle folk hero; default temperament =
  non-confrontational, no-villain, failure-acceptant). Build the world, cast, and
  setting around that character's established lore.
- **`{SurfaceName}`** — the exact recurring name-phrase used as the structural
  spine (e.g., "Grok the Rock").
- **`{BiblicalFigure}`** — a Biblical character whose *life arc* supplies the
  hidden structural backbone. You (the author) map that figure's story onto the
  32 paths, **one distinct beat per path, in strict order**, during writing —
  no pre-supplied list.
- **`{SymbolSet}`** — 4–6 concrete physical symbols that recur and carry double
  meaning (default: water, rock, clay, basket, tree, small feeling).

### Worked example: David + Grok (the original book)

This is the exact parameterization that produced *Grok the Rock: Three Quiet Stories*,
shown so you can see the shape of each slot.

```markdown
`SurfaceCharacter` = Grok the Rock — a small gray limestone creature with a moss
  patch on his head, based on Ted Prior's "Grug" (gentle, no villain, no climax,
  failure-acceptance). Lives under a tall tree by a water-hole in an
  Australian-outback animal world (emu, wombat, kookaburra, echidna Pip,
  cockatoo, tortoise).

`SurfaceName` = "Grok the Rock"

`BiblicalFigure` = King David

`SymbolSet` = water, rock, clay, basket, tree, the small feeling (a cold pebble
  that softens), melon (what breaks and is mended)
```
(The author maps David's life-arc onto the 32 paths during writing — one distinct beat per path, in strict order. No beat list is supplied up front.)

> Note: the mapping is **author/annotation only** and decided during writing. None
> of the figure's name, letters, sephirot, or scripture appears on the surface of
> the story. See the short example below for one beat (Tet / Saul's armor) shown
> explicitly — that is illustration, not a mandated list.

---

## The prompt (prepend the four parameters)

```markdown
**Task:** Write a children's picture-book text (ages 7–10) in the voice and
hidden-structure mode of a quiet, layered children's book.

**Inputs (already filled):**
- `{SurfaceCharacter}`: a character with well-known lore and a recognizable
  voice/temperament. Build the world, cast, and setting around that character's
  established lore.
- `{SurfaceName}`: the exact recurring name-phrase used as the structural spine.
- `{BiblicalFigure}`: a Biblical character whose *life arc* supplies the hidden
  structural backbone. You map that figure's story onto the 32 paths, one
  distinct beat per path, in strict order — you decide the mapping during writing.
- `{SymbolSet}`: 4–6 concrete physical symbols that recur and carry double meaning.

**Output format:** Write the entire result as a single **Markdown document**.
Use `##` headings for the cover, title, dedication, each chapter title page, each
story page, and the closing page; use `###` for individual pages within a chapter.
For every page (cover, title, dedication, chapter titles, story pages, closing),
include a fenced **image generation prompt** block describing a matching children's
book illustration in the established style.

**Surface story:** `{SurfaceCharacter}` lives in a calm world with
animals/companions. Prose: 1–3 short, concrete, rhythmic, near-poetic paragraphs
per page; simple vocabulary; read-aloud cadence; no surface abstraction or mysticism.

**Hidden Layer A — 32 Paths of Wisdom (Sefer Yetzirah):** All 32 Paths in strict
order: Letters 1–22, then Sephirot 23–32. Exactly **one path per page-unit**.
The Letters→Sephirot transition bridges Chapters 2 and 3. Paths are **never named
or signaled on the page** — invisible spine only (author/annotation layer may map
them; the reader must not see them).

**Hidden Layer B — `{BiblicalFigure}` arc:** The underlying structure mirrors that
figure's life. **Do not name the figure, quote scripture, or use religious terms
on the surface.** Map each of the 32 path-pages to **one specific beat** of that
figure's arc, in strict order — decided by you, not supplied. `{SurfaceCharacter}`
**redeems/rewrites** each beat toward the
"higher way" (compassion over convenience, truth over comfort, humility over pride,
sacrifice over safety), earned through hesitation, cost, or temptation — never
automatic.

**Structural constants:**
- 3 chapters (Awakening/Calling → Testing/Rebuilding → Transformation/Return),
  titled to fit the surface story.
- The full document carries the 32 paths across cover, title, dedication, 3
  chapter-title pages, story pages, and closing — not only the 26 narrative pages.
  The 26-page count mirrors YHWH (יהוה = 26); pace a fourfold cadence without
  announcing it.
- **`{SurfaceName}` is the recurring structural marker** — the universal spine
  (chapter-opening notes, the "`<SurfaceName>` woke under the tall tree" beat
  opening each chapter's first page, and the closing line). Used as this exact
  phrase; do not substitute variations for the marker. Target exactly 32 occurrences.
- Each chapter's final page may state plainly, in natural reflective prose, what was
  learned — inline, not as a lecture.
- `{SymbolSet}` does quiet double-duty for both layers. The story must be "a vessel
  that holds water without a single drip": every beat reinforces the higher way with
  no contradiction or filler.

**Appendix (after the 26-page story):** Append a **numbered list of all 32 Paths in
exact order** (1–22 Letters, then 23–32 Sephirot). For each path, give a **short,
accessible summary (2–4 sentences)** explaining the meaning of that path and how the
protagonist chose the "higher way" in that section. Do **not** reveal the hidden
structural framework, gematria mappings, name-markers, or the underlying
Kabbalistic/Biblical mechanics — keep the appendix story-focused and
child-appropriate. Then append a short **"cheat sheet"** section that identifies the
recurring structural marker used and gives a brief summary of the structure by layer
(surface story, then the two hidden layers), so a reader can decode the puzzle in the
story.
```

---

## Short example: how the mapping is applied (David beat 9 → surface page)

**Author/annotation (hidden):** Path 9 = *Tet* (the Snake / the false mask) =
King David trying on **Saul's armor** — the oversized bronze shape that doesn't fit
his nature, which he takes off.

**Surface page (what the reader sees), Chapter One:**

> Grok the Rock wanted to make himself look bigger.
> He stood on a log.
> He puffed out his chest.
> He even tried to thump the ground like the kangaroo.
>
> It only made the cold pebble heavier.

No letter, no "David," no armor. The *shape* of the beat (a false, heavy, borrowed
bigness that is rejected because it isn't who he is) is preserved; the surface stays
a small rock creature failing to look large. The reader who knows the layers will
recognize Saul's armor; the child reader just sees Grok choosing peace over pretense.

**Why this demonstrates the technique:** the generator must (a) keep the page fully
self-contained and child-friendly, (b) let exactly one Biblical beat and one Yetzirah
attribute ride underneath it, (c) redeem the beat toward the higher way through
earned cost, and (d) never surface the scaffolding.

---

## Verification checklist (run after generation)

- [ ] `{SurfaceName}` appears **exactly 32 times** (cover/title/dedication + 3
  chapter opens + closing text/art + 24 story-beat occurrences).
- [ ] 32 page-units total; **one path per page-unit**; Letters 1–22 then Sephirot
  23–32 in order.
- [ ] Each path carries one **distinct, recognizable beat** of the figure's arc
  (no repeats, no gaps), decided by the author — not surfaced on the page.
- [ ] Letters→Sephirot hinge falls naturally between Chapters 2 and 3.
- [ ] **No** path name, letter, sephirah, `{BiblicalFigure}` name, or scripture
  appears in the surface text.
- [ ] 3 chapters with fitting titles; each chapter's first story page opens with
  "`<SurfaceName>` woke under the tall tree."
- [ ] Each chapter's final page states the lesson plainly, inline.
- [ ] `{SymbolSet}` recurs and carries double meaning without breaking the
  child-level story.
- [ ] Surface story stands alone and is "a vessel that holds water without a drip."

---

*Licensed CC0 1.0, like the book it generalizes.*
