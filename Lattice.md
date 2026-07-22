# Lattice — stone, water, potter

This note is for architects of the work, not for the child reading aloud.

## The proto-pattern

| Role | Material | Job | Failure |
|------|----------|-----|---------|
| **Stone** | structure / invariants | Holds shape under load | **Tips** |
| **Water** | variation + proof | Moves freely inside good bounds; tests the vessel | **Leaks** |
| **Clay → vessel** | stone ground + water, then sealed | New shape that carries the gift | — |
| **Potter** | process / referee | Orchestrates; hands do not fix each other | **Breaks apart** |

When designing a system we lay **stone** (rigidity in the right places). **Water** is both the freedom inside those bounds and the test that proves the bounds. **Clay** is structure made workable; **pottery** fires the pair into a form that can hold what it was meant to hold.

- A **leak** is local: the seal is wrong; mend without rebuilding the whole.
- A **tip** is structural: the load path is wrong; correct the form.
- A **break apart** is process: the referee or recursion failed; stop pushing clay and change how you work.

The left hand need not know what the right hand does: **black-box isolation**. Each hand answers the work, not the other hand. Only the potter sees the join. If the hands collude in the text (explain the scaffolding to each other or to the reader), the proving is compromised.

## How the books already speak this

- **Grok the Rock** — near hand: ground, limestone, nest, basket pattern, mending at the seam. Structure that stands small.
- **Hai Ikthiss** — far hand: height, hollow cup filled to pour down, far sight, lift so others share the view. Seal and test of seeing.
- **Clay / vessel / ownerless pattern** — already the centerpiece symbols; the open gift under the tree is Rule 7 and CC0 in one object.
- **32-unit spine** — the stone count. Chiastic **invitation** at unit 17 (`Come…`) — the heart. Letters→Sephirot hinge after unit 22 — process deepens without a sermon on the page.

## The missing piece: potter + seal

1. **`ThePotter.md`** — story form of the process. Two hands (near / far) that do not explain each other. Vessel left with **no name**. Walks the same thirty-two quiet steps.
2. **`lang/lattice.json`** — canonical dual-book table (the stone map).
3. **`lang/lattice.seal`** — SHA-256 commitment of that table (the fired mark).
4. **`scripts/verify_lattice.py`** — the water test and the referee:

```bash
python3 scripts/verify_lattice.py
```

It checks structure (tip), spine markers + center invitation (leak), Potter beats (process narrative), and hash match (seal).

Short seal (first 12 hex of the hash): see `lang/lattice.seal` after a green run. Current short form is also echoed by the script.

## What is free vs fixed under CC0

- **Free:** copy, share, translate, redraw, fork, grow.
- **Fixed if you claim this lattice:** the 32-row join, center invitation slot, hinge, and dual-hand isolation in the Potter tale. A fork that changes the arc should change the seal — honesty, not DRM.

## Related

- `GenericStory.md` — dual-layer recipe  
- `GrokDavid.md` / `GrokTheRock-Symbolism.md` — ghost and clay maps  
- `scripts/verify_markers.py` — spine 32/32 alone  
- `ThePotter.md` — the story seal  
