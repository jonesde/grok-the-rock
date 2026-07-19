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
  hidden structural backbone. Provide a brief ordered **beat list** (one beat per
  path, 32 total) of that figure's story.
- **`{SymbolSet}`** — 4–6 concrete physical symbols that recur and carry double
  meaning (default: water, rock, clay, basket, tree, small feeling).

### Worked example: David + Grok (the original book)

This is the exact parameterization that produced *Grok the Rock: Three Quiet Stories*,
shown so you can see the shape of each slot.

```
{SurfaceCharacter} = Grok the Rock — a small gray limestone creature with a moss
  patch on his head, based on Ted Prior's "Grug" (gentle, no villain, no climax,
  failure-acceptance). Lives under a tall tree by a water-hole in an
  Australian-outback animal world (emu, wombat, kookaburra, echidna Pip,
  cockatoo, tortoise).

{SurfaceName} = "Grok the Rock"

{BiblicalFigure} = King David
{BiblicalFigure} beat list (32 beats, one per path; Letters 1–22 then Sephirot 23–32):
  1  Aleph   — The shepherd in the field (small, overlooked, quiet in the landscape)
  2  Bet     — The anointing at the house of Jesse (the chosen vessel is crowned)
  3  Gimel   — The journey to the camp with provisions (a gift carried across)
  4  Daleth  — Entering the Valley of Elah (the threshold; the single brook stone)
  5  He      — Beholding Goliath (seeing the terrifying scale across the valley)
  6  Vav     — Eliab's rebuke (the big brother scorns the small one)
  7  Zayin   — Goliath's taunts (the weapon flashes; the army feels trapped)
  8  Chet    — Saul's dread (fear walled inside; the camp frozen)
  9  Tet     — Saul's armor refused (the false, heavy shape that doesn't fit)
  10 Yod     — The slingstone from the brook (the tiny point that brings the giant low)
  11 Kaf     — The return / the crown (earthly victory turned to inner peace)
  12 Lamed   — The covenant of friendship (the safe personal space "his and enough")
  13 Mem     — The court of Saul (living among the threatened, staying small)
  14 Nun     — The wilderness flights (hiding, wandering, provision in the open)
  15 Samekh  — The narrow escapes (enclosed, preserved without breaking)
  16 Ayin    — Seeing the enemy asleep (clear sight without striking)
  17 Pe      — The sparing of Saul (the mouth that could speak death, chooses life)
  18 Tsadi   — The lonely righteousness (the righteous one hunted, not hurrying)
  19 Qof     — The cup at the brook (drinking, not destroying, the back-of-the-head)
  20 Resh    — The kingship withheld (the head/crown deferred, the people not forced)
  21 Shin    — The triple flame of loyalty (friends, bones, oath — the consuming warmth)
  22 Tav     — The signed and sealed patience (the mark of completion, not yet taken)
  23 Keter   — The hidden crown above (sovereignty received, not seized)
  24 Hokhmah — The primal insight (the first spark of true strategy)
  25 Binah   — The understanding that waits (the womb of right timing)
  26 Hesed   — The loving-kindness to enemies (the generous reach)
  27 Gevurah — The disciplined restraint (the withheld hand)
  28 Tiferet  — The beauty of the balanced heart (truth and mercy met)
  29 Netzach — The enduring patience (victory that outlasts, not overruns)
  30 Hod     — The humble radiance (glory that points away from self)
  31 Yesod   — The foundation of covenant kept (the steady base under all)
  32 Malkhut — The kingdom lived quietly (the manifested world, gentle and whole)

{SymbolSet} = water, rock, clay, basket, tree, the small feeling (a cold pebble
  that softens), melon (what breaks and is mended)
```

> Note: the beat list above is **author/annotation only**. None of these names,
> letters, sephirot, or the word "David" appears on the surface of the story.

---

## The prompt (assemble by substituting the four parameters)

> **Task:** Write a children's picture-book text (ages 7–10) in the voice and
> hidden-structure mode of *Grok the Rock: Three Quiet Stories*, but generalized so
> any surface character and any Biblical life-arc can be substituted.
>
> **Inputs (already filled):**
> - `{SurfaceCharacter}`: a character with well-known lore and a recognizable
>   voice/temperament. Build the world, cast, and setting around that character's
>   established lore.
> - `{SurfaceName}`: the exact recurring name-phrase used as the structural spine.
> - `{BiblicalFigure}`: a Biblical character whose *life arc* supplies the hidden
>   structural backbone, given as an ordered **beat list** (32 beats, one per path).
> - `{SymbolSet}`: 4–6 concrete physical symbols that recur and carry double meaning.
>
> **Surface story:** `{SurfaceCharacter}` lives in a calm world with
> animals/companions. Prose: 1–3 short, concrete, rhythmic, near-poetic paragraphs
> per page; simple vocabulary; read-aloud cadence; no surface abstraction or mysticism.
>
> **Hidden Layer A — 32 Paths of Wisdom (Sefer Yetzirah):** All 32 Paths in strict
> order: Letters 1–22, then Sephirot 23–32. Exactly **one path per page-unit**.
> The Letters→Sephirot transition bridges Chapters 2 and 3. Paths are **never named
> or signaled on the page** — invisible spine only (author/annotation layer may map
> them; the reader must not see them).
>
> **Hidden Layer B — `{BiblicalFigure}` arc:** The underlying structure mirrors that
> figure's life. **Do not name the figure, quote scripture, or use religious terms
> on the surface.** Map each of the 32 path-pages to **one specific beat** from the
> supplied beat list. `{SurfaceCharacter}` **redeems/rewrites** each beat toward the
> "higher way" (compassion over convenience, truth over comfort, humility over pride,
> sacrifice over safety), earned through hesitation, cost, or temptation — never
> automatic.
>
> **Structural constants:**
> - 3 chapters (Awakening/Calling → Testing/Rebuilding → Transformation/Return),
>   titled to fit the surface story.
> - The full document carries the 32 paths across cover, title, dedication, 3
>   chapter-title pages, story pages, and closing — not only the 26 narrative pages.
>   The 26-page count mirrors YHWH (יהוה = 26); pace a fourfold cadence without
>   announcing it.
> - **`{SurfaceName}` is the recurring structural marker** — the universal spine
>   (chapter-opening notes, the "`<SurfaceName>` woke under the tall tree" beat
>   opening each chapter's first page, and the closing line). Used as this exact
>   phrase; do not substitute variations for the marker. Target exactly 32 occurrences.
> - Each chapter's final page may state plainly, in natural reflective prose, what was
>   learned — inline, not as a lecture.
> - `{SymbolSet}` does quiet double-duty for both layers. The story must be "a vessel
>   that holds water without a single drip": every beat reinforces the higher way with
>   no contradiction or filler.

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
