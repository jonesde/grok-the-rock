#!/usr/bin/env python3
"""Generate basic.html: the whole book, two pages per row, text overlaid on images."""
import re, glob, os

SRC = "GrokTheRock-ThreeQuietStories.md"
IMG_DIR = "images"
OUT = "basic.html"

with open(SRC, encoding="utf-8") as f:
    text = f.read()

# Split into sections by lines that are exactly "---"
chunks = re.split(r"(?m)^---\s*$", text)

def find_fence(chunk):
    """Return the content of the first fenced code block (``` ... ```)."""
    m = re.search(r"```(?:markdown)?\s*\n(.*?)```", chunk, re.DOTALL)
    return m.group(1).strip() if m else None

def heading(chunk):
    m = re.search(r"(?m)^#{2,3}\s+(.*?)\s*$", chunk)
    return m.group(1) if m else None

def image_for(title):
    t = title.lower()
    if "cover" in t:
        return glob.glob(os.path.join(IMG_DIR, "cover-*.jpg"))
    if "dedication" in t:
        return glob.glob(os.path.join(IMG_DIR, "dedication-*.jpg"))
    m = re.search(r"page\s+(\d+)", t)
    if m:
        return glob.glob(os.path.join(IMG_DIR, f"page-{m.group(1)}-*.jpg"))
    return []

def render_md(s):
    """Minimal markdown: **strong**, *em*, preserve line breaks."""
    lines = s.split("\n")
    out = []
    for line in lines:
        line = line.rstrip()
        line = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", line)
        line = re.sub(r"\*(.+?)\*", r"<em>\1</em>", line)
        out.append(line)
    return "<br>\n".join(out)

pages = []
for chunk in chunks:
    h = heading(chunk)
    if not h:
        continue
    hl = h.lower()
    # Skip the book preamble (top title block) which has no page image/text
    if "cover" not in hl and "title page" not in hl and "dedication" not in hl \
       and not re.search(r"page\s+\d+", hl):
        continue
    caption = find_fence(chunk)
    imgs = image_for(h)
    img = imgs[0] if imgs else None
        # Chapter title pages (1, 10, 18) have their titles baked into the image;
    # keep the caption as an HTML comment rather than visible overlay.
    if "chapter title" in hl:
        caption = caption  # preserved, emitted as comment below
    pages.append((h, img, caption, "chapter title" in hl))

# Build HTML
cells = []
for title, img, caption, is_chapter in pages:
    if img:
        if caption and is_chapter:
            cap_html = f'      <!-- chapter title overlay (hidden): <div class="caption">{render_md(caption)}</div> -->'
        else:
            cap_html = f'<div class="caption">{render_md(caption)}</div>' if caption else ""
        cells.append(
            f'    <div class="page">\n'
            f'      <img src="{img}" alt="{title}">\n'
            f'      {cap_html}\n'
            f'    </div>'
        )
    else:
        # Text-only page (Title Page): cream card
        cells.append(
            f'    <div class="page textpage">\n'
            f'      <div class="cardtext">{render_md(caption)}</div>\n'
            f'    </div>'
        )

book = "\n".join(cells)

html = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Grok the Rock — Three Quiet Stories</title>
<style>
  :root {{ color-scheme: light; }}
  * {{ box-sizing: border-box; }}
  html, body {{ margin: 0; padding: 0; background: #efe7d8; }}
  body {{ font-family: "Iowan Old Style", "Palatino Linotype", Palatino, Georgia, serif; }}
  .book {{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.6vw;
    padding: 0.6vw;
  }}
  .page {{
    position: relative;
    line-height: 0;
    background: #fff;
    overflow: hidden;
  }}
  .page img {{
    width: 100%;
    height: auto;
    display: block;
  }}
  .caption {{
    position: absolute;
    left: 0; right: 0; bottom: 0;
    padding: 4% 7% 6%;
    text-align: center;
    line-height: 1.25;
    font-size: clamp(0.6rem, 1.25vw, 1.15rem);
    color: #2b2118;
    text-shadow: 0 0 3px rgba(255,255,255,0.75), 0 1px 2px rgba(255,255,255,0.6);
  }}
  .textpage {{
    background: #fbf4e6;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 60vh;
  }}
  .cardtext {{
    line-height: 1.5;
    text-align: center;
    padding: 8% 10%;
    font-size: clamp(0.7rem, 1.4vw, 1.3rem);
    color: #3a2f22;
  }}
  .cardtext strong {{ font-size: 1.15em; }}
  @media (max-width: 640px) {{
    .book {{ grid-template-columns: 1fr; }}
    .textpage {{ min-height: 40vh; }}
  }}
</style>
</head>
<body>
  <div class="book">
{book}
  </div>
</body>
</html>
"""

with open(OUT, "w", encoding="utf-8") as f:
    f.write(html)

print(f"Wrote {OUT} with {len(pages)} pages:")
for t, i, c, ch in pages:
    tag = "img" if i else "TEXT"
    cap = "commented" if (ch and c) else ("yes" if c else "no")
    print(f"  - {t}: {tag} | caption={cap}")
