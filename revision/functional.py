#!/usr/bin/env python3
"""Additional functional and statistical analyses requested in review (Reviewer 1, points 4, 5, 7).

Reads the original outputs (results/long_results.csv.gz, results/function_level.csv,
data/*.jsonl) and writes revision/out/stats/*.csv plus revision/out/stats/summary.md.
Nothing in results/ is modified.
"""
import json
import warnings
from pathlib import Path

import numpy as np
import pandas as pd
import statsmodels.api as sm
import statsmodels.formula.api as smf
from scipy.stats import norm
from statsmodels.stats.multitest import multipletests
from statsmodels.stats.proportion import proportion_confint

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "revision" / "out" / "stats"
OUT.mkdir(parents=True, exist_ok=True)
rng = np.random.default_rng(42)
B = 2000
MODELS = ["gemini-3.8-flash", "gpt-5-mini", "DeepSeek-V3.2", "llama3.1:8b-instruct-q8_0"]
LABEL = {"gemini-3.8-flash": "Gemini 3.8 Flash", "gpt-5-mini": "GPT-5 mini", "DeepSeek-V3.2": "DeepSeek-V3.2",
         "llama3.1:8b-instruct-q8_0": "Llama 3.1 8B"}
report = ["# Additional analyses for the revision (auto-generated)\n"]


def md(df, **kw):
    return df.to_markdown(index=False, **kw) + "\n"


def wilson(k, n):
    if n == 0:
        return (np.nan, np.nan)
    lo, hi = proportion_confint(k, n, method="wilson")
    return round(100 * lo, 1), round(100 * hi, 1)


def read_jsonl(p):
    return [json.loads(l) for l in open(p, encoding="utf-8") if l.strip()]


# ------------------------------------------------------------------ data
idx = pd.DataFrame(read_jsonl(ROOT / "data/extracted.jsonl"))
gen = pd.DataFrame(read_jsonl(ROOT / "data/responses.jsonl"))
runs = pd.DataFrame(read_jsonl(ROOT / "data/results.jsonl"))[["key", "load_status", "load_error"]]
redos = pd.DataFrame(read_jsonl(ROOT / "data/redos.jsonl"))[["key", "static_vulnerable", "confirmed_vulnerable"]]
fn = pd.read_csv(ROOT / "results/function_level.csv")
long = pd.read_csv(ROOT / "results/long_results.csv.gz", low_memory=False)
corpus = pd.DataFrame(json.load(open(ROOT / "corpus/corpus.json", encoding="utf-8"))["items"])
for d in (idx, fn, long):
    d["inclusive"] = d["inclusive"].astype(str).str.lower().eq("true")

allg = idx.merge(runs, on="key", how="left").merge(redos, on="key", how="left").merge(
    fn[["key", "frr", "far", "passes_control"]], on="key", how="left")
allg["usable"] = allg["load_status"].eq("ok")
allg["confirmed_vulnerable"] = allg["confirmed_vulnerable"].fillna(False).astype(bool)
assert len(allg) == 1920, len(allg)

# exact number of inputs per field
cnt = corpus.assign(kind=np.where(corpus["expected"] == "invalid", "invalid",
                                  np.where(corpus["category"] == "control", "valid_control", "valid_noncontrol")))
t_inputs = cnt.groupby(["field", "kind"]).size().unstack(fill_value=0)
t_inputs["categories_noncontrol"] = corpus[(corpus.expected == "valid") & (corpus.category != "control")].groupby("field")["category"].nunique()
t_inputs.loc["total"] = t_inputs.sum()
t_inputs.reset_index().to_csv(OUT / "inputs_per_field.csv", index=False)
report += ["## Inputs per field\n", md(t_inputs.reset_index())]

# ------------------------------------------------------------------ 1. all-generation outcome breakdown
def stage(r, tau=0.10):
    if r["status"] != "ok":
        return "1_no_code"
    if not r["usable"]:
        return "2_not_loadable"
    if r["passes_control"] != 1:
        return "3_fails_control"
    if r["frr"] > tau:
        return "4_frr_above_target"
    if r["confirmed_vulnerable"]:
        return "5_confirmed_redos"
    return "6_deployable"


rows = []
for tau in (0.05, 0.10, 0.20):
    allg[f"stage_{int(tau*100)}"] = allg.apply(stage, axis=1, tau=tau)
    allg[f"deploy_{int(tau*100)}"] = allg[f"stage_{int(tau*100)}"].eq("6_deployable")
brk = (allg.groupby(["model", "inclusive", "stage_10"]).size().unstack(fill_value=0))
brk["n"] = brk.sum(axis=1)
brk = brk.reset_index()
brk.to_csv(OUT / "outcome_breakdown_tau10.csv", index=False)
report += ["## All-generation outcome breakdown (FRR target 10%)\n",
           "Stages are sequential and mutually exclusive; denominators are all generations.\n\n", md(brk)]

dep = []
for (m, inc), g in allg.groupby(["model", "inclusive"]):
    row = {"model": LABEL[m], "instruction": "with" if inc else "without", "n": len(g)}
    for tau in (5, 10, 20):
        k = int(g[f"deploy_{tau}"].sum())
        lo, hi = wilson(k, len(g))
        row[f"deployable_{tau}"] = f"{k} ({100*k/len(g):.1f}%) [{lo}, {hi}]"
    dep.append(row)
for inc, g in allg.groupby("inclusive"):
    row = {"model": "All", "instruction": "with" if inc else "without", "n": len(g)}
    for tau in (5, 10, 20):
        k = int(g[f"deploy_{tau}"].sum())
        lo, hi = wilson(k, len(g))
        row[f"deployable_{tau}"] = f"{k} ({100*k/len(g):.1f}%) [{lo}, {hi}]"
    dep.append(row)
dep = pd.DataFrame(dep)
dep.to_csv(OUT / "deployable_rates.csv", index=False)
report += ["## Deployment-oriented success (loads, passes control, FRR <= target, no confirmed ReDoS)\n",
           "Wilson 95% CI, denominator = all generations. Not a security guarantee.\n\n", md(dep)]

# logistic model of deployability (tau = 10%) with model x instruction interaction (Firth, see below)

# ------------------------------------------------------------------ 2. estimands: function-averaged, pooled, category-balanced
v = long[(long["expected"] == "valid") & (long["category"] != "control")].copy()
v["rejected"] = 1 - v["accepted"]
v = v.merge(fn[["key", "passes_control"]], on="key")
est = []
for (m, inc), g in v.groupby(["model", "inclusive"]):
    f_avg = g.groupby("key")["rejected"].mean().mean()
    pooled = g["rejected"].mean()
    macro = g.groupby(["key", "category"])["rejected"].mean().groupby("key").mean().mean()
    cat_first = g.groupby("category")["rejected"].mean().mean()
    gp = g[g["passes_control"] == 1]
    est.append({"model": LABEL[m], "instruction": "with" if inc else "without",
                "functions": g["key"].nunique(), "inputs": len(g),
                "FRR_function_avg": round(100 * f_avg, 1), "FRR_pooled_inputs": round(100 * pooled, 1),
                "FRR_category_balanced": round(100 * macro, 1), "FRR_category_mean_of_pooled": round(100 * cat_first, 1),
                "functions_passing_control": gp["key"].nunique(),
                "FRR_function_avg_passing_control": round(100 * gp.groupby("key")["rejected"].mean().mean(), 1)})
est = pd.DataFrame(est)
est.to_csv(OUT / "frr_estimands.csv", index=False)
report += ["## FRR under alternative estimands\n",
           "function_avg = mean over functions of each function's FRR (paper's estimand); pooled = all (function, input) "
           "pairs; category_balanced = per function, mean over categories, then mean over functions.\n\n", md(est)]

# ------------------------------------------------------------------ 3. malfunction vs format-specific exclusion
fl = long[long["expected"] == "valid"].copy()
fl["rejected"] = 1 - fl["accepted"]
pf = fl.groupby("key").agg(all_error=("outcome", lambda o: (o == "error").all()),
                           any_error=("outcome", lambda o: (o == "error").any()))
fcls = fn.merge(pf, on="key")
fcls["class"] = np.select(
    [fcls["all_error"], (fcls["passes_control"] == 0) & (fcls["frr"] == 1), fcls["passes_control"] == 0,
     fcls["frr"] == 0],
    ["throws_on_every_input", "fails_control_rejects_all_noncontrol", "fails_control_partial",
     "passes_control_no_exclusion"], default="passes_control_format_specific_exclusion")
dec = fcls.groupby(["model", "inclusive", "class"]).size().unstack(fill_value=0).reset_index()
dec.to_csv(OUT / "malfunction_vs_exclusion.csv", index=False)
# share of rejected non-control (function,input) pairs coming from control-failing functions
vv = v.merge(fcls[["key", "class"]], on="key")
share = (vv[vv["rejected"] == 1].groupby(["model", "inclusive"])["passes_control"]
         .apply(lambda s: round(100 * (1 - s.mean()), 1)).rename("pct_rejections_from_control_failing").reset_index())
err_share = (vv[vv["rejected"] == 1].assign(err=lambda d: d["outcome"].eq("error"))
             .groupby(["model", "inclusive"])["err"].apply(lambda s: round(100 * s.mean(), 1))
             .rename("pct_rejections_that_are_exceptions").reset_index())
share = share.merge(err_share, on=["model", "inclusive"])
share.to_csv(OUT / "rejection_sources.csv", index=False)
report += ["## Malfunction versus format-specific exclusion (usable functions)\n", md(dec),
           "Share of rejected valid non-control inputs that come from functions failing the controls, and that are exceptions:\n\n",
           md(share)]

# instruction effect among control-passing validators
pc = []
for (m, inc), g in fn.groupby(["model", "inclusive"]):
    k = int(g["passes_control"].sum())
    gp = g[g["passes_control"] == 1]["frr"].to_numpy()
    bs = rng.choice(gp, size=(B, len(gp))).mean(axis=1)
    lo, hi = wilson(k, len(g))
    pc.append({"model": LABEL[m], "instruction": "with" if inc else "without", "usable": len(g),
               "pass_control": f"{k} ({100*k/len(g):.1f}%) [{lo}, {hi}]",
               "FRR_among_passing": f"{100*gp.mean():.1f} [{100*np.percentile(bs,2.5):.1f}, {100*np.percentile(bs,97.5):.1f}]"})
pc = pd.DataFrame(pc)
pc.to_csv(OUT / "instruction_effect_control_passing.csv", index=False)
report += ["## Instruction effect among control-passing validators\n", md(pc)]


# ------------------------------------------------------------------ 4. GEE models with CIs and convergence information
def gee(formula, data, name):
    with warnings.catch_warnings(record=True) as w:
        warnings.simplefilter("always")
        mod = smf.gee(formula, groups=data["key"], data=data, family=sm.families.Binomial(),
                      cov_struct=sm.cov_struct.Exchangeable())
        res = mod.fit(maxiter=200)
    ci = res.conf_int()
    tab = pd.DataFrame({"term": res.params.index, "coef": res.params.values, "se_robust": res.bse.values,
                        "OR": np.exp(res.params.values), "OR_lo": np.exp(ci[0].values), "OR_hi": np.exp(ci[1].values),
                        "p": res.pvalues.values})
    info = {"model": name, "formula": formula, "n_obs": int(res.nobs), "n_clusters": int(data["key"].nunique()),
            "iterations": len(res.fit_history["params"]) - 1,
            "converged": not any("converge" in str(x.message).lower() for x in w),
            "warnings": "; ".join(sorted({str(x.message)[:80] for x in w})) or "none",
            "exchangeable_rho": round(float(res.cov_struct.dep_params), 4), "scale": round(float(res.scale), 4),
            "cov": "robust (sandwich)"}
    tab.round(4).to_csv(OUT / f"gee_{name}.csv", index=False)
    return res, tab, info


v2 = v.copy()
v2["inclusive"] = v2["inclusive"].astype(int)
inv = long[long["expected"] == "invalid"].copy()
inv["inclusive"] = inv["inclusive"].astype(int)
F_MAIN = "{y} ~ C(model, Treatment('DeepSeek-V3.2')) + C(language) + C(context) + inclusive + C(field)"
F_INT = "{y} ~ C(model, Treatment('DeepSeek-V3.2')) * inclusive + C(language) + C(context) + C(field)"
infos = []
r_frr, t_frr, i1 = gee(F_MAIN.format(y="rejected"), v2, "frr_main")
r_far, t_far, i2 = gee(F_MAIN.format(y="accepted"), inv, "far_main")
r_int, t_int, i3 = gee(F_INT.format(y="rejected"), v2, "frr_interaction")
v2p = v2[v2["passes_control"] == 1]
r_intp, t_intp, i4 = gee(F_INT.format(y="rejected"), v2p, "frr_interaction_control_passing")
inv_nm = inv[~inv["value"].astype(str).str.contains("<script>", regex=False)]
r_farnm, t_farnm, i5 = gee(F_MAIN.format(y="accepted"), inv_nm, "far_main_no_markup")
infos = pd.DataFrame([i1, i2, i3, i4, i5])
infos.to_csv(OUT / "gee_convergence.csv", index=False)


def per_model_instruction(res, name):
    """Instruction OR within each model from the interaction model (linear combinations)."""
    names = list(res.params.index)
    rows = []
    for m in MODELS:
        c = np.zeros(len(names))
        c[names.index("inclusive")] = 1
        if m != "DeepSeek-V3.2":
            term = f"C(model, Treatment('DeepSeek-V3.2'))[T.{m}]:inclusive"
            c[names.index(term)] = 1
        est = float(c @ res.params.values)
        se = float(np.sqrt(c @ res.cov_params().values @ c))
        z = est / se
        rows.append({"analysis": name, "model": LABEL[m], "OR_instruction": np.exp(est),
                     "OR_lo": np.exp(est - 1.96 * se), "OR_hi": np.exp(est + 1.96 * se),
                     "p": 2 * (1 - norm.cdf(abs(z)))})
    return pd.DataFrame(rows)


pmi = pd.concat([per_model_instruction(r_int, "all usable"), per_model_instruction(r_intp, "control-passing")])
pmi.round(4).to_csv(OUT / "instruction_or_by_model.csv", index=False)


def fmt_or(t):
    t = t.copy()
    t["OR [95% CI]"] = t.apply(lambda r: f"{r.OR:.2f} [{r.OR_lo:.2f}, {r.OR_hi:.2f}]", axis=1)
    t["p"] = t["p"].map(lambda p: "<0.001" if p < 0.001 else f"{p:.3f}")
    return t[["term", "OR [95% CI]", "p"]]


report += ["## GEE models (robust SE), with 95% CIs\n", md(infos),
           "### False rejection, main effects\n", md(fmt_or(t_frr)),
           "### False acceptance, main effects\n", md(fmt_or(t_far)),
           "### False acceptance excluding the markup input\n", md(fmt_or(t_farnm)),
           "### False rejection, model x instruction\n", md(fmt_or(t_int)),
           "### Instruction OR within each model (linear combinations of the interaction model)\n",
           md(pmi.assign(**{"OR [95% CI]": pmi.apply(lambda r: f"{r.OR_instruction:.3f} [{r.OR_lo:.3f}, {r.OR_hi:.3f}]", axis=1),
                            "p": pmi["p"].map(lambda p: "<0.001" if p < 0.001 else f"{p:.3f}")})[["analysis", "model", "OR [95% CI]", "p"]])]


# ------------------------------------------------------------------ 5. ReDoS logistic models (ML and Firth)
def firth(X, y, maxiter=200, tol=1e-8):
    beta = np.zeros(X.shape[1])
    for _ in range(maxiter):
        p = 1 / (1 + np.exp(-X @ beta))
        W = p * (1 - p)
        XtWX = X.T @ (X * W[:, None])
        inv = np.linalg.inv(XtWX)
        h = np.einsum("ij,jk,ik->i", X * np.sqrt(W)[:, None], inv, X * np.sqrt(W)[:, None])
        U = X.T @ (y - p + h * (0.5 - p))
        step = inv @ U
        beta += step
        if np.max(np.abs(step)) < tol:
            break
    p = 1 / (1 + np.exp(-X @ beta))
    W = p * (1 - p)
    se = np.sqrt(np.diag(np.linalg.inv(X.T @ (X * W[:, None]))))
    return beta, se


rd = allg[allg["status"] == "ok"].copy()  # 1919 extracted functions
rd["y"] = rd["confirmed_vulnerable"].astype(int)
rd["inclusive"] = rd["inclusive"].astype(int)
red_rows = []
for name, formula in [("main", "y ~ C(model, Treatment('DeepSeek-V3.2')) + C(language) + C(context) + inclusive + C(field)"),
                      ("interaction", "y ~ C(model, Treatment('DeepSeek-V3.2')) * inclusive + C(language) + C(context) + C(field)")]:
    import patsy
    yv, X = patsy.dmatrices(formula, rd, return_type="dataframe")
    b, se = firth(X.values, yv.values.ravel())
    with warnings.catch_warnings(record=True) as w:
        warnings.simplefilter("always")
        try:
            ml = sm.Logit(yv, X).fit(disp=0, maxiter=200)
            ml_or, ml_p, ml_conv = np.exp(ml.params.values), ml.pvalues.values, bool(ml.mle_retvals["converged"])
        except Exception as e:  # perfect separation
            ml_or, ml_p, ml_conv = [np.nan] * len(b), [np.nan] * len(b), False
    for j, term in enumerate(X.columns):
        z = b[j] / se[j]
        red_rows.append({"model": name, "term": term, "ML_OR": ml_or[j], "ML_p": ml_p[j], "ML_converged": ml_conv,
                         "Firth_OR": np.exp(b[j]), "Firth_lo": np.exp(b[j] - 1.96 * se[j]),
                         "Firth_hi": np.exp(b[j] + 1.96 * se[j]), "Firth_p": 2 * (1 - norm.cdf(abs(z))),
                         "n": len(rd), "events": int(rd["y"].sum())})
red = pd.DataFrame(red_rows)
red.round(4).to_csv(OUT / "redos_logistic.csv", index=False)
report += ["## Confirmed ReDoS: logistic regression (ML and Firth-penalised, Wald CIs), n = 1919 extracted functions\n",
           md(red.round(3))]

# deployability model (tau = 10%)
dd = allg.copy()
dd["y"] = dd["deploy_10"].astype(int)
dd["inclusive"] = dd["inclusive"].astype(int)
import patsy
yv, X = patsy.dmatrices("y ~ C(model, Treatment('DeepSeek-V3.2')) * inclusive + C(language) + C(context) + C(field)",
                        dd, return_type="dataframe")
b, se = firth(X.values, yv.values.ravel())
dep_m = pd.DataFrame({"term": X.columns, "OR": np.exp(b), "lo": np.exp(b - 1.96 * se), "hi": np.exp(b + 1.96 * se),
                      "p": 2 * (1 - norm.cdf(np.abs(b / se)))})
dep_m.round(4).to_csv(OUT / "deployable_firth.csv", index=False)
report += ["## Deployability (tau=10%), Firth logistic with model x instruction\n", md(dep_m.round(3))]

# ------------------------------------------------------------------ 6. simple vs design-stratified bootstrap
fn["cell"] = fn["model"] + "|" + fn["field"] + "|" + fn["language"] + "|" + fn["context"] + "|" + fn["inclusive"].astype(str)
bs_rows = []
for (m, inc), g in fn.groupby(["model", "inclusive"]):
    x = g["frr"].to_numpy()
    simple = rng.choice(x, size=(B, len(x))).mean(axis=1)
    cells = [c["frr"].to_numpy() for _, c in g.groupby("cell")]
    strat = np.zeros(B)
    for c in cells:
        strat += rng.choice(c, size=(B, len(c))).sum(axis=1)
    strat /= len(x)
    bs_rows.append({"model": LABEL[m], "instruction": "with" if inc else "without", "n": len(x), "cells": len(cells),
                    "FRR": round(100 * x.mean(), 1),
                    "simple_CI": f"[{100*np.percentile(simple,2.5):.1f}, {100*np.percentile(simple,97.5):.1f}]",
                    "stratified_CI": f"[{100*np.percentile(strat,2.5):.1f}, {100*np.percentile(strat,97.5):.1f}]",
                    "width_ratio_strat_over_simple": round((np.percentile(strat, 97.5) - np.percentile(strat, 2.5)) /
                                                           (np.percentile(simple, 97.5) - np.percentile(simple, 2.5)), 3)})
bs = pd.DataFrame(bs_rows)
bs.to_csv(OUT / "bootstrap_simple_vs_stratified.csv", index=False)
report += ["## Bootstrap: simple resampling of functions vs resampling within the 48 design cells per model\n", md(bs)]

# ------------------------------------------------------------------ 7. Holm adjustment over the inferential tests reported
def pick(tab, term):
    return float(tab.loc[tab["term"] == term, "p"].iloc[0])


fisher = pd.read_csv(ROOT / "results/04_redos_fisher_by_model.csv")
tests = [
    ("RQ2 language -> FRR", pick(t_frr, "C(language)[T.es]")),
    ("RQ2 context -> FRR", pick(t_frr, "C(context)[T.ecommerce]")),
    ("RQ2 language -> FAR", pick(t_far, "C(language)[T.es]")),
    ("RQ2 context -> FAR", pick(t_far, "C(context)[T.ecommerce]")),
    ("RQ3 instruction -> FRR", pick(t_frr, "inclusive")),
    ("RQ3 instruction -> FAR", pick(t_far, "inclusive")),
] + [(f"RQ3 interaction {LABEL[m]} x instruction -> FRR",
      pick(t_int, f"C(model, Treatment('DeepSeek-V3.2'))[T.{m}]:inclusive")) for m in MODELS if m != "DeepSeek-V3.2"] + [
    ("RQ4 instruction -> confirmed ReDoS (Firth)",
     float(red[(red.model == "main") & (red.term == "inclusive")]["Firth_p"].iloc[0])),
] + [(f"RQ4 Fisher {LABEL.get(r.model, r.model)}", float(r.fisher_p)) for r in fisher.itertuples()]
ht = pd.DataFrame(tests, columns=["test", "p"])
ht["p_holm"] = multipletests(ht["p"], method="holm")[1]
ht["significant_holm_0.05"] = ht["p_holm"] < 0.05
ht.to_csv(OUT / "holm.csv", index=False)
report += ["## Holm adjustment across the inferential tests reported in Results\n",
           md(ht.assign(p=ht.p.map(lambda p: f"{p:.2e}"), p_holm=ht.p_holm.map(lambda p: f"{p:.2e}")))]

allg.drop(columns=[c for c in allg.columns if c.startswith("load_error")]).to_csv(OUT / "all_generations.csv", index=False)
(OUT / "summary.md").write_text("\n".join(report), encoding="utf-8")
print("\n".join(report))
