#!/usr/bin/env python3
"""Verify the dual-book lattice seal (stone + water test).

The lattice is the shared 32-unit structure of Quiet Stories and Tall Tales.
The Potter story walks the same rows. This script is the referee:

  - structure must not tip (row count, path order, center, hinge)
  - seal must not leak (spine markers 32/32, center invitation)
  - process must hold (canonical hash matches committed seal)

Run:  python3 scripts/verify_lattice.py
"""
from __future__ import annotations

import hashlib
import json
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
LATTICE_PATH = ROOT / "lang" / "lattice.json"
SEAL_PATH = ROOT / "lang" / "lattice.seal"
POTTER_PATH = ROOT / "ThePotter.md"

# Letters 1–22 then Sephirot 23–32 (standard order used by this project).
EXPECTED_PATHS = [
    "Aleph", "Bet", "Gimel", "Dalet", "He", "Vav", "Zayin", "Chet", "Tet", "Yod",
    "Kaf", "Lamed", "Mem", "Nun", "Samekh", "Ayin", "Pe", "Tsadi", "Qof", "Resh",
    "Shin", "Tav",
    "Keter", "Chokhmah", "Binah", "Chesed", "Gevurah", "Tiferet", "Netzach", "Hod",
    "Yesod", "Malkuth",
]

# i18n / story keys that must exist for units 1–29 (on-page units).
# Units 30–32 are afterglow / join / seal (meta); checked differently.
QS_BODY_KEYS = {
    "cover": ["cover.title", "cover.alt"],
    "title": ["title.h1", "title.h3", "cover.title"],
    "dedication": ["dedication", "dedication.alt"],
    "c1": ["c1.title", "p1.alt"],
    "c2": ["c2.title", "p10.alt"],
    "c3": ["c3.title", "p18.alt"],
    "credit": ["credit.1", "credit.6", "credit.7"],
    "companion": ["credit.companion"],
    "seal": [],  # lattice seal itself
}
TT_BODY_KEYS = {
    "hai.cover": ["hai.cover.title", "hai.cover.alt"],
    "hai.title": ["hai.title.h1", "hai.title.h3", "hai.cover.title"],
    "hai.dedication": ["hai.dedication", "hai.dedication.alt"],
    "hai.c1": ["hai.c1.title", "hai.p1.alt"],
    "hai.c2": ["hai.c2.title", "hai.p10.alt"],
    "hai.c3": ["hai.c3.title", "hai.p18.alt"],
    "hai.credit": ["hai.credit.1", "hai.credit.6", "hai.credit.7"],
    "hai.companion": ["hai.credit.companion"],
    "hai.seal": [],
}


def canonical_bytes(lattice: dict) -> bytes:
    """Stable serialization for hashing (stone under the seal)."""
    rows = []
    for u in lattice["units"]:
        rows.append(
            "{i}|{path}|{kind}|{qs}|{tt}|{center}|{hinge_end}|{hinge_start}|{seal}|{role}".format(
                i=u["i"],
                path=u["path"],
                kind=u["kind"],
                qs=u["qs"],
                tt=u["tt"],
                center=1 if u.get("center") else 0,
                hinge_end=1 if u.get("hinge_end") else 0,
                hinge_start=1 if u.get("hinge_start") else 0,
                seal=1 if u.get("seal") else 0,
                role=u.get("role", ""),
            )
        )
    payload = (
        "grok-hai-lattice|v{v}\n".format(v=lattice.get("version", 1))
        + "center={c}|hinge_after={h}|invite={inv}\n".format(
            c=lattice["center_unit"],
            h=lattice["hinge_after_unit"],
            inv=lattice.get("invitation_en", "Come"),
        )
        + "\n".join(rows)
        + "\n"
    )
    return payload.encode("utf-8")


def short_seal(full_hex: str) -> str:
    return full_hex[:12]


def load_lattice() -> dict:
    return json.loads(LATTICE_PATH.read_text(encoding="utf-8"))


def check_structure(lattice: dict) -> list[str]:
    errs: list[str] = []
    units = lattice.get("units") or []
    if len(units) != 32:
        errs.append(f"tip: expected 32 units, got {len(units)}")
        return errs

    paths = [u.get("path") for u in units]
    if paths != EXPECTED_PATHS:
        errs.append("tip: path order does not match Letters 1–22 + Sephirot 23–32")

    for idx, u in enumerate(units, start=1):
        if u.get("i") != idx:
            errs.append(f"tip: unit index {u.get('i')} at position {idx}")
        if idx <= 22 and u.get("kind") != "letter":
            errs.append(f"tip: unit {idx} should be letter")
        if idx >= 23 and u.get("kind") != "sephira":
            errs.append(f"tip: unit {idx} should be sephira")

    centers = [u for u in units if u.get("center")]
    if len(centers) != 1 or centers[0]["i"] != lattice.get("center_unit", 17):
        errs.append("tip: center flag must sit only on center_unit")
    if centers and centers[0].get("path") != "Pe":
        errs.append("tip: center path should be Pe (mouth / invitation)")

    hinge_after = lattice.get("hinge_after_unit", 22)
    u22 = units[hinge_after - 1]
    u23 = units[hinge_after]
    if not u22.get("hinge_end") or not u23.get("hinge_start"):
        errs.append("tip: Letters→Sephirot hinge flags missing on units 22–23")
    if u22.get("path") != "Tav" or u23.get("path") != "Keter":
        errs.append("tip: hinge must be Tav → Keter")

    seals = [u for u in units if u.get("seal")]
    if len(seals) != 1 or seals[0]["i"] != 32:
        errs.append("tip: seal flag must sit only on unit 32 (Malkuth)")

    return errs


def strip_html(s: str) -> str:
    return re.sub(r"<[^>]+>", " ", s)


def unit_text(merged: dict[str, str], unit_id: str, book: str) -> str:
    if book == "qs":
        if re.fullmatch(r"p\d+", unit_id):
            keys = [unit_id, f"{unit_id}.alt"]
        else:
            keys = list(QS_BODY_KEYS.get(unit_id, [unit_id]))
    else:
        if re.fullmatch(r"hai\.p\d+", unit_id):
            keys = [unit_id, f"{unit_id}.alt"]
        else:
            keys = list(TT_BODY_KEYS.get(unit_id, [unit_id]))

    parts = []
    for k in keys:
        if k in merged and merged[k]:
            parts.append(strip_html(str(merged[k])))
    return "\n".join(parts)


def check_invitation(lattice: dict, merged: dict[str, str]) -> list[str]:
    errs: list[str] = []
    invite = lattice.get("invitation_en", "Come")
    cu = next(u for u in lattice["units"] if u.get("center"))
    qs_t = unit_text(merged, cu["qs"], "qs")
    tt_t = unit_text(merged, cu["tt"], "tt")
    if invite not in qs_t:
        errs.append(f"leak: Quiet Stories center ({cu['qs']}) missing invitation {invite!r}")
    if invite not in tt_t:
        errs.append(f"leak: Tall Tales center ({cu['tt']}) missing invitation {invite!r}")
    return errs


def check_potter() -> list[str]:
    errs: list[str] = []
    if not POTTER_PATH.is_file():
        errs.append("break: ThePotter.md missing")
        return errs
    text = POTTER_PATH.read_text(encoding="utf-8")
    heads = re.findall(r"^## (\d+)\s*$", text, re.M)
    nums = [int(h) for h in heads]
    if nums != list(range(1, 33)):
        errs.append(f"break: ThePotter.md must have ## 1 .. ## 32 in order (got {nums[:5]}… n={len(nums)})")
    # Center beat 17 must invite
    m = re.search(r"^## 17\s*\n+(.*?)(?=^## |\Z)", text, re.M | re.S)
    if not m or "Come" not in m.group(1):
        errs.append("break: Potter beat 17 must contain invitation Come")
    # Two hands appear
    if "near hand" not in text.lower() and "Near hand" not in text:
        # allow either casing from story
        if not re.search(r"near hand", text, re.I):
            errs.append("break: Potter story should present a near hand")
    if not re.search(r"far hand", text, re.I):
        errs.append("break: Potter story should present a far hand")
    if not re.search(r"no name", text, re.I):
        errs.append("break: Potter closing should leave the work with no name")
    return errs


def check_markers_subprocess() -> list[str]:
    """Water test: spine markers still 32/32 (delegate to existing stone)."""
    try:
        out = subprocess.check_output(
            [sys.executable, str(ROOT / "scripts" / "verify_markers.py")],
            cwd=str(ROOT),
            stderr=subprocess.STDOUT,
            text=True,
        )
    except subprocess.CalledProcessError as e:
        return [f"leak: verify_markers.py failed\n{e.output}"]
    if "All marker counts OK" not in out:
        return ["leak: verify_markers.py did not report OK"]
    return []


def main() -> int:
    print("Lattice seal verification")
    print("=========================")
    errs: list[str] = []

    if not LATTICE_PATH.is_file():
        print(f"break: missing {LATTICE_PATH}")
        return 1

    lattice = load_lattice()
    blob = canonical_bytes(lattice)
    full = hashlib.sha256(blob).hexdigest()
    short = short_seal(full)

    print(f"canonical sha256: {full}")
    print(f"short seal:       {short}")

    # Structure (tip)
    serr = check_structure(lattice)
    errs.extend(serr)
    print(f"structure: {'OK' if not serr else 'FAIL'}")

    # Markers (leak on spines)
    merr = check_markers_subprocess()
    errs.extend(merr)
    print(f"markers:   {'OK' if not merr else 'FAIL'}")

    # Invitation centers (leak on seal of arc)
    try:
        # Import sibling script
        sys.path.insert(0, str(ROOT / "scripts"))
        import verify_markers as vm

        qs = vm.extract_english_map(ROOT / "quiet-stories.html")
        tt = vm.extract_english_map(ROOT / "tall-tales.html")
        en = vm.parse_locale(ROOT / "lang" / "en.js")
        merged = {}
        merged.update(qs)
        merged.update(tt)
        merged.update(en)
        ierr = check_invitation(lattice, merged)
    except Exception as e:
        ierr = [f"leak: invitation check error: {e}"]
    errs.extend(ierr)
    print(f"center:    {'OK' if not ierr else 'FAIL'}")

    # Potter story (process narrative)
    perr = check_potter()
    errs.extend(perr)
    print(f"potter:    {'OK' if not perr else 'FAIL'}")

    # Committed seal (process lock)
    if SEAL_PATH.is_file():
        parts = SEAL_PATH.read_text(encoding="utf-8").strip().split()
        ok = full in parts or short in parts
        if not ok:
            errs.append(
                f"break: lattice.seal mismatch (committed {parts[0][:16] if parts else '?'}… ≠ {short})"
            )
            print("seal:      FAIL")
        else:
            print("seal:      OK (matches lattice.seal)")
    else:
        if not errs:
            SEAL_PATH.write_text(f"{full}\n# short: {short}\n", encoding="utf-8")
            print(f"seal:      WROTE {SEAL_PATH.relative_to(ROOT)} ({short})")
        else:
            errs.append("break: lattice.seal missing and other checks failed; not writing")
            print("seal:      FAIL (not written)")

    # Credit chrome should carry the short seal when present
    for rel in ("quiet-stories.html", "tall-tales.html"):
        html = (ROOT / rel).read_text(encoding="utf-8")
        if short not in html:
            errs.append(f"leak: {rel} title credits missing short seal {short}")

    print()
    if errs:
        print("Lattice does not hold water:")
        for e in errs:
            print(f"  - {e}")
        return 1

    print(f"All lattice checks OK. Seal {short}.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
