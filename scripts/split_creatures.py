#!/usr/bin/env python3
"""Split Hai valley reference sheets into equal-scale cutouts.

Sources:
  - creatures-grok-*.jpg  (white BG, 8 animals)
  - hai-walk-grok-*.jpg   (cream/mist BG, walking Hai)

- Matte backgrounds to transparency
- Separate touching animals via multi-seed geodesic labeling
- Scale so head-to-feet height is TARGET_H
  (stag antlers extend above; Hai leaf-crown top = head top)
- Write individual transparent PNGs + 9-figure lineup

Outputs: images/hai/reference/creatures/
"""
from __future__ import annotations

from collections import deque
from pathlib import Path

import numpy as np
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SRC_CREATURES = ROOT / "images/hai/reference/creatures-grok-b09851e5-41db-4f6f-ab50-b7bcfc15175c.jpg"
SRC_HAI = ROOT / "images/hai/reference/hai-walk-grok-ec773f11-3518-4ed2-946b-611dd2e53e5d.jpg"
OUT_DIR = ROOT / "images/hai/reference/creatures"

# Head-to-feet target height (px). Stag antlers extend above this.
# For Hai, full figure including leaf crown maps to this height.
TARGET_H = 512
# White-matte (creatures sheet): pixels with min(R,G,B) >= this → transparent.
WHITE_MIN = 248
WHITE_SOFT = 232
# Hai cream-bg flood matte: max color distance from local bg to treat as background.
HAI_BG_DIST = 42.0
HAI_BG_SOFT = 28.0
# Padding around each tight crop before scale.
PAD = 8
# Horizontal gap between figures in the lineup.
LINEUP_GAP = 48
LINEUP_MARGIN = 40

# Animals left → right on the creatures sheet.
CREATURE_NAMES = [
    "hedgehog",
    "stag",
    "badger",
    "raven",
    "pheasant",
    "owl",
    "fox",
    "stoat",
]

# Full lineup order (Hai first as main character).
LINEUP_NAMES = ["hai-walk"] + CREATURE_NAMES

# Seed points (x, y) near each animal's core on the creatures sheet.
SEEDS = {
    "hedgehog": (170, 620),
    "stag": (420, 450),
    "badger": (720, 520),
    "raven": (960, 520),
    "pheasant": (1180, 520),
    "owl": (1550, 520),
    "fox": (1800, 520),
    "stoat": (2030, 620),
}

# Fraction of full bbox height that is head+body (not antlers).
# Hai leaf crown = top of head → 1.0.
BODY_FRAC = {
    "hai-walk": 1.0,
    "hedgehog": 1.0,
    "stag": 0.70,
    "badger": 1.0,
    "raven": 1.0,
    "pheasant": 1.0,
    "owl": 1.0,
    "fox": 1.0,
    "stoat": 1.0,
}


def matte_white(im: Image.Image) -> tuple[Image.Image, np.ndarray]:
    """RGBA with near-white background made transparent."""
    rgba = im.convert("RGBA")
    arr = np.asarray(rgba).astype(np.float32)
    rgb = arr[:, :, :3]
    mn = rgb.min(axis=2)
    alpha = np.ones(mn.shape, dtype=np.float32) * 255.0
    alpha[mn >= WHITE_MIN] = 0.0
    soft = (mn >= WHITE_SOFT) & (mn < WHITE_MIN)
    t = (mn[soft] - WHITE_SOFT) / max(WHITE_MIN - WHITE_SOFT, 1)
    alpha[soft] = 255.0 * (1.0 - t)
    arr[:, :, 3] = alpha
    fully = alpha <= 0
    arr[fully, 0:3] = 0
    out = Image.fromarray(arr.astype(np.uint8), "RGBA")
    return out, alpha.astype(np.uint8)


def matte_cream_flood(im: Image.Image, bg_dist: float = HAI_BG_DIST, soft: float = HAI_BG_SOFT) -> Image.Image:
    """Remove soft cream/mist background via edge flood-fill by color distance."""
    rgba = im.convert("RGBA")
    arr = np.asarray(rgba).astype(np.float32)
    rgb = arr[:, :, :3]
    h, w = rgb.shape[:2]

    # Background color from edge samples (exclude darker outliers).
    edge_px = np.concatenate(
        [
            rgb[:8, :].reshape(-1, 3),
            rgb[-8:, :].reshape(-1, 3),
            rgb[:, :8].reshape(-1, 3),
            rgb[:, -8:].reshape(-1, 3),
        ],
        axis=0,
    )
    # Keep lighter edge pixels (true bg), drop any figure touching the border.
    lum = edge_px.mean(axis=1)
    hi = edge_px[lum >= np.percentile(lum, 40)]
    bg = hi.mean(axis=0) if len(hi) else edge_px.mean(axis=0)

    dist = np.linalg.norm(rgb - bg, axis=2)
    # Candidate background: close enough to bg color.
    is_bg_cand = dist <= bg_dist

    # Flood from image border through candidate bg only.
    visited = np.zeros((h, w), dtype=bool)
    q: deque[tuple[int, int]] = deque()
    for x in range(w):
        for y in (0, h - 1):
            if is_bg_cand[y, x] and not visited[y, x]:
                visited[y, x] = True
                q.append((y, x))
    for y in range(h):
        for x in (0, w - 1):
            if is_bg_cand[y, x] and not visited[y, x]:
                visited[y, x] = True
                q.append((y, x))

    nbrs = [(-1, 0), (1, 0), (0, -1), (0, 1)]
    while q:
        y, x = q.popleft()
        for dy, dx in nbrs:
            ny, nx = y + dy, x + dx
            if ny < 0 or ny >= h or nx < 0 or nx >= w:
                continue
            if visited[ny, nx] or not is_bg_cand[ny, nx]:
                continue
            visited[ny, nx] = True
            q.append((ny, nx))

    # Alpha: fully transparent on flooded bg; soft ramp near threshold on fringe.
    alpha = np.ones((h, w), dtype=np.float32) * 255.0
    alpha[visited] = 0.0
    # Soft edge: non-flooded pixels that are still somewhat bg-like
    fringe = (~visited) & (dist < bg_dist + soft)
    # fade from 0 at bg_dist to 255 at bg_dist+soft
    t = (dist[fringe] - bg_dist) / max(soft, 1e-6)
    t = np.clip(t, 0.0, 1.0)
    alpha[fringe] = 255.0 * t

    arr[:, :, 3] = alpha
    fully = alpha <= 0
    arr[fully, 0:3] = 0
    return Image.fromarray(arr.astype(np.uint8), "RGBA")


def tight_crop_rgba(im: Image.Image, pad: int = PAD) -> Image.Image:
    """Tight crop to non-transparent content."""
    arr = np.asarray(im)
    a = arr[:, :, 3]
    ys, xs = np.where(a > 16)
    if len(xs) == 0:
        raise SystemExit("No opaque content to crop")
    h, w = a.shape
    x0, x1 = max(0, int(xs.min()) - pad), min(w, int(xs.max()) + 1 + pad)
    y0, y1 = max(0, int(ys.min()) - pad), min(h, int(ys.max()) + 1 + pad)
    return im.crop((x0, y0, x1, y1))


def label_by_seeds(opaque: np.ndarray, seeds: dict[str, tuple[int, int]]) -> dict[str, np.ndarray]:
    """Multi-source BFS on opaque pixels. Each pixel goes to nearest seed (geodesic)."""
    h, w = opaque.shape
    labels = np.full((h, w), -1, dtype=np.int16)
    name_list = list(seeds.keys())
    name_to_id = {n: i for i, n in enumerate(name_list)}
    q: deque[tuple[int, int]] = deque()

    for name, (sx, sy) in seeds.items():
        if not (0 <= sx < w and 0 <= sy < h):
            raise SystemExit(f"Seed for {name} out of bounds: {(sx, sy)}")
        if not opaque[sy, sx]:
            found = None
            for r in range(1, 80):
                y0, y1 = max(0, sy - r), min(h, sy + r + 1)
                x0, x1 = max(0, sx - r), min(w, sx + r + 1)
                ys, xs = np.where(opaque[y0:y1, x0:x1])
                if len(ys):
                    cy, cx = ys + y0, xs + x0
                    d = (cy - sy) ** 2 + (cx - sx) ** 2
                    k = int(np.argmin(d))
                    found = (int(cx[k]), int(cy[k]))
                    break
            if found is None:
                raise SystemExit(f"No opaque pixel near seed for {name} at {(sx, sy)}")
            sx, sy = found
            print(f"  seed {name} snapped to {(sx, sy)}")
        lid = name_to_id[name]
        labels[sy, sx] = lid
        q.append((sy, sx))

    neighbors = [(-1, -1), (-1, 0), (-1, 1), (0, -1), (0, 1), (1, -1), (1, 0), (1, 1)]
    while q:
        y, x = q.popleft()
        lid = labels[y, x]
        for dy, dx in neighbors:
            ny, nx = y + dy, x + dx
            if ny < 0 or ny >= h or nx < 0 or nx >= w:
                continue
            if not opaque[ny, nx] or labels[ny, nx] >= 0:
                continue
            labels[ny, nx] = lid
            q.append((ny, nx))

    return {name: labels == lid for name, lid in name_to_id.items()}


def extract_creature(
    matted: Image.Image,
    mask: np.ndarray,
    pad: int,
) -> Image.Image:
    """Crop masked creature to tight RGBA with transparent outside."""
    ys, xs = np.where(mask)
    if len(xs) == 0:
        raise SystemExit("Empty creature mask")
    x0, x1 = int(xs.min()), int(xs.max()) + 1
    y0, y1 = int(ys.min()), int(ys.max()) + 1
    h, w = mask.shape
    x0p, y0p = max(0, x0 - pad), max(0, y0 - pad)
    x1p, y1p = min(w, x1 + pad), min(h, y1 + pad)

    crop = matted.crop((x0p, y0p, x1p, y1p))
    arr = np.asarray(crop).copy()
    local = mask[y0p:y1p, x0p:x1p]
    arr[~local, 3] = 0
    arr[~local, 0:3] = 0
    return Image.fromarray(arr, "RGBA")


def scale_head_body(im: Image.Image, name: str, target_h: int) -> Image.Image:
    """Scale so head-to-feet ≈ target_h; antlers may make canvas taller."""
    w, h = im.size
    body_frac = BODY_FRAC.get(name, 1.0)
    body_h = max(h * body_frac, 1.0)
    scale = target_h / body_h
    nw = max(1, int(round(w * scale)))
    nh = max(1, int(round(h * scale)))
    return im.resize((nw, nh), Image.LANCZOS)


def head_y_from_top(im: Image.Image, name: str) -> int:
    """Y offset of head-top (below antlers) from image top."""
    h = im.size[1]
    body_frac = BODY_FRAC.get(name, 1.0)
    return int(round(h * (1.0 - body_frac)))


def build_lineup(figs: list[tuple[str, Image.Image]]) -> Image.Image:
    """Composite figures with heads on one horizontal line; antlers above."""
    metas = [(name, im, head_y_from_top(im, name)) for name, im in figs]
    max_above = max(hy for _, _, hy in metas)
    max_below = max(im.size[1] - hy for _, im, hy in metas)
    total_w = (
        LINEUP_MARGIN * 2
        + sum(im.size[0] for _, im, _ in metas)
        + LINEUP_GAP * (len(metas) - 1)
    )
    total_h = LINEUP_MARGIN * 2 + max_above + max_below
    canvas = Image.new("RGBA", (total_w, total_h), (0, 0, 0, 0))
    x = LINEUP_MARGIN
    head_line = LINEUP_MARGIN + max_above
    for name, im, hy in metas:
        canvas.alpha_composite(im, (x, head_line - hy))
        x += im.size[0] + LINEUP_GAP
    return canvas


def edge_hits(im: Image.Image) -> int:
    a = np.asarray(im)[:, :, 3]
    return int(
        (a[:, 0] > 32).sum()
        + (a[:, -1] > 32).sum()
        + (a[0, :] > 32).sum()
        + (a[-1, :] > 32).sum()
    )


def process_hai() -> Image.Image:
    if not SRC_HAI.is_file():
        raise SystemExit(f"Hai source not found: {SRC_HAI}")
    print(f"Hai source: {SRC_HAI}")
    raw = Image.open(SRC_HAI)
    print(f"  size {raw.size[0]}x{raw.size[1]} mode {raw.mode}")
    matted = matte_cream_flood(raw)
    crop = tight_crop_rgba(matted, PAD)
    out = scale_head_body(crop, "hai-walk", TARGET_H)
    path = OUT_DIR / "00-hai-walk.png"
    out.save(path, "PNG")
    print(
        f"  wrote {path.relative_to(ROOT)} "
        f"{out.size[0]}x{out.size[1]} "
        f"(crop {crop.size[0]}x{crop.size[1]}, edge_hit={edge_hits(out)})"
    )
    return out


def process_creatures() -> list[tuple[str, Image.Image]]:
    if not SRC_CREATURES.is_file():
        raise SystemExit(f"Creatures source not found: {SRC_CREATURES}")
    print(f"Creatures source: {SRC_CREATURES}")
    raw = Image.open(SRC_CREATURES)
    print(f"  size {raw.size[0]}x{raw.size[1]} mode {raw.mode}")

    matted, alpha = matte_white(raw)
    opaque = alpha > 16
    print("  labeling by seeds (handles touching animals)...")
    masks = label_by_seeds(opaque, SEEDS)

    scaled: list[tuple[str, Image.Image]] = []
    for i, name in enumerate(CREATURE_NAMES, start=1):
        mask = masks[name]
        crop = extract_creature(matted, mask, PAD)
        out = scale_head_body(crop, name, TARGET_H)
        path = OUT_DIR / f"{i:02d}-{name}.png"
        out.save(path, "PNG")
        print(
            f"  wrote {path.relative_to(ROOT)} "
            f"{out.size[0]}x{out.size[1]} "
            f"(crop {crop.size[0]}x{crop.size[1]}, "
            f"mask_px={int(mask.sum())}, edge_hit={edge_hits(out)})"
        )
        scaled.append((name, out))
    return scaled


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)

    hai = process_hai()
    creatures = process_creatures()

    # Lineup: Hai + 8 creatures
    figs: list[tuple[str, Image.Image]] = [("hai-walk", hai)] + creatures
    assert [n for n, _ in figs] == LINEUP_NAMES

    lineup = build_lineup(figs)
    lineup_path = OUT_DIR / "creatures-equal-height.png"
    lineup.save(lineup_path, "PNG")
    print(f"  wrote {lineup_path.relative_to(ROOT)} {lineup.size[0]}x{lineup.size[1]} ({len(figs)} figures)")
    print("Done.")


if __name__ == "__main__":
    main()
