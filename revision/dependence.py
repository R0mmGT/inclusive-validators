#!/usr/bin/env python3
"""Sensitivity of the inferential results to additional sources of dependence (Reviewer 2, point 4).

(i)   GEE clustered by function (as in the paper);
(ii)  GEE clustered by prompt cell (model x field x language x context x instruction; 192 cells of up to 10 repetitions);
(iii) logistic GLM with two-way cluster-robust standard errors by prompt cell and by test input;
and, for confirmed ReDoS, logistic regression with standard errors clustered by prompt cell.
Output: revision/out/stats/dependence.csv
"""
import warnings
from pathlib import Path
import numpy as np, pandas as pd
import statsmodels.api as sm, statsmodels.formula.api as smf

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "revision/out/stats"
warnings.simplefilter("ignore")
long = pd.read_csv(ROOT / "results/long_results.csv.gz", low_memory=False)
long["inclusive"] = long["inclusive"].astype(str).str.lower().eq("true").astype(int)
long["cell"] = long[["model", "field", "language", "context", "inclusive"]].astype(str).agg("|".join, axis=1)
v = long[(long.expected == "valid") & (long.category != "control")].copy(); v["y"] = 1 - v["accepted"]
inv = long[long.expected == "invalid"].copy(); inv["y"] = inv["accepted"]
F = "y ~ C(model, Treatment('DeepSeek-V3.2')) + C(language) + C(context) + inclusive + C(field)"
KEEP = {"C(language)[T.es]": "Spanish prompt", "C(context)[T.ecommerce]": "Online-store context", "inclusive": "Instruction",
        "C(model, Treatment('DeepSeek-V3.2'))[T.gemini-3.8-flash]": "Gemini 3.8 Flash",
        "C(model, Treatment('DeepSeek-V3.2'))[T.gpt-5-mini]": "GPT-5 mini",
        "C(model, Treatment('DeepSeek-V3.2'))[T.llama3.1:8b-instruct-q8_0]": "Llama 3.1 8B"}
rows = []
def add(outcome, method, res):
    ci = res.conf_int()
    for t, lab in KEEP.items():
        rows.append({"outcome": outcome, "method": method, "term": lab, "OR": np.exp(res.params[t]),
                     "lo": np.exp(ci.loc[t, 0]), "hi": np.exp(ci.loc[t, 1]), "p": res.pvalues[t]})
for name, d in [("false rejection", v), ("false acceptance", inv)]:
    for meth, grp in [("GEE, function clusters", "key"), ("GEE, prompt-cell clusters", "cell")]:
        r = smf.gee(F, groups=d[grp], data=d, family=sm.families.Binomial(), cov_struct=sm.cov_struct.Exchangeable()).fit(maxiter=200)
        add(name, meth, r)
    g = np.column_stack([pd.factorize(d["cell"])[0], pd.factorize(d["id"])[0]])
    r = smf.glm(F, data=d, family=sm.families.Binomial()).fit(cov_type="cluster", cov_kwds={"groups": g})
    add(name, "GLM, two-way clusters (prompt cell, input)", r)
a = pd.read_csv(OUT / "all_generations.csv"); a = a[a.status == "ok"].copy()
a["y"] = a["confirmed_vulnerable"].astype(int); a["inclusive"] = a["inclusive"].astype(int)
a["cell"] = a[["model", "field", "language", "context", "inclusive"]].astype(str).agg("|".join, axis=1)
for meth, kw in [("Logit, model-based SE", {}), ("Logit, prompt-cell clusters", {"cov_type": "cluster", "cov_kwds": {"groups": pd.factorize(a["cell"])[0]}})]:
    r = smf.logit(F, a).fit(disp=0, **kw)
    add("confirmed ReDoS", meth, r)
df = pd.DataFrame(rows); df.round(4).to_csv(OUT / "dependence.csv", index=False)
pd.set_option("display.width", 200)
print(df[df.term.isin(["Spanish prompt", "Online-store context", "Instruction"])].round(3).to_string(index=False))
print("n cells", v["cell"].nunique(), a["cell"].nunique(), "inputs", v["id"].nunique(), inv["id"].nunique())
