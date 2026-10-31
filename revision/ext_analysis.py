#!/usr/bin/env python3
"""Summaries of the supplementary corpus run (revision/out/results_ext.jsonl)."""
import json
from pathlib import Path

import numpy as np
import pandas as pd

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "revision" / "out"
items = pd.DataFrame(json.load(open(ROOT / "revision/corpus_ext.json", encoding="utf-8"))["items"])
rows = [json.loads(l) for l in open(OUT / "results_ext.jsonl", encoding="utf-8")]
res = pd.DataFrame([{"key": r["key"], **x} for r in rows for x in r["results"]])
res["accepted"] = (res["outcome"] == "accept") | ((res["outcome"] == "non_boolean") &
                                                  res.get("returned", pd.Series(dtype=str)).fillna("").str.contains("truthy|promise"))
fn = pd.read_csv(ROOT / "results/function_level.csv")
fn["inclusive"] = fn["inclusive"].astype(str).str.lower().eq("true")
res = res.merge(items[["id", "field", "category", "expected", "base_id"]], on="id").merge(
    fn[["key", "model", "inclusive", "passes_control"]], on="key")
long = pd.read_csv(ROOT / "results/long_results.csv.gz", low_memory=False, usecols=["key", "id", "accepted"])

# --- NFD: paired with the NFC original
nfd = res[res["category"] == "nfd_variant"].merge(long.rename(columns={"id": "base_id", "accepted": "acc_nfc"}),
                                                   on=["key", "base_id"])
pair = (nfd.groupby(["model", "inclusive"])
        .apply(lambda g: pd.Series({
            "pairs": len(g), "functions": g["key"].nunique(),
            "accept_NFC_pct": round(100 * g["acc_nfc"].mean(), 1),
            "accept_NFD_pct": round(100 * g["accepted"].mean(), 1),
            "NFC_accepted_but_NFD_rejected_pct": round(100 * ((g["acc_nfc"] == 1) & (~g["accepted"])).sum() / max(1, (g["acc_nfc"] == 1).sum()), 1),
            "NFD_accepted_but_NFC_rejected": int(((g["acc_nfc"] == 0) & (g["accepted"])).sum())}), include_groups=False)
        .reset_index())
pair.to_csv(OUT / "ext_nfd.csv", index=False)

# --- negatives by category (function-level mean acceptance, then mean over functions)
neg = res[res["expected"] == "invalid"]
cat = (neg.groupby(["category", "model", "inclusive", "key"])["accepted"].mean()
       .groupby(["category", "model", "inclusive"]).mean().mul(100).round(1).unstack(["model", "inclusive"]))
cat.to_csv(OUT / "ext_negatives_by_category.csv")
tot = (neg.groupby(["model", "inclusive", "key"])["accepted"].mean().groupby(["model", "inclusive"]).mean()
       .mul(100).round(1).rename("FAR_supplementary_pct").reset_index())
tot.to_csv(OUT / "ext_far.csv", index=False)
to = res[res["outcome"] == "timeout"].groupby(["model", "inclusive", "category"]).agg(
    calls=("id", "size"), functions=("key", "nunique")).reset_index()
to.to_csv(OUT / "ext_timeouts.csv", index=False)
pd.set_option("display.width", 250)
print(pair.to_string(index=False))
print(cat.to_string())
print(tot.to_string(index=False))
print(to.to_string(index=False))
print("items", len(items), items.groupby("expected").size().to_dict(), "functions", res["key"].nunique())
