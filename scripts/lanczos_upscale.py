#!/usr/bin/env python3
"""Batch upscale images to exact 1650x2550 (5.5x8.5" @ 300 DPI) with Lanczos.

Usage:
  python lanczos_upscale.py /path/to/input_folder /path/to/output_folder
  python lanczos_upscale.py ./original_pages ./print_ready --quality 92

Each source image is cropped-to-fill (no distortion) to the target aspect
ratio, then resampled with true Lanczos (Image.Resampling.LANCZOS) and saved
as a high-quality, optimized JPEG. Output filenames preserve the original
base name and append "_up" (e.g. page01.png -> page01_up.jpg).
"""
import argparse
import os

from PIL import Image

TARGET_W = 1650
TARGET_H = 2550
LANCZOS = Image.Resampling.LANCZOS
DEFAULT_QUALITY = 92

IMAGE_EXTS = {".jpg", ".jpeg", ".png", ".tif", ".tiff", ".bmp", ".webp"}


def crop_to_fill(im, target_w, target_h):
    """Resize to cover the target box, then center-crop to exact dims."""
    src_w, src_h = im.size
    scale = max(target_w / src_w, target_h / src_h)
    cover_w = round(src_w * scale)
    cover_h = round(src_h * scale)
    im = im.resize((cover_w, cover_h), LANCZOS)
    left = (cover_w - target_w) // 2
    top = (cover_h - target_h) // 2
    return im.crop((left, top, left + target_w, top + target_h))


def upscale_file(src_path, out_path, quality):
    im = Image.open(src_path).convert("RGB")
    im = crop_to_fill(im, TARGET_W, TARGET_H)
    im.save(out_path, "JPEG", quality=quality, optimize=True)
    return im.size


def main():
    parser = argparse.ArgumentParser(
        description="Upscale images to exact 1650x2550 with Lanczos resampling."
    )
    parser.add_argument("input_folder", help="Folder containing source images.")
    parser.add_argument("output_folder", help="Folder to write upscaled JPEGs.")
    parser.add_argument(
        "--quality",
        type=int,
        default=DEFAULT_QUALITY,
        help=f"JPEG quality (default {DEFAULT_QUALITY}).",
    )
    args = parser.parse_args()

    if not os.path.isdir(args.input_folder):
        parser.error(f"input folder not found: {args.input_folder}")

    os.makedirs(args.output_folder, exist_ok=True)

    count = 0
    skipped = 0
    for name in sorted(os.listdir(args.input_folder)):
        ext = os.path.splitext(name)[1].lower()
        if ext not in IMAGE_EXTS:
            continue
        base = os.path.splitext(name)[0]
        src_path = os.path.join(args.input_folder, name)
        out_path = os.path.join(args.output_folder, f"{base}_up.jpg")
        size = upscale_file(src_path, out_path, args.quality)
        print(f"  wrote {out_path} ({size[0]}x{size[1]})")
        count += 1

    if count == 0:
        print("No images found to process.")
    else:
        print(f"Done. Upscaled {count} image(s) to {TARGET_W}x{TARGET_H}.")


if __name__ == "__main__":
    main()
