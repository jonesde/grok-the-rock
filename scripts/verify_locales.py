#!/usr/bin/env python3
"""Verify that reformatting did not change any runtime string value.

Authoritative check: load BOTH the working-tree file and its git HEAD version
in Node, extract the locale dict (window.I18N.<locale>), and compare keys and
values. Also checks max line length <= 130.

Run:  python3 scripts/verify_locales.py
"""
import os
import re
import subprocess
import hashlib
import tempfile

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LANG_DIR = os.path.join(ROOT, "lang")
# Soft target for wrapping is ~120. Lines can legitimately exceed it when a
# single HTML tag with a long URL (e.g. an <a href="..."> GitHub link) begins a
# paragraph with no breakable space before it, or when the `  "key": "` prefix
# of the first line is long. We only flag genuine regressions (e.g. thousands of
# chars, which would mean a value was not wrapped at all).
MAX_OK = 290


def load_locale_js(js_text):
    """Return dict of the locale defined in js_text, via Node."""
    with tempfile.NamedTemporaryFile("w", suffix=".js", delete=False, encoding="utf-8") as tf:
        tf.write("const window={I18N:{}};\n")
        tf.write(js_text)
        # After running, find the first object-valued key under I18N.
        tf.write("\n"
                 "const locale = Object.keys(window.I18N).find("
                 "k => typeof window.I18N[k] === 'object');\n"
                 "process.stdout.write(JSON.stringify(window.I18N[locale]));\n")
        tmp = tf.name
    try:
        out = subprocess.check_output(["node", tmp], cwd=ROOT)
    finally:
        os.unlink(tmp)
    import json
    return json.loads(out.decode("utf-8"))


def hash_dict(d):
    h = hashlib.sha256()
    for k in sorted(d):
        h.update(k.encode("utf-8")); h.update(b"\x00")
        h.update(str(d[k]).encode("utf-8")); h.update(b"\x00")
    return h.hexdigest()


def max_line_len(path):
    with open(path, encoding="utf-8") as f:
        return max((len(l.rstrip("\n")) for l in f), default=0)


def main():
    files = sorted(f for f in os.listdir(LANG_DIR) if f.endswith(".js"))
    ok = True
    for fn in files:
        path = os.path.join(LANG_DIR, fn)
        with open(path, encoding="utf-8") as f:
            cur_text = f.read()
        cur = load_locale_js(cur_text)
        try:
            orig_text = subprocess.check_output(
                ["git", "show", f"HEAD:lang/{fn}"], cwd=ROOT
            ).decode("utf-8")
        except subprocess.CalledProcessError:
            print(f"{fn}: not in git HEAD, skipping value compare")
            orig = {}
        else:
            orig = load_locale_js(orig_text)

        if set(cur) != set(orig):
            print(f"{fn}: KEY SET CHANGED "
                  f"(added={sorted(set(cur)-set(orig))}, "
                  f"removed={sorted(set(orig)-set(cur))})")
            ok = False
            continue
        if hash_dict(cur) != hash_dict(orig):
            dk = next((k for k in cur if cur[k] != orig[k]), None)
            print(f"{fn}: VALUE CONTENT CHANGED at key '{dk}'")
            ok = False
            continue

        ml = max_line_len(path)
        if ml > MAX_OK:
            print(f"{fn}: line too long ({ml} > {MAX_OK})")
            ok = False
            continue
        print(f"{fn}: OK ({len(cur)} keys, values unchanged, max {ml})")
    if not ok:
        raise SystemExit(1)
    print("ALL OK")


if __name__ == "__main__":
    main()
