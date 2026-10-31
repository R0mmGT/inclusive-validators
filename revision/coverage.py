"""Analysis-coverage table for the ReDoS pipeline (Reviewer 1, comment on coverage).

Usage: python revision/coverage.py
Reads data/extracted.jsonl, data/redos.jsonl; writes revision/out/coverage_*.csv
"""
import json
from collections import Counter
from pathlib import Path
import pandas as pd

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "revision" / "out"
OUT.mkdir(parents=True, exist_ok=True)
rd = lambda p: [json.loads(l) for l in open(ROOT / p, encoding="utf-8") if l.strip()]

ex = pd.DataFrame(rd("data/extracted.jsonl"))
red = {r["key"]: r for r in rd("data/redos.jsonl")}
MODELS = ["gemini-3.8-flash", "gpt-5-mini", "DeepSeek-V3.2", "llama3.1:8b-instruct-q8_0"]

def fn_rows(sub):
    c = Counter()
    for _, e in sub.iterrows():
        c["generations"] += 1
        if e.status != "ok":
            c["no_code_extracted"] += 1
            continue
        r = red[e.key]
        c["extracted"] += 1
        c["loadable"] += bool(r.get("loadable"))
        if r["parse_error"]:
            c["acorn_parse_failed"] += 1
            c["acorn_parse_failed_and_loadable"] += bool(r.get("loadable"))
            continue
        c["parsed"] += 1
        stat = [x for x in r["regexes"] if x["kind"] != "dynamic"]
        if r["n_regex"] == 0:
            c["parsed_no_regex"] += 1
        elif not stat:
            c["parsed_only_dynamic_regex"] += 1
        else:
            c["parsed_with_analyzable_regex"] += 1
        c["parsed_with_any_dynamic"] += r["n_dynamic"] > 0
        if any(x["recheck_status"] not in ("safe", "vulnerable") for x in stat):
            c["with_unresolved_pattern"] += 1
        if r.get("static_vulnerable"):
            c["static_vulnerable"] += 1
            if not r.get("loadable"):
                c["static_vulnerable_not_loadable"] += 1
            if r.get("confirmed_vulnerable"):
                c["confirmed"] += 1
            else:
                c["static_vulnerable_not_confirmed"] += 1
    return c

def pat_rows(sub):
    c = Counter()
    for _, e in sub.iterrows():
        if e.status != "ok":
            continue
        r = red[e.key]
        if r["parse_error"]:
            continue
        c["dynamic_occurrences"] += r["n_dynamic"]
        for x in r["regexes"]:
            c[f"kind_{x['kind']}"] += 1
            c[f"recheck_{x['recheck_status']}"] += 1
            if x["recheck_status"] == "vulnerable":
                c[f"vuln_{x['complexity']}"] += 1
                cf = x.get("confirm")
                if cf is None:
                    c["confirm_not_attempted_unloadable"] += 1
                else:
                    reason = cf["reason"]
                    if reason == "exponent":
                        reason = "exponent_ge_threshold" if cf["confirmed"] else "exponent_below_threshold"
                    c[f"confirm_{reason}"] += 1
    return c

fn = {m: fn_rows(ex[ex.model == m]) for m in MODELS}
fn["Total"] = fn_rows(ex)
pat = {m: pat_rows(ex[ex.model == m]) for m in MODELS}
pat["Total"] = pat_rows(ex)
fdf = pd.DataFrame(fn).fillna(0).astype(int)
pdf = pd.DataFrame(pat).fillna(0).astype(int)
fdf.to_csv(OUT / "coverage_functions.csv")
pdf.to_csv(OUT / "coverage_patterns.csv")

# distinct patterns across the corpus
uniq = {}
for r in red.values():
    for x in r["regexes"]:
        if x["kind"] != "dynamic":
            uniq[f"/{x['pattern']}/{x['flags']}"] = x["recheck_status"]
u = Counter(uniq.values())
pd.Series({"distinct_patterns": len(uniq), **{f"distinct_{k}": v for k, v in u.items()}}).to_csv(OUT / "coverage_distinct.csv")

# per-instruction denominators for confirmed rate: per extracted output and per usable validator
rows = []
for m in MODELS + ["Total"]:
    for inc in (False, True):
        sub = ex[(ex.inclusive == inc) & ((ex.model == m) if m != "Total" else True)]
        keys = sub[sub.status == "ok"].key
        conf = sum(red[k].get("confirmed_vulnerable", False) for k in keys)
        usable = sum(red[k].get("loadable", False) for k in keys)
        rows.append({"model": m, "inclusive": inc, "generations": len(sub), "extracted": len(keys),
                     "usable": usable, "confirmed": conf})
pd.DataFrame(rows).to_csv(OUT / "coverage_denominators.csv", index=False)
print(fdf.to_string()); print(); print(pdf.to_string()); print(); print(u, len(uniq))
