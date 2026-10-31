#!/usr/bin/env python3
"""Structural coding of the confirmed vulnerable patterns (Reviewer 1, point 6).

Each confirmed pattern occurrence is assigned one primary structural category by
ordered rules (first match wins); the assignment was then checked by hand
(revision/out/vuln_coding.csv lists every pattern with its category).
Output: revision/out/vuln_coding.csv, revision/out/vuln_coding_summary.csv
"""
import json
import re
from pathlib import Path

import pandas as pd

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "revision" / "out"
LETTER_LIKE_SEPARATORS = ["\\u02BC", "\\u02BB", "\\u02BF", "ʼ", "ʻ"]   # modifier letters: \p{Lm}, i.e. inside \p{L}

CATS = {
    "A_name_separator_overlaps_letters": "Repeated name-part group whose separator class contains modifier letters "
                                         "(U+02BB/U+02BC, category Lm) that \\p{L} also matches, or an alternation "
                                         "whose branches overlap",
    "B_name_optional_separator": "Repeated name-part group with an optional separator, (?:[sep]?\\p{L}+)*",
    "C_digit_groups_optional_separator": "Repeated digit groups with optional separators, (?:\\d{1,4}[-. ]?)*",
    "D_classic_nested_quantifier": "Other nested quantifier, (x+)+ or (x*\\s?)+",
    "E_trim_regex": "Whitespace-trimming regex ^\\s+|\\s+$ (or \\s+$) evaluated as a search",
    "F_unanchored_extension_suffix": "Unanchored search for a telephone extension suffix with leading \\s* or "
                                     "an unbounded token, e.g. \\s*(?:ext|x|#)\\s*\\d+$",
    "G_adjacent_overlapping_quantifiers": "Adjacent or optional-separated quantifiers over overlapping classes, "
                                          "e.g. ^[A-Z0-9]+ ?[A-Z0-9]+$",
    "H_unanchored_dot_star": "Unanchored search with .* (e.g. [A-Za-z].*\\d, (.*)$)",
}


def code(p):
    s = p
    if any(x in s for x in LETTER_LIKE_SEPARATORS) and re.search(r"\)\*", s):
        return "A_name_separator_overlaps_letters"
    if re.search(r"\[\\p\{L\}\\p\{M\} \\-'\.\]\|\\p\{Pd\}", s):
        return "A_name_separator_overlaps_letters"
    if re.search(r"\(\?:\[[^\]]*\]\?\[\\p\{L\}", s) or re.search(r"\(\?:\[[^\]]*\]\?\[\\p\{L\}\\p\{M\}\]\+\)\*", s):
        return "B_name_optional_separator"
    if "\\d{1,4}" in s and re.search(r"\)\*|\)\{2,\}", s):
        return "C_digit_groups_optional_separator"
    if re.search(r"\\d\{1,4\}\)\?\[", s) or re.search(r"\(\?:\[1-9\]\\d\{1,4\}\[\\s\.-\]\?\)\{2,\}", s):
        return "C_digit_groups_optional_separator"
    if re.fullmatch(r"\^?\\s\+\|\\s\+\$|\\s\+\$", s) or re.search(r"^\^\[\\s[^\]]*\]\+\|\[\\s", s) \
            or re.search(r"^\^\\p\{Zs\}\+\|", s) or re.search(r"^\^\[\\p\{Zs\}", s):
        return "E_trim_regex"
    if re.search(r"ext|extension", s, re.I) and not s.startswith("^"):
        return "F_unanchored_extension_suffix"
    if s.startswith("^\\s*(?:\\+|00|011)"):
        return "G_adjacent_overlapping_quantifiers"
    if re.search(r"\([^()]*[+*]\\s\?\)\+|\([^()]*\{1,40\}\)\+|\(\\s\*\[[^\]]*\]\*\)\*|\( \[[^\]]*\]\*\)\*", s):
        return "D_classic_nested_quantifier"
    if (".*" in s) and not re.match(r"\^\(\?=", s):
        return "H_unanchored_dot_star"
    return "G_adjacent_overlapping_quantifiers"


attacks = json.load(open(OUT / "attacks.json", encoding="utf-8"))
rows = []
for a in attacks:
    if a["source"] == "static" and a.get("stored_confirmed"):
        k = a["key"].split("__")
        c = a["stored_confirm"] or {}
        rows.append({"key": a["key"], "model": k[0], "field": a["field"], "language": k[2], "context": k[3],
                     "instruction": "with" if k[4] != "base" else "without",
                     "recheck_complexity": a["complexity"], "pattern": a["pattern"], "flags": a["flags"],
                     "attack_pump": json.dumps(a["attack"].get("pumps") if isinstance(a["attack"], dict) else a["attack"],
                                               ensure_ascii=False)[:120],
                     "confirm_reason": c.get("reason"), "exponent": c.get("exponent"),
                     "category": code(a["pattern"])})
df = pd.DataFrame(rows)
df.to_csv(OUT / "vuln_coding.csv", index=False)
fn = df.drop_duplicates("key")
summ = (fn.groupby(["category"]).agg(functions=("key", "size"),
                                     exponential=("recheck_complexity", lambda s: int((s == "exponential").sum())),
                                     polynomial=("recheck_complexity", lambda s: int((s == "polynomial").sum())),
                                     with_instruction=("instruction", lambda s: int((s == "with").sum())),
                                     fields=("field", lambda s: ", ".join(f"{k} {v}" for k, v in s.value_counts().items())),
                                     models=("model", lambda s: ", ".join(f"{k} {v}" for k, v in s.value_counts().items())))
        .reset_index())
summ["description"] = summ["category"].map(CATS)
summ.to_csv(OUT / "vuln_coding_summary.csv", index=False)
pd.set_option("display.width", 250, "display.max_colwidth", 90)
print(summ.drop(columns="description").to_string(index=False))
print(df.groupby(["category", "pattern"]).size().reset_index().drop(columns=0).to_string())
