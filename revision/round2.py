#!/usr/bin/env python3
"""

Reads only stored data and earlier outputs of revision/; writes revision/out/round2/.

  1. exponential_vs_polynomial.csv  confirmed functions by model, instruction and complexity, with Fisher tests
                                    and the input length at which each exceeded 1 s (configuration B)
  2. sensitivity.csv                the ReDoS comparison under alternative estimands (Table A8)
  3. language_effect.csv            prompt language: malfunction (fails control) and false rejection among
                                    control-passing validators, with function, prompt-cell and two-way clustering
  4. far_separation.csv             false acceptance: events, Firth, function-level Fisher, leave-one-input-out GEE
  5. dynamic_counts.csv             dynamic call sites versus patterns captured at run time
  6. coding_agreement.csv           agreement of the two authors' reviews of the structural coding
Usage: python revision/round2.py
"""
import json
import warnings
from pathlib import Path

import numpy as np
import pandas as pd
import patsy
import statsmodels.api as sm
import statsmodels.formula.api as smf
from scipy.stats import fisher_exact, norm

warnings.simplefilter("ignore")
ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "revision" / "out"
R2 = OUT / "round2"
R2.mkdir(parents=True, exist_ok=True)
MODELS = ["gpt-5-mini", "gemini-3.8-flash", "DeepSeek-V3.2", "llama3.1:8b-instruct-q8_0"]
BASE = "y ~ C(model, Treatment('DeepSeek-V3.2')) + C(language) + C(context) + inclusive + C(field)"
summary = []


def say(*a):
    s = " ".join(str(x) for x in a)
    print(s)
    summary.append(s)


def firth(X, y, maxiter=200, tol=1e-8):
    """Firth-penalized logistic regression (same implementation as functional.py)."""
    beta = np.zeros(X.shape[1])
    for _ in range(maxiter):
        p = 1 / (1 + np.exp(-X @ beta)); W = p * (1 - p)
        inv = np.linalg.inv(X.T @ (X * W[:, None]))
        Xw = X * np.sqrt(W)[:, None]
        h = np.einsum("ij,jk,ik->i", Xw, inv, Xw)
        step = inv @ (X.T @ (y - p + h * (0.5 - p))); beta += step
        if np.max(np.abs(step)) < tol:
            break
    p = 1 / (1 + np.exp(-X @ beta)); W = p * (1 - p)
    return beta, np.sqrt(np.diag(np.linalg.inv(X.T @ (X * W[:, None]))))


def fisher(a, n1, b, n0):
    return fisher_exact([[a, n1 - a], [b, n0 - b]])[1]


fn = pd.read_csv(ROOT / "results/function_level.csv")
fn["inc"] = fn["inclusive"].astype(str).str.lower().eq("true").astype(int)
n_extracted = {("gpt-5-mini", 0): 239}
N = lambda m, i: n_extracted.get((m, i), 240)
usable = fn.groupby(["model", "inc"]).size()

# ------------------------------------------------------------------ 1. exponential vs polynomial
vc = pd.read_csv(OUT / "vuln_coding.csv")
vc["model"] = vc["model"].replace({"llama3.1-8b-instruct-q8_0": "llama3.1:8b-instruct-q8_0"})
vc["inc"] = (vc["instruction"] == "with").astype(int)
conf = set(zip(vc.key, vc.pattern))
cx = dict(zip(zip(vc.key, vc.pattern), vc.recheck_complexity))
first_len = {}
for line in open(OUT / "curves_node20_idle.jsonl", encoding="utf-8"):
    r = json.loads(line)
    if "pts" not in r or r.get("source") != "static" or (r["key"], r["pattern"]) not in conf:
        continue
    L = next((p["len"] for p in r["pts"] if p["timeout"] or (p["ms"] or 0) > 1000), None)
    if L is not None:
        first_len[r["key"]] = min(L, first_len.get(r["key"], L))
f = vc.groupby(["key", "model", "inc"]).agg(exponential=("recheck_complexity", lambda s: (s == "exponential").any())).reset_index()
f["len_1s"] = f["key"].map(first_len)
f.to_csv(R2 / "confirmed_functions_complexity.csv", index=False)
rows = []
for m in MODELS:
    for cls, sel in (("exponential", f.exponential), ("polynomial_only", ~f.exponential)):
        a = int(((f.model == m) & (f.inc == 1) & sel).sum()); b = int(((f.model == m) & (f.inc == 0) & sel).sum())
        g = f[(f.model == m) & sel]
        rows.append({"model": m, "class": cls, "without": b, "with": a, "fisher_p": fisher(a, N(m, 1), b, N(m, 0)),
                     "len_1s_min": g.len_1s.min(), "len_1s_median": g.len_1s.median(), "len_1s_max": g.len_1s.max()})
ep = pd.DataFrame(rows); ep.to_csv(R2 / "exponential_vs_polynomial.csv", index=False)
say("== exponential vs polynomial"); say(ep.to_string(index=False))
for cls, sel in (("exponential", f.exponential), ("polynomial_only", ~f.exponential)):
    g = f[sel]
    say(cls, "functions", len(g), "len_1s median", g.len_1s.median(), "range", g.len_1s.min(), "-", g.len_1s.max(),
        "| <=100000 chars:", int((g.len_1s <= 100_000).sum()))

# ------------------------------------------------------------------ 2. sensitivity (Table A8)
probe = json.load(open(OUT / "adaptive_probe.json", encoding="utf-8"))
hit = lambda r: bool(r) and (r.get("timeout") or (r.get("ms") or 0) > 2000)
probe_keys = {p["key"] for p in probe if hit(p.get("recheck_suffix")) or hit(p.get("bang_suffix"))}
dyn = pd.read_csv(OUT / "dynamic_confirmed.csv")
dyn_keys = set(dyn[(dyn.config == "node20_idle") & (dyn.confirmed == True)].key)
cell = lambda k: "__".join(k.split("__")[1:4])
sens = []
for m in MODELS:
    pre = m.replace(":", "-") + "__"
    c = lambda i, keys: len({k for k in keys if k.startswith(pre) and (k.split("__")[4] == "incl") == bool(i)})
    base = set(vc.key)
    row = {"model": m}
    for i in (0, 1):
        t = "with" if i else "without"
        row[f"primary_{t}"] = f"{c(i, base)}/{N(m, i)}"
        row[f"usable_{t}"] = f"{c(i, base)}/{usable.get((m, i), 0)}"
        row[f"exponential_{t}"] = c(i, set(f[f.exponential].key))
        row[f"prompt_cells_{t}"] = len({cell(k) for k in base if k.startswith(pre) and (k.split("__")[4] == "incl") == bool(i)})
        row[f"with_probe_{t}"] = c(i, base | probe_keys)
        row[f"with_dynamic_{t}"] = c(i, base | dyn_keys)
    sens.append(row)
sens = pd.DataFrame(sens); sens.to_csv(R2 / "sensitivity.csv", index=False)
say("== sensitivity (Table A8)"); say(sens.to_string(index=False))
g = sens[sens.model == "gpt-5-mini"].iloc[0]
num = lambda s: int(str(s).split("/")[0])
say("GPT-5 mini Fisher p: usable", fisher(32, usable[("gpt-5-mini", 1)], 0, usable[("gpt-5-mini", 0)]),
    "| exponential", fisher(g.exponential_with, 240, g.exponential_without, 239),
    "| prompt cells", fisher(g.prompt_cells_with, 24, g.prompt_cells_without, 24),
    "| probe", fisher(g.with_probe_with, 240, g.with_probe_without, 239),
    "| dynamic", fisher(g.with_dynamic_with, 240, g.with_dynamic_without, 239))

# ------------------------------------------------------------------ 3. language effect
long = pd.read_csv(ROOT / "results/long_results.csv.gz", low_memory=False)
long["inclusive"] = long["inclusive"].astype(str).str.lower().eq("true").astype(int)
long["cell"] = long[["model", "field", "language", "context", "inclusive"]].astype(str).agg("|".join, axis=1)
T = "C(language)[T.es]"
lang = []
fn["fc"] = fn["fails_control"].astype(int)
fn["inclusive"] = fn["inc"]
fn["cell"] = fn[["model", "field", "language", "context", "inclusive"]].astype(str).agg("|".join, axis=1)
for lab, kw in (("logit", {}), ("logit, prompt-cell clusters", {"cov_type": "cluster", "cov_kwds": {"groups": pd.factorize(fn["cell"])[0]}})):
    r = smf.logit(BASE.replace("y ~", "fc ~"), fn).fit(disp=0, **kw); ci = np.exp(r.conf_int().loc[T].values)
    lang.append({"outcome": "fails control", "subset": "usable", "method": lab, "OR": np.exp(r.params[T]), "ci_low": ci[0], "ci_high": ci[1], "p": r.pvalues[T]})
say("fails control by language:", fn.groupby("language").fc.agg(["sum", "count"]).to_dict())
pcs = set(fn[fn.passes_control == 1].key)
v = long[(long.expected == "valid") & (long.category != "control") & long.key.isin(pcs)].copy(); v["y"] = 1 - v["accepted"]
INTER = "y ~ C(model, Treatment('DeepSeek-V3.2'))*inclusive + C(language) + C(context) + C(field)"
for form, flab in ((BASE, "main effects"), (INTER, "interaction (Table A3)")):
    for grp in ("key", "cell"):
        r = smf.gee(form, groups=v[grp], data=v, family=sm.families.Binomial(), cov_struct=sm.cov_struct.Exchangeable()).fit(maxiter=200)
        ci = np.exp(r.conf_int().loc[T].values)
        lang.append({"outcome": "false rejection", "subset": "control-passing", "method": f"GEE {flab}, clusters={grp}",
                     "OR": np.exp(r.params[T]), "ci_low": ci[0], "ci_high": ci[1], "p": r.pvalues[T]})
gidx = np.column_stack([pd.factorize(v["cell"])[0], pd.factorize(v["id"])[0]])
r = smf.glm(BASE, data=v, family=sm.families.Binomial()).fit(cov_type="cluster", cov_kwds={"groups": gidx})
ci = np.exp(r.conf_int().loc[T].values)
lang.append({"outcome": "false rejection", "subset": "control-passing", "method": "GLM, two-way clusters (prompt cell x input)",
             "OR": np.exp(r.params[T]), "ci_low": ci[0], "ci_high": ci[1], "p": r.pvalues[T]})
for m, g in v.groupby("model"):
    r = smf.gee("y ~ C(language) + C(context) + inclusive + C(field)", groups=g["key"], data=g,
                family=sm.families.Binomial(), cov_struct=sm.cov_struct.Exchangeable()).fit(maxiter=200)
    ci = np.exp(r.conf_int().loc[T].values)
    lang.append({"outcome": "false rejection", "subset": f"control-passing, {m}", "method": "GEE, clusters=key",
                 "OR": np.exp(r.params[T]), "ci_low": ci[0], "ci_high": ci[1], "p": r.pvalues[T]})
lang = pd.DataFrame(lang); lang.to_csv(R2 / "language_effect.csv", index=False)
say("== language effect"); say(lang.round(4).to_string(index=False))

# ------------------------------------------------------------------ 4. false acceptance, near-separation
inv = long[long.expected == "invalid"].copy(); inv["y"] = inv["accepted"]
far = []
ev = inv.groupby(["model", "inclusive"]).y.agg(["sum", "size"]).reset_index()
say("== false acceptance events"); say(ev.to_string(index=False))
r = smf.gee(BASE, groups=inv.key, data=inv, family=sm.families.Binomial(), cov_struct=sm.cov_struct.Exchangeable()).fit(maxiter=200)
far.append({"check": "GEE (reported model)", "OR": np.exp(r.params["inclusive"]), "ci_low": np.exp(r.conf_int().loc["inclusive"][0]),
            "ci_high": np.exp(r.conf_int().loc["inclusive"][1]), "p": r.pvalues["inclusive"]})
yv, X = patsy.dmatrices(BASE, inv, return_type="dataframe"); b, se = firth(X.values, yv.values.ravel())
j = list(X.columns).index("inclusive")
far.append({"check": "Firth, input level", "OR": np.exp(b[j]), "ci_low": np.exp(b[j] - 1.96 * se[j]),
            "ci_high": np.exp(b[j] + 1.96 * se[j]), "p": 2 * (1 - norm.cdf(abs(b[j] / se[j])))})
ff = inv.groupby(["key", "model", "language", "context", "field", "inclusive"]).y.max().reset_index()
t = ff.groupby("inclusive").y.agg(["sum", "count"])
far.append({"check": f"functions with >=1 false acceptance: {t.loc[1,'sum']}/{t.loc[1,'count']} with vs {t.loc[0,'sum']}/{t.loc[0,'count']} without, Fisher",
            "p": fisher(t.loc[1, "sum"], t.loc[1, "count"], t.loc[0, "sum"], t.loc[0, "count"])})
nl = ff[ff.model != "llama3.1:8b-instruct-q8_0"].groupby("inclusive").y.agg(["sum", "count"])
far.append({"check": f"same, three models other than Llama: {nl.loc[1,'sum']}/{nl.loc[1,'count']} vs {nl.loc[0,'sum']}/{nl.loc[0,'count']}, Fisher",
            "p": fisher(nl.loc[1, "sum"], nl.loc[1, "count"], nl.loc[0, "sum"], nl.loc[0, "count"])})
loo = []
for i in inv.id.unique():
    d = inv[inv.id != i]
    rr = smf.gee(BASE, groups=d.key, data=d, family=sm.families.Binomial(), cov_struct=sm.cov_struct.Exchangeable()).fit(maxiter=200)
    loo.append((i, np.exp(rr.params["inclusive"]), rr.pvalues["inclusive"]))
loo = pd.DataFrame(loo, columns=["dropped_input", "OR", "p"]); loo.to_csv(R2 / "far_leave_one_input_out.csv", index=False)
far.append({"check": "leave-one-input-out GEE (43 fits)", "OR": loo.OR.min(), "ci_low": loo.OR.min(), "ci_high": loo.OR.max(), "p": loo.p.max()})
far = pd.DataFrame(far); far.to_csv(R2 / "far_separation.csv", index=False)
say("== false acceptance checks (leave-one-out row: OR range in ci_low-ci_high, largest p)"); say(far.round(5).to_string(index=False))

# ------------------------------------------------------------------ 5. dynamic call sites vs captured patterns
dc = json.load(open(OUT / "dynamic_capture.json", encoding="utf-8"))
vul = [(x["key"], c["complexity"]) for x in dc for c in x["captured"] if not c["already_static"] and c["status"] == "vulnerable"]
dyn_counts = {
    "functions_with_dynamic_sites": len(dc),
    "dynamic_call_sites": sum(x["n_dynamic_sites"] for x in dc),
    "distinct_new_patterns_per_function": sum(len({(c["pattern"], c["flags"]) for c in x["captured"] if not c["already_static"]}) for x in dc),
    "vulnerable_new_patterns": len(vul),
    "functions_with_vulnerable_new_patterns": len({k for k, _ in vul}),
    "models": ";".join(sorted({k.split("__")[0] for k, _ in vul})),
    "exponential": sum(c == "exponential" for _, c in vul),
    "polynomial": sum(c == "polynomial" for _, c in vul),
    "confirmed_functions_config_B": len(dyn_keys),
}
pd.DataFrame([dyn_counts]).to_csv(R2 / "dynamic_counts.csv", index=False)
say("== dynamic", dyn_counts)

# ------------------------------------------------------------------ 6. coding agreement
cr = pd.read_csv(OUT / "vuln_coding_review.csv")
a, b = cr.author_1, cr.author_2
cats = sorted(set(a) | set(b))
po = (a == b).mean()
pe = sum((a == c).mean() * (b == c).mean() for c in cats)
kappa = (po - pe) / (1 - pe)
agr = {"patterns": len(cr), "agree_before_discussion": int((a == b).sum()), "kappa": round(kappa, 3),
       "consensus_differs_from_rules": int((cr.consensus != cr.rule_category).sum())}
pd.DataFrame([agr]).to_csv(R2 / "coding_agreement.csv", index=False)
say("== coding agreement", agr)

(R2 / "summary.txt").write_text("\n".join(summary), encoding="utf-8")
