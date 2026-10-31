#!/usr/bin/env python3
"""Re-apply the growth-based confirmation rule offline to recorded growth curves.

Inputs : revision/out/curves_<config>.jsonl  (from revision/curves.js)
         revision/out/attacks.json           (stored Windows classification per pattern occurrence)
Outputs: revision/out/curve_classification.csv   one row per (config, item, rule)
         revision/out/agreement.csv              agreement with the stored run, per config (original rule)
         revision/out/threshold_grid.csv         confirmed counts / agreement under a grid of thresholds
         revision/out/synthetic_accuracy.csv     validation-suite accuracy per config
         revision/out/dynamic_confirmed.csv      run-time (dynamic) patterns confirmed per config
"""
import glob
import itertools
import json
import math
from pathlib import Path

import numpy as np
import pandas as pd

OUT = Path(__file__).resolve().parent / "out"
MAX_LEN = 1_000_000


def classify(pts, floor=20.0, exponent=1.5, timeout=2000.0):
    """Original rule (harness/redos.js) applied to a recorded curve.

    Points are t(k) for k = 1, 2, 4, ...  A point is a timeout if it was censored at
    the recording limit or its time exceeds `timeout`.  Walking k upwards: a timeout
    confirms; once t(k/2) >= floor, the exponent e = 0.5*log2(t(2k)/t(k/2)) is computed
    (a timeout at 2k confirms) and the pattern is confirmed iff e >= exponent.
    """
    to = lambda p: p["timeout"] or (p["ms"] is not None and p["ms"] > timeout)
    prev = None
    for i, cur in enumerate(pts):
        if to(cur):
            return True, "timeout_after_growth" if prev else "timeout_at_k1", None
        if prev is not None and prev["ms"] >= floor:
            if i + 1 >= len(pts):
                return None, "next_point_beyond_cap", None
            nxt = pts[i + 1]
            if to(nxt):
                return True, "timeout_after_growth", None
            e = 0.5 * math.log2(max(nxt["ms"], 1e-6) / max(prev["ms"], 1e-6))
            return e >= exponent, "exponent", round(e, 2)
        prev = cur
    return False, "no_slowdown_up_to_max_length", None


def fitted_exponent(pts, min_ms=5.0):
    """Least-squares slope of log t on log n over the points with t >= min_ms (descriptive)."""
    xs = [(math.log(p["len"]), math.log(p["ms"])) for p in pts if not p["timeout"] and p["ms"] and p["ms"] >= min_ms]
    if len(xs) < 3:
        return None
    mx = sum(x for x, _ in xs) / len(xs)
    my = sum(y for _, y in xs) / len(xs)
    sxx = sum((x - mx) ** 2 for x, _ in xs)
    return round(sum((x - mx) * (y - my) for x, y in xs) / sxx, 2) if sxx else None


def load_curves():
    rows = []
    for f in sorted(glob.glob(str(OUT / "curves_*.jsonl"))):
        lines = [json.loads(l) for l in open(f, encoding="utf-8") if l.strip()]
        meta = lines[0]["meta"]
        complete = any("meta_end" in l for l in lines)
        for l in lines[1:]:
            if "key" in l:
                rows.append({**l, "config": meta["config"], "complete": complete,
                             "node": meta["node"], "v8": meta["v8"], "execArgv": " ".join(meta["execArgv"]),
                             "warmup": meta["warmup"]})
    return rows


def main():
    attacks = json.load(open(OUT / "attacks.json", encoding="utf-8"))
    # index of item ids within each (key, pattern, flags) as curves.js writes them in attacks.json order
    stored = {}
    for a in attacks:
        if a.get("loadable") and a.get("attack"):
            stored.setdefault((a["key"], a["pattern"], a["flags"]), []).append(a)
    curves = load_curves()

    out = []
    seen = {}
    for c in curves:
        if "pts" not in c:
            continue
        ident = (c["config"], c["key"], c["pattern"], c["flags"])
        j = seen.get(ident, 0)
        seen[ident] = j + 1
        st = None
        if c["source"] != "synthetic":
            st = stored[(c["key"], c["pattern"], c["flags"])][j]
        conf, reason, e = classify(c["pts"])
        out.append({
            "config": c["config"], "complete": c["complete"], "node": c["node"], "execArgv": c["execArgv"],
            "warmup": c["warmup"], "key": c["key"], "occ": j, "field": c["field"], "source": c["source"],
            "pattern": c["pattern"], "flags": c["flags"], "complexity": c["complexity"],
            "expected": c["expected"], "procedure_expected": c["procedure_expected"],
            "confirmed": conf, "reason": reason, "exponent": e, "fitted_exponent": fitted_exponent(c["pts"]),
            "max_ms": max([p["ms"] for p in c["pts"] if p["ms"] is not None] or [0]),
            "censored": any(p["timeout"] for p in c["pts"]),
            "stored_confirmed": None if st is None else st["stored_confirmed"],
            "stored_reason": None if st is None or not st.get("stored_confirm") else st["stored_confirm"].get("reason"),
            "stored_exponent": None if st is None or not st.get("stored_confirm") else st["stored_confirm"].get("exponent"),
            "pts": c["pts"],
        })
    df = pd.DataFrame(out)
    df.drop(columns=["pts"]).to_csv(OUT / "curve_classification.csv", index=False)

    # ---- agreement with the stored (Windows) run, static occurrences only ----
    st = df[(df["source"] == "static") & df["stored_confirmed"].notna()].copy()
    st["stored_confirmed"] = st["stored_confirmed"].astype(bool)
    agr = []
    for cfg, g in st.groupby("config"):
        y, x = g["stored_confirmed"], g["confirmed"].fillna(False).astype(bool)
        n, a = len(g), int((x == y).sum())
        po = a / n
        p1, p2 = y.mean(), x.mean()
        pe = p1 * p2 + (1 - p1) * (1 - p2)
        kappa = (po - pe) / (1 - pe) if pe < 1 else float("nan")
        # function level: a function is confirmed if any of its occurrences is confirmed
        fy = g.groupby("key")["stored_confirmed"].any()
        fx = g.assign(c=x).groupby("key")["c"].any()
        agr.append({"config": cfg, "complete": bool(g["complete"].iloc[0]), "occurrences": n,
                    "stored_confirmed": int(y.sum()), "config_confirmed": int(x.sum()),
                    "agree": a, "agreement": round(po, 4), "kappa": round(kappa, 3),
                    "only_stored": int((y & ~x).sum()), "only_config": int((~y & x).sum()),
                    "undetermined": int(g["confirmed"].isna().sum()),
                    "functions": len(fy), "functions_stored_confirmed": int(fy.sum()),
                    "functions_config_confirmed": int(fx.sum()), "functions_agree": int((fx == fy).sum())})
    pd.DataFrame(agr).to_csv(OUT / "agreement.csv", index=False)

    # ---- threshold grid (re-applied to the curves of each configuration) ----
    grid = []
    for cfg, g in df[df["source"] == "static"].groupby("config"):
        for floor, ex, to in itertools.product([10, 20, 50, 100], [1.3, 1.5, 1.8], [1000, 2000, 5000]):
            res = [classify(p, floor, ex, to)[0] for p in g["pts"]]
            x = pd.Series([bool(r) for r in res], index=g.index)
            y = g["stored_confirmed"].astype(bool)
            fx = g.assign(c=x).groupby("key")["c"].any()
            fy = g.groupby("key")["stored_confirmed"].any()
            grid.append({"config": cfg, "floor_ms": floor, "exponent": ex, "timeout_ms": to,
                         "occ_confirmed": int(x.sum()), "occ_agree_with_stored": round((x == y).mean(), 4),
                         "functions_confirmed": int(fx.sum()),
                         "functions_agree_with_stored": round((fx == fy).mean(), 4)})
    pd.DataFrame(grid).to_csv(OUT / "threshold_grid.csv", index=False)

    # ---- synthetic validation suite ----
    sy = df[df["source"] == "synthetic"].copy()
    sy["correct_vs_truth"] = sy["confirmed"].fillna(False).astype(bool) == sy["expected"].astype(bool)
    sy["correct_vs_procedure"] = sy["confirmed"].fillna(False).astype(bool) == sy["procedure_expected"].astype(bool)
    sy.drop(columns=["pts"]).to_csv(OUT / "synthetic_accuracy.csv", index=False)

    # ---- dynamic (run-time) patterns ----
    dy = df[df["source"] == "dynamic"]
    dy.drop(columns=["pts"]).to_csv(OUT / "dynamic_confirmed.csv", index=False)

    # ---- grid summary per configuration, confirmed counts by model x instruction ----
    gs = pd.DataFrame(grid).groupby("config").agg(min_functions=("functions_confirmed", "min"),
                                                   max_functions=("functions_confirmed", "max"),
                                                   min_agree=("functions_agree_with_stored", "min"))
    gs.to_csv(OUT / "threshold_grid_summary.csv")
    st2 = df[df["source"].isin(["static", "dynamic"])].copy()
    st2["model"] = st2["key"].str.split("__").str[0]
    st2["instruction"] = np.where(st2["key"].str.split("__").str[4] == "incl", "with", "without")
    byc = (st2.assign(c=st2["confirmed"].fillna(False).astype(bool))
           .groupby(["config", "source", "model", "instruction", "key"])["c"].any()
           .groupby(["config", "source", "model", "instruction"]).sum().unstack(["source"]).fillna(0).astype(int))
    byc.to_csv(OUT / "confirmed_by_config_model.csv")
    # alternative rule: least-squares exponent over all points >= 5 ms (censored points ignored) >= 1.5, or any timeout
    alt = []
    for cfg, g in df[df["source"] == "static"].groupby("config"):
        x = g["fitted_exponent"].fillna(0).ge(1.5) | g["censored"]
        y = g["stored_confirmed"].astype(bool)
        fx = g.assign(c=x).groupby("key")["c"].any()
        fy = g.groupby("key")["stored_confirmed"].any()
        alt.append({"config": cfg, "functions_confirmed_alt": int(fx.sum()), "functions_agree": int((fx == fy).sum()),
                    "functions": len(fx)})
    pd.DataFrame(alt).to_csv(OUT / "alt_rule.csv", index=False)
    print(gs.to_string()); print(pd.DataFrame(alt).to_string(index=False)); print(byc.to_string())
    print(pd.DataFrame(agr).to_string(index=False))
    print(sy.groupby("config")[["correct_vs_truth", "correct_vs_procedure"]].sum())
    print(dy.groupby("config")["confirmed"].apply(lambda s: int(s.fillna(False).sum())))


if __name__ == "__main__":
    main()
