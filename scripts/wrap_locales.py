#!/usr/bin/env python3
"""Reformat lang/*.js locale files so no line exceeds ~120 chars.

Each file is a browser global assignment:

    window.I18N = window.I18N || {};
    window.I18N.xx = {          (or window.I18N["he-phon"] = {)
      "key": "value",           value may be a long HTML string
      ...
    };

Long lines are single double-quoted string VALUES containing HTML prose
joined by tags such as </p>, <hr>, </em>, etc. We never change the runtime
value -- we only re-layout the value across adjacent double-quoted segments
joined with `+`, breaking at natural "paragraph" HTML boundaries so each
emitted line stays within the target width.

Preserved exactly: header comment block, the `window.I18N = ...` line, the
object-open line, the closing `};` line, key names, key order, and the exact
string contents.

Run:  python3 scripts/wrap_locales.py
"""

import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LANG_DIR = os.path.join(ROOT, "lang")

TARGET = 120
INDENT = "  "

# Boundaries where we may break a value into a new segment. We break AFTER the
# matched marker (the marker stays at the end of the preceding segment).
BREAK_AFTER = [
    r"</p>", r"</h1>", r"</h2>", r"</h3>", r"</em>", r"</a>",
    r"</strong>", r"</b>", r"</li>", r"</ul>", r"</ol>",
    r"<hr>", r"<br>", r"<br/>", r"<hr/>",
]
_BREAK_RE = re.compile("(" + "|".join(BREAK_AFTER) + ")")


def _break_long_segment(seg, limit):
    """Break a single segment at word (space) boundaries so each piece is
    <= limit chars. Breaking never occurs inside an HTML tag (`<...>`) nor
    inside an escape sequence (`\\` or `\"`), so attribute values and quoted
    text stay intact. Words are never clipped mid-word: when a word would not
    fit, the break happens at the last space before the limit. Only a token
    with no space at all (e.g. a long URL) is hard-split, and only while
    outside a tag, so URLs are kept whole. The space stays attached to the
    piece it follows so concatenation reproduces the original exactly."""
    if len(seg) <= limit:
        return [seg]

    out = []
    buf = ""
    last_space = -1          # index in buf of the most recent breakable space
    in_tag = False
    prev = ""
    for ch in seg:
        if ch == "<":
            in_tag = True
        elif ch == ">" and in_tag:
            in_tag = False
        buf += ch
        if ch == " " and not in_tag and prev != "\\":
            last_space = len(buf) - 1   # position of this space within buf
        # Break when buf is full AND the next char would overflow. Prefer the
        # last space so we never split a word; otherwise (no space yet) only
        # break at exactly limit and only outside a tag. The current char is
        # not yet added to the overflow decision, so we compare len(buf).
        if len(buf) > limit:
            if last_space >= 0:
                out.append(buf[:last_space + 1])   # keep the trailing space
                buf = buf[last_space + 1:]
                last_space = -1
            elif not in_tag and prev != "\\":
                # single unbreakable token (URL-ish); hard-split at limit
                out.append(buf[:limit])
                buf = buf[limit:]
                last_space = -1
            # if in_tag and no space, keep accumulating (protect the tag/URL)
    if buf:
        out.append(buf)
    return out or [seg]


def split_value(value):
    """Split a string value into segments at safe HTML paragraph boundaries.

    Concatenating the returned segments reproduces `value` exactly.
    Segments are NON-overlapping pieces of the original (no duplication).
    After HTML-boundary splitting, any still-overlong segment is further
    broken at word (space) boundaries to approach the target width.
    """
    if not value:
        return [""]
    parts = _BREAK_RE.split(value)
    # With a capturing group, parts = [text, delim, text, delim, ...].
    segments = []
    buf = ""
    for i, part in enumerate(parts):
        buf += part
        # Even indices are plain text, odd are delimiters. A delimiter ends a
        # segment only when followed by more content (i.e. not the last part).
        if i % 2 == 1 and i < len(parts) - 1:
            segments.append(buf)
            buf = ""
    if buf:
        segments.append(buf)

    # Apply word-boundary fallback to any segment still too long.
    wrapped = []
    for seg in segments:
        wrapped.extend(_break_long_segment(seg, TARGET))
    return wrapped or [""]


def wrap_entry(key, value):
    """Return a list of source lines for one `"key": "value"` entry.

    Segments are packed greedily into each output line up to the target width
    -- a short segment like "</p>" is appended to the previous line when there
    is room, rather than occupying a line of its own.

    NO trailing commas are added here -- commas between entries are handled
    by the caller, which appends a comma to the LAST line of every entry
    except the final entry in the object.
    """
    segments = split_value(value)
    key_prefix = f'{INDENT}"{key}": "'
    cont_indent = INDENT + "  "

    if len(segments) == 1:
        return [f'{key_prefix}{segments[0]}"']

    # Budget (in content chars) available per line before the closing `" +`.
    # First line carries key_prefix, so it has less room.
    first_budget = TARGET - len(key_prefix) - 3   # -3 for `" +`
    cont_budget = TARGET - len(cont_indent) - 4   # -4 for `  " +`

    lines = []          # list of lists of segments
    cur = [segments[0]]
    cur_len = len(segments[0])
    budget = first_budget
    for seg in segments[1:]:
        # Adding this segment needs a separating space? No -- segments are
        # concatenated with no separator, so only the segment length counts.
        if cur_len + len(seg) > budget and cur:
            lines.append(cur)
            cur = [seg]
            cur_len = len(seg)
            budget = cont_budget
        else:
            cur.append(seg)
            cur_len += len(seg)
    if cur:
        lines.append(cur)

    out = []
    for i, group in enumerate(lines):
        joined = "".join(group)
        if i == 0:
            out.append(f'{key_prefix}{joined}" +')
        else:
            out.append(f'{cont_indent}"{joined}" +')
    # The value ends at the last group; drop its joining ` +`.
    out[-1] = out[-1][:-2].rstrip()
    return out


def parse_file(text):
    """Return (header_lines, entry_lines, footer_lines).

    header_lines: up to & including the object-open line.
    footer_lines: from the closing `};` to EOF (usually just that line).
    entry_lines: the raw entry source lines (each a `"key": "value",` line).
    """
    lines = text.split("\n")
    open_idx = None
    for i, ln in enumerate(lines):
        if re.match(r'^\s*window\.I18N(?:\.[A-Za-z0-9_-]+|\["[^"]+"\])\s*=\s*\{', ln):
            open_idx = i
            break
    if open_idx is None:
        raise ValueError("Could not find object-open line")

    close_idx = None
    for i in range(len(lines) - 1, open_idx, -1):
        if lines[i].strip() == "};":
            close_idx = i
            break
    if close_idx is None:
        raise ValueError("Could not find closing };")

    header = lines[: open_idx + 1]
    entry_lines = lines[open_idx + 1 : close_idx]
    footer = lines[close_idx:]
    return header, entry_lines, footer


ENTRY_RE = re.compile(r'^(\s*)"((?:[^"\\]|\\.)*)"\s*:\s*"((?:[^"\\]|\\.)*)"\s*,?\s*$')


def reformat_file(path):
    with open(path, encoding="utf-8") as f:
        text = f.read()
    header, entry_lines, footer = parse_file(text)

    out_entries = []
    last_entry_idx = None
    for idx, ln in enumerate(entry_lines):
        if ln.strip() == "":
            out_entries.append(("", [ln]))  # blank line preserved
            continue
        m = ENTRY_RE.match(ln)
        if not m:
            out_entries.append(("", [ln]))  # unknown line preserved as-is
            continue
        key, value = m.group(2), m.group(3)
        wrapped = wrap_entry(key, value)
        out_entries.append((key, wrapped))
        last_entry_idx = idx

    out_lines = list(header)
    for idx, (key, wrapped) in enumerate(out_entries):
        if key == "":
            out_lines.extend(wrapped)
            continue
        is_last_entry = (idx == last_entry_idx)
        last_j = len(wrapped) - 1
        for j, line in enumerate(wrapped):
            if is_last_entry:
                # Final entry: no comma anywhere.
                out_lines.append(line)
            elif j == last_j:
                # Comma terminates the entry (the value's closing quote line).
                out_lines.append(line.rstrip() + ",")
            else:
                # Interior continuation lines end in ` +`; no comma.
                out_lines.append(line)
    out_lines.extend(footer)
    return "\n".join(out_lines)


def max_line_len(text):
    return max((len(l) for l in text.split("\n")), default=0)


def main():
    files = sorted(f for f in os.listdir(LANG_DIR) if f.endswith(".js"))
    for fn in files:
        path = os.path.join(LANG_DIR, fn)
        new = reformat_file(path)
        with open(path, "w", encoding="utf-8") as f:
            f.write(new)
        print(f"{fn}: max line length = {max_line_len(new)}")


if __name__ == "__main__":
    main()
