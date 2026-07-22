#!/usr/bin/env python3
"""Verify structural spine markers (32 per book) across English HTML and locales.

Spine phrases are title.h1 (Quiet Stories) and hai.title.h1 (Tall Tales).
Hebrew story body may use niqqud forms; those count as the unpointed spine.

Run:  python3 scripts/verify_markers.py
"""
from __future__ import annotations

import os
import re
import sys
from collections import OrderedDict
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
LANG_DIR = ROOT / "lang"

EN_SPINE_Q = "Grok the Rock"
EN_SPINE_H = "Hai Ikthiss"

# Unpointed chrome/alt form → pointed body forms (Hebrew)
HE_Q_POINTED = "גְּרוֹק הַצּוּר"
HE_H_POINTED = "הָאִי אִיקְתִּיס"


def parse_locale(path: Path) -> dict[str, str]:
    text = path.read_text(encoding="utf-8")
    m = re.search(r"window\.I18N(?:\.\w[\w-]*|\[['\"][\w-]+['\"]\])\s*=\s*\{", text)
    if not m:
        return {}
    start = m.end() - 1
    i, depth, in_str, esc, quote = start, 0, False, False, None
    while i < len(text):
        c = text[i]
        if in_str:
            if esc:
                esc = False
            elif c == "\\":
                esc = True
            elif c == quote:
                in_str = False
        else:
            if c in "\"'":
                in_str, quote = True, c
            elif c == "{":
                depth += 1
            elif c == "}":
                depth -= 1
                if depth == 0:
                    obj = text[start : i + 1]
                    break
        i += 1
    else:
        return {}

    def unesc(s: str) -> str:
        out: list[str] = []
        j = 0
        while j < len(s):
            if s[j] == "\\" and j + 1 < len(s):
                n = s[j + 1]
                if n == "n":
                    out.append("\n")
                    j += 2
                elif n == "t":
                    out.append("\t")
                    j += 2
                elif n == '"':
                    out.append('"')
                    j += 2
                elif n == "'":
                    out.append("'")
                    j += 2
                elif n == "\\":
                    out.append("\\")
                    j += 2
                elif n == "/":
                    out.append("/")
                    j += 2
                elif n == "u" and j + 5 < len(s):
                    out.append(chr(int(s[j + 2 : j + 6], 16)))
                    j += 6
                else:
                    out.append(s[j + 1])
                    j += 2
            else:
                out.append(s[j])
                j += 1
        return "".join(out)

    d: dict[str, str] = {}
    i = 1
    n = len(obj)
    while i < n - 1:
        while i < n and obj[i] in " \t\n\r,":
            i += 1
        if i >= n - 1 or obj[i] == "}":
            break
        if obj[i : i + 2] == "//":
            while i < n and obj[i] != "\n":
                i += 1
            continue
        if obj[i] != '"':
            i += 1
            continue
        i += 1
        ks = i
        while i < n and obj[i] != '"':
            if obj[i] == "\\":
                i += 2
                continue
            i += 1
        key = obj[ks:i]
        i += 1
        while i < n and obj[i] in " \t\n\r:":
            i += 1
        parts: list[str] = []
        while i < n:
            while i < n and obj[i] in " \t\n\r":
                i += 1
            if i >= n or obj[i] not in "\"'":
                break
            q = obj[i]
            i += 1
            vs = i
            while i < n:
                if obj[i] == "\\":
                    i += 2
                    continue
                if obj[i] == q:
                    break
                i += 1
            parts.append(unesc(obj[vs:i]))
            i += 1
            while i < n and obj[i] in " \t\n\r":
                i += 1
            if i < n and obj[i] == "+":
                i += 1
                continue
            break
        d[key] = "".join(parts)
    return d


def extract_english_map(html_path: Path) -> OrderedDict[str, str]:
    html = html_path.read_text(encoding="utf-8")
    keys: OrderedDict[str, str] = OrderedDict()
    for m in re.finditer(r"<img\b[^>]*>", html, re.I):
        tag = m.group(0)
        km = re.search(r'data-i18n-alt="([^"]+)"', tag)
        am = re.search(r'\balt="([^"]*)"', tag)
        if km and am:
            keys[km.group(1)] = am.group(1)
    for m in re.finditer(
        r"<([a-zA-Z0-9]+)([^>]*\bdata-i18n=\"([^\"]+)\"[^>]*)>(.*?)</\1>", html, re.S
    ):
        key = m.group(3)
        if key not in keys:
            keys[key] = m.group(4)
    for m in re.finditer(
        r"<([a-zA-Z0-9]+)([^>]*\bdata-i18n-html=\"([^\"]+)\"[^>]*)>", html
    ):
        tag, key = m.group(1), m.group(3)
        rest = html[m.end() :]
        depth = 1
        i = 0
        while i < len(rest) and depth:
            om = re.match(rf"<{tag}\b[^>]*>", rest[i:])
            cm = re.match(rf"</{tag}>", rest[i:], re.I)
            if om:
                depth += 1
                i += om.end()
            elif cm:
                depth -= 1
                if depth == 0:
                    keys[key] = rest[:i]
                    break
                i += cm.end()
            else:
                i += 1
    return keys


def marker_keys(keymap: OrderedDict[str, str], spine: str) -> OrderedDict[str, int]:
    out: OrderedDict[str, int] = OrderedDict()
    for k, v in keymap.items():
        n = v.count(spine)
        if n:
            out[k] = n
    return out


def count_spine(text: str, spine: str, lang: str) -> int:
    n = text.count(spine)
    if lang in ("he", "he-phon"):
        if spine == "גרוק הצור":
            n += text.count(HE_Q_POINTED)
        if spine == "האי איקתיס":
            n += text.count(HE_H_POINTED)
    return n


def main() -> int:
    qs = extract_english_map(ROOT / "quiet-stories.html")
    tt = extract_english_map(ROOT / "tall-tales.html")
    qm = marker_keys(qs, EN_SPINE_Q)
    hm = marker_keys(tt, EN_SPINE_H)

    en_q = sum(qm.values())
    en_h = sum(hm.values())
    print(f"English Quiet Stories: {en_q} markers in {len(qm)} keys (want 32)")
    print(f"English Tall Tales:    {en_h} markers in {len(hm)} keys (want 32)")
    ok = en_q == 32 and en_h == 32

    if en_q != 32:
        print("  QS key breakdown:", dict(qm))
    if en_h != 32:
        print("  TT key breakdown:", dict(hm))

    # HTML file totals (illustrated books)
    qs_html = (ROOT / "quiet-stories.html").read_text(encoding="utf-8")
    tt_html = (ROOT / "tall-tales.html").read_text(encoding="utf-8")
    if qs_html.count(EN_SPINE_Q) != 32:
        print(f"  WARN quiet-stories.html file count={qs_html.count(EN_SPINE_Q)}")
        ok = False
    if tt_html.count(EN_SPINE_H) != 32:
        print(f"  WARN tall-tales.html file count={tt_html.count(EN_SPINE_H)}")
        ok = False

    print()
    langs = sorted(p.stem for p in LANG_DIR.glob("*.js") if p.stem != "en")
    print(f"{'lang':8} {'QS':>7} {'TT':>7}  notes")
    for lang in langs:
        d = parse_locale(LANG_DIR / f"{lang}.js")
        if not d:
            print(f"{lang:8}   —       —    parse failed")
            ok = False
            continue
        spine_q = d.get("title.h1", EN_SPINE_Q)
        spine_h = d.get("hai.title.h1", EN_SPINE_H)
        q_tot = 0
        h_tot = 0
        notes: list[str] = []
        for k, en_n in qm.items():
            if k not in d:
                notes.append(f"miss:{k}")
                continue
            loc_n = count_spine(d[k], spine_q, lang)
            q_tot += loc_n
            if loc_n != en_n:
                notes.append(f"{k}={loc_n}/{en_n}")
        for k, en_n in hm.items():
            if k not in d:
                notes.append(f"miss:{k}")
                continue
            loc_n = count_spine(d[k], spine_h, lang)
            h_tot += loc_n
            if loc_n != en_n:
                notes.append(f"{k}={loc_n}/{en_n}")

        status_q = f"{q_tot}/32"
        status_h = f"{h_tot}/32"
        if q_tot != 32 or h_tot != 32 or notes:
            ok = False
        # collapse pure miss-alt noise
        miss_q_alt = sum(
            1
            for n in notes
            if n.startswith("miss:") and not n.startswith("miss:hai") and n.endswith(".alt")
        )
        miss_h_alt = sum(
            1 for n in notes if n.startswith("miss:hai") and n.endswith(".alt")
        )
        other = [
            n
            for n in notes
            if not (
                n.startswith("miss:")
                and n.endswith(".alt")
            )
        ]
        summary = []
        if miss_q_alt:
            summary.append(f"Qalt-miss:{miss_q_alt}")
        if miss_h_alt:
            summary.append(f"Halt-miss:{miss_h_alt}")
        summary.extend(other[:12])
        if len(other) > 12:
            summary.append(f"+{len(other) - 12} more")
        note = "; ".join(summary) if summary else "OK"
        print(f"{lang:8} {status_q:>7} {status_h:>7}  {note}")

    print()
    if ok:
        print("All marker counts OK.")
        return 0
    print("Marker verification FAILED.")
    return 1


if __name__ == "__main__":
    sys.exit(main())
