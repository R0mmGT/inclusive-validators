#!/usr/bin/env python3
"""Supplementary corpus requested in review (Reviewer 1, point 5).

Two parts, both written to revision/corpus_ext.json and never mixed with the
original corpus (the original results are unchanged):

1. Positive Unicode-normalisation variants: every valid non-control input whose
   NFD form differs from its (NFC) stored form, re-encoded as NFD (decomposed
   letters + combining marks).  Expected: valid.

2. Additional negative inputs, each with an explicit labelling rule (`rule`).
   The negative policy is deliberately narrow: an input is labelled invalid only
   if it cannot be a well-formed value of the field under any of the conventions
   the positive corpus represents.  Markup is kept as its own category and is
   NOT treated as a vulnerability: accepting "<script>" in a name field is a
   validation-policy choice, and output encoding is the defence against XSS.
"""
import json
import unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
corpus = json.load(open(ROOT / "corpus/corpus.json", encoding="utf-8"))["items"]

items = []


def add(field, value, expected, category, rule, base_id=None):
    items.append({"field": field, "value": value, "expected": expected, "category": category,
                  "rule": rule, "base_id": base_id, "id": f"ext-{field}-{len(items):04d}"})


# ---------- 1. NFD variants of valid inputs ----------
for it in corpus:
    if it["expected"] == "valid" and it["category"] != "control":
        nfd = unicodedata.normalize("NFD", it["value"])
        if nfd != it["value"]:
            add(it["field"], nfd, "valid", "nfd_variant",
                "Canonically equivalent (NFD) encoding of a valid input; Unicode treats both as the same text.",
                it["id"])

NAMES = ["full_name", "given_name", "family_name"]
SINGLE_LINE = NAMES + ["address_line", "postal_code", "phone_number"]
sample = {"full_name": "María José Pérez", "given_name": "María", "family_name": "Pérez",
          "address_line": "Calle Mayor 5", "postal_code": "28013", "phone_number": "+34 912 345 678"}

R_CTRL = "Contains a C0/C1 control character or DEL; no naming, addressing or numbering convention uses them."
R_NL = "Embedded line break in a single-line field."
R_BIDI = "Contains a bidirectional override (U+202E); never part of a name, address or number, used for spoofing."
R_LONG = ("5,000 characters; far beyond any real value of the field, so a validator without a length bound "
          "accepts it (boundary/length-guard probe).")
R_MARK = "A lone combining mark with no base character is not a well-formed grapheme."
R_SURR = "Unpaired surrogate code unit; not a valid Unicode scalar value."
R_ZW = "Only zero-width characters; visually empty."

for f in SINGLE_LINE:
    s = sample[f]
    add(f, s[:2] + "\u0007" + s[2:], "invalid", "control_char", R_CTRL)
    add(f, s + "\u007f", "invalid", "control_char", R_CTRL)
    add(f, s[:2] + "\u0085" + s[2:], "invalid", "control_char", R_CTRL)
    add(f, s[:3] + "\n" + s[3:], "invalid", "line_break", R_NL)
    add(f, s[:3] + "\r\n" + s[3:], "invalid", "line_break", R_NL)
    add(f, "‮" + s, "invalid", "bidi_override", R_BIDI)
    add(f, "​​​", "invalid", "zero_width_only", R_ZW)

for f in NAMES + ["address_line"]:
    add(f, "́", "invalid", "lone_combining_mark", R_MARK)
    add(f, "Ana\ud800", "invalid", "unpaired_surrogate", R_SURR)
    add(f, ("Abcdefghij " * 455)[:5000], "invalid", "excessive_length", R_LONG)

add("postal_code", "1" * 5000, "invalid", "excessive_length", R_LONG)
add("phone_number", "1" * 5000, "invalid", "excessive_length", R_LONG)

# Postal-code boundary lengths: real codes have 3-10 characters (UPU addressing systems).
for v in ["1", "12"]:
    add("postal_code", v, "invalid", "too_short", "Shorter than any national postal-code format (minimum 3 characters).")
for v in ["12345678901", "ABCDE-123456"]:
    add("postal_code", v, "invalid", "too_long", "Longer than any national postal-code format (maximum 10 characters).")
for v in ["-28013", "28013-", "28--013"]:
    add("postal_code", v, "invalid", "malformed_separator", "Separator at a boundary or doubled; no national format has this shape.")

# Malformed telephone numbers (ITU-T E.164 / E.123).
PH = [
    ("++34 912 345 678", "Doubled international prefix symbol."),
    ("+34 912 +345 678", "'+' may only appear as the first character."),
    ("+34 (912 345 678", "Unbalanced parenthesis."),
    ("+34 912) 345 678", "Unbalanced parenthesis."),
    ("+34 912 345 67O", "Letter O in place of a digit."),
    ("+0 912 345 678", "Country codes never start with 0 (E.164)."),
    ("+3491234567890123", "More than 15 digits after '+' (E.164 maximum)."),
    ("+", "International prefix with no digits."),
    ("+34 912 345 678 ext", "Trailing word without an extension number."),
    ("12345", "Five digits: shorter than any complete subscriber number with country context."),
]
for v, why in PH:
    add("phone_number", v, "invalid", "malformed_phone", why)

out = ROOT / "revision" / "corpus_ext.json"
json.dump({"items": items}, open(out, "w", encoding="utf-8"), ensure_ascii=True, indent=1)
from collections import Counter
print(len(items), Counter((i["field"], i["category"]) for i in items))
