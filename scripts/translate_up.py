#!/usr/bin/env python3
"""Translate an image up by X pixels, filling the exposed bottom with its edge color.

Usage:
  python translate_up.py <pixels> <filename>
  python translate_up.py 40 ./images/page01.png

The source image is shifted upward by `pixels`, revealing a strip of that many
rows along the bottom. That strip is filled with the average color of the
original bottom row (most inputs are a single uniform color there). Various
input formats (jpg, png, tif, webp, bmp, etc.) are accepted; the result is
always written as a JPEG in the same directory with a "_tup" suffix
(e.g. page01.png -> page01_tup.jpg).
"""
import argparse
import os

from PIL import Image

DEFAULT_QUALITY = 92

IMAGE_EXTS = {".jpg", ".jpeg", ".png", ".tif", ".tiff", ".bmp", ".webp", ".gif"}


def average_bottom_color(im):
    """Return the integer-triplet mean color of the image's bottom row."""
    w, h = im.size
    bottom = im.crop((0, h - 1, w, h))
    if hasattr(bottom, "get_flattened_data"):
        pixels = list(bottom.get_flattened_data())
    else:  # Pillow < 12
        pixels = list(bottom.getdata())
    n = len(pixels)
    if n == 0:
        return (0, 0, 0)
    r = sum(p[0] for p in pixels) / n
    g = sum(p[1] for p in pixels) / n
    b = sum(p[2] for p in pixels) / n
    return (round(r), round(g), round(b))


def translate_up(src_path, pixels, quality):
    im = Image.open(src_path).convert("RGB")
    w, h = im.size

    if pixels <= 0:
        raise ValueError(f"pixels must be positive, got {pixels}")

    base = os.path.splitext(os.path.basename(src_path))[0]
    out_path = os.path.join(os.path.dirname(src_path), f"{base}_tup.jpg")

    if pixels >= h:
        fill = average_bottom_color(im)
        out = Image.new("RGB", (w, h), fill)
        out.save(out_path, "JPEG", quality=quality, optimize=True)
        return out_path, out.size

    fill = average_bottom_color(im)
    out = Image.new("RGB", (w, h), fill)
    top = im.crop((0, pixels, w, h))
    out.paste(top, (0, 0))
    out.save(out_path, "JPEG", quality=quality, optimize=True)
    return out_path, out.size


def main():
    parser = argparse.ArgumentParser(
        description="Translate an image up by X pixels, filling the bottom edge."
    )
    parser.add_argument("pixels", type=int, help="Number of pixels to shift up.")
    parser.add_argument("filename", help="Path to the source image.")
    parser.add_argument(
        "--quality",
        type=int,
        default=DEFAULT_QUALITY,
        help=f"JPEG quality (default {DEFAULT_QUALITY}).",
    )
    args = parser.parse_args()

    if not os.path.isfile(args.filename):
        parser.error(f"file not found: {args.filename}")

    ext = os.path.splitext(args.filename)[1].lower()
    if ext not in IMAGE_EXTS:
        parser.error(f"unsupported image type: {ext}")

    try:
        out_path, size = translate_up(args.filename, args.pixels, args.quality)
    except ValueError as e:
        parser.error(str(e))

    print(f"  wrote {out_path} ({size[0]}x{size[1]})")


if __name__ == "__main__":
    main()
