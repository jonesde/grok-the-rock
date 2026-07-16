#!/usr/bin/env python3
"""Generate a web favicon set from the Grok source PNG.

Source: images/reference/grok-df4cdf41-ecc4-4861-ae74-7643ab049d11.png
 - crop 100px from each side (reduces W/H by 200px total)
 - scale down to target sizes with LANCZOS
 - transparent background, no compositing

Outputs to images/ico/:
  favicon.ico        multi-size (16/32/48/64/128/256) ICO
  favicon-16x16.png  16x16
  favicon-32x32.png  32x32
  apple-touch-icon.png 180x180
  icon-192.png       192x192
  icon-512.png       512x512
"""
import io as _io
import os
from PIL import Image

SRC = "images/reference/grok-df4cdf41-ecc4-4861-ae74-7643ab049d11.png"
OUT_DIR = "images/ico"
CROP = 100  # px trimmed from each edge

LANCZOS = Image.LANCZOS

os.makedirs(OUT_DIR, exist_ok=True)

def load_cropped():
    im = Image.open(SRC).convert("RGBA")
    w, h = im.size
    im = im.crop((CROP, CROP, w - CROP, h - CROP))
    return im

def fit(im, size):
    """Resize to a square of `size`, preserving aspect with no stretch."""
    return im.resize((size, size), LANCZOS)

def save_png(im, size, name):
    out = fit(im, size)
    path = os.path.join(OUT_DIR, name)
    out.save(path, "PNG")
    print(f"  wrote {path} ({size}x{size})")

def save_ico(im, name, sizes):
    """Build a multi-image ICO manually (this Pillow lacks ICO save_all).

    Each frame is stored as a PNG (BMP-with-PNG trick: ICO entries whose
    'height' byte is 0 mean 256, and PNG data is allowed for 32bpp icons).
    We encode each size as an independent PNG and pack it into the ICO
    directory format.
    """
    import struct as _struct

    path = os.path.join(OUT_DIR, name)
    entries = []
    imagedata = b""
    for s in sizes:
        buf = _io.BytesIO()
        fit(im, s).save(buf, format="PNG")
        data = buf.getvalue()
        # ICO directory entry: width, height (0 => 256), color count,
        # reserved, planes(2), bitcount(2), datasize(4), dataoffset(4)
        w = s & 0xFF
        h = s & 0xFF
        planes = 1
        bitcount = 32
        entry = _struct.pack("<BBBBHHII", w, h, 0, 0, planes, bitcount,
                             len(data), 0)
        entries.append((entry, data))

    header = _struct.pack("<HHH", 0, 1, len(entries))
    # All directory entries come first, then all image data (contiguous).
    offset = len(header) + len(entries) * 16
    dir_bytes = bytearray(header)
    data_bytes = bytearray()
    for entry, data in entries:
        e = bytearray(entry)
        e[12:16] = _struct.pack("<I", offset)
        dir_bytes += e
        data_bytes += data
        offset += len(data)
    with open(path, "wb") as f:
        f.write(dir_bytes + data_bytes)
    print(f"  wrote {path} (sizes {sizes})")

def main():
    im = load_cropped()
    print(f"Source cropped to {im.size[0]}x{im.size[1]}")

    save_png(im, 16, "favicon-16x16.png")
    save_png(im, 32, "favicon-32x32.png")
    save_png(im, 180, "apple-touch-icon.png")
    save_png(im, 192, "icon-192.png")
    save_png(im, 512, "icon-512.png")
    save_ico(im, "favicon.ico", [16, 32, 48, 64, 128, 256])

    print("Done.")

if __name__ == "__main__":
    main()
