"""Statistical analysis (RQ1-RQ4).

Usage: python src/analyze.py [--boot 2000]
Input : data/extracted.jsonl, data/results.jsonl, data/redos.jsonl, corpus/corpus.json
Output: results/*.csv, results/summary.md

accepted        = validate() returned a truthy value (exceptions/timeouts = not accepted)
accepted_strict = validate() returned exactly `true`
A function passes control if it accepts every control input of its field; for
phone numbers, if it accepts the US number in at least one format.
Rates are computed per function and averaged, with bootstrap 95% CIs over functions.
"""
import argparse
import json
import warnings
from pathlib import Path

import numpy as np
import pandas as pd

ROOT = Path(__file__).resolve().parent.parent
RES = ROOT / "results"
FACTORS = ["model", "field", "language", "context", "inclusive"]


def read_jsonl(p):
    return [json.loads(l) for l in open(p, encoding="utf-8") if l.strip()]


def boot_mean(x, n_boot, rng):
    x = np.asarray(x, dtype=float)
    if len(x) == 0:
        return np.nan, np.nan, np.nan
    means = rng.choice(x, size=(n_boot, len(x)), replace=True).mean(axis=1)
    return x.mean(), np.percentile(means, 2.5), np.percentile(means, 97.5)


def summarise(df, by, col, n_boot, rng):
    rows = []
    for keys, g in df.groupby(by, dropna=False):
        m, lo, hi = boot_mean(g[col].dropna(), n_boot, rng)
        keys = keys if isinstance(keys, tuple) else (keys,)
        rows.append({**dict(zip(by, keys)), "n_functions": g[col].notna().sum(),
                     col: round(m, 4), "ci_low": round(lo, 4), "ci_high": round(hi, 4)})
    return pd.DataFrame(rows)


def fit(formula, data, groups=None):
    """GEE logistic model clustered by function, or plain logit if groups is None."""
    import statsmodels.api as sm
    import statsmodels.formula.api as smf
    with warnings.catch_warnings():
        warnings.simplefilter("ignore")
        try:
            if groups is not None:
                m = smf.gee(formula, groups=groups, data=data, family=sm.families.Binomial(),
                            cov_struct=sm.cov_struct.Exchangeable()).fit()
            else:
                m = smf.logit(formula, data=data).fit(disp=0)
            tab = pd.DataFrame({"coef": m.params, "odds_ratio": np.exp(m.params),
                                "p_value": m.pvalues}).round(4)
            return tab, None
        except Exception as e:
            return None, repr(e)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--boot", type=int, default=2000)
    args = ap.parse_args()
    rng = np.random.default_rng(42)
    RES.mkdir(exist_ok=True)

    corpus = pd.DataFrame(json.load(open(ROOT / "corpus/corpus.json", encoding="utf-8"))["items"])
    idx = pd.DataFrame(read_jsonl(ROOT / "data/extracted.jsonl"))
    runs = read_jsonl(ROOT / "data/results.jsonl")
    redos = pd.DataFrame(read_jsonl(ROOT / "data/redos.jsonl"))

    report = ["# Results summary (auto-generated)\n"]

    # ---------- 0. Validity of generations ----------
    load = pd.DataFrame([{"key": r["key"], "load_status": r["load_status"],
                          "load_error": r.get("load_error"), "load_warning": r.get("load_warning")} for r in runs])
    funcs = idx.merge(load, on="key", how="left")
    funcs["load_status"] = funcs["load_status"].where(funcs["status"] == "ok", funcs["status"]).fillna("not_executed")
    t0 = funcs.groupby(["model", "load_status"]).size().unstack(fill_value=0)
    t0.to_csv(RES / "00_generation_validity.csv")
    report += ["## 0. Generation validity (functions per status)\n", t0.to_markdown(), "\n"]

    def failure_class(row):
        st, msg = row["load_status"], row.get("load_error") or ""
        if st in ("ok", "not_executed"):
            return None
        if st == "no_validate":
            return "no_validate_function"
        if st.startswith("api_") or st in ("no_code", "no_validate_symbol"):
            return st
        if "Invalid regular expression" in msg and "Invalid escape" in msg:
            return "regex_invalid_escape_u_flag"
        if "Invalid regular expression" in msg or "missing /" in msg:
            return "regex_syntax_other"
        return "javascript_syntax_or_runtime"
    funcs["failure_class"] = funcs.apply(failure_class, axis=1)
    fc = funcs[funcs["failure_class"].notna()]
    if len(fc):
        tfc = fc.groupby(["model", "failure_class"]).size().unstack(fill_value=0)
        tfc.to_csv(RES / "00_failure_classes.csv")
        report += ["Why functions could not be used (classified):\n", tfc.to_markdown(), "\n"]
    tv = (funcs.assign(usable=(funcs["load_status"] == "ok").astype(int))
          .groupby(["model", "inclusive"])["usable"].agg(["mean", "size"]).round(4).reset_index())
    tv.to_csv(RES / "00_usable_by_inclusive.csv", index=False)
    esc = (funcs.assign(esc=(funcs["failure_class"] == "regex_invalid_escape_u_flag").astype(int))
           .groupby(["model", "inclusive"])["esc"].sum().rename("n_invalid_escape_u_flag").reset_index())
    tv = tv.merge(esc, on=["model", "inclusive"])
    report += ["Share of usable functions (loaded, validate() callable) by inclusivity instruction:\n",
               tv.rename(columns={"mean": "usable_share", "size": "n_generated"}).to_markdown(index=False), "\n"]

    # ---------- long table: one row per (function, input) ----------
    long = pd.DataFrame([{"key": r["key"], **res} for r in runs if r["load_status"] == "ok" for res in r["results"]])
    long = long.merge(corpus[["id", "expected", "category", "value"]], on="id").merge(idx[["key"] + FACTORS], on="key")
    if "returned" not in long:
        long["returned"] = None
    long["accepted_strict"] = (long["outcome"] == "accept").astype(int)
    truthy_nonbool = (long["outcome"] == "non_boolean") & long["returned"].fillna("").str.contains("truthy|promise")
    long["accepted"] = ((long["outcome"] == "accept") | truthy_nonbool).astype(int)
    long.to_csv(RES / "long_results.csv.gz", index=False)

    outc = long.groupby(["model", "outcome"]).size().unstack(fill_value=0)
    outc.to_csv(RES / "00_outcomes.csv")
    report += ["## Raw outcomes of validate() calls\n", outc.to_markdown(), "\n"]
    er = long[long["outcome"] == "error"]
    if len(er) and "error" in er:
        always = long.groupby("key")["outcome"].apply(lambda o: (o == "error").all())
        n_always = always[always].index
        ter = (er.assign(message=er["error"].fillna("").str.slice(0, 80))
               .groupby(["model", "message"]).agg(calls=("id", "size"), functions=("key", "nunique"))
               .reset_index().sort_values(["model", "calls"], ascending=[True, False]).groupby("model").head(5))
        ter.to_csv(RES / "00_runtime_errors.csv", index=False)
        ta = idx[idx["key"].isin(n_always)].groupby("model").size().rename("functions_throwing_on_every_input")
        report += ["Exceptions thrown by validate() (top 5 messages per model; counted as not accepted):\n",
                   ter.to_markdown(index=False), "\n", ta.to_frame().to_markdown(), "\n"]
    nb = long[long["outcome"] == "non_boolean"]
    if len(nb):
        tnb = nb.groupby(["model", "returned"]).size().unstack(fill_value=0)
        tnb.to_csv(RES / "00_non_boolean_returns.csv")
        report += ["Non-boolean return values (type:truthiness), counted as accepted if truthy:\n", tnb.to_markdown(), "\n"]
    le = funcs[funcs["load_status"].isin(["load_error", "no_validate", "load_timeout"])]
    if len(le):
        le = le.assign(message=le["load_error"].fillna("").str.slice(0, 90))
        tle = le.groupby(["model", "load_status", "message"]).size().rename("n").reset_index()
        tle.to_csv(RES / "00_load_errors.csv", index=False)
        report += ["Functions that could not be executed:\n", tle.to_markdown(index=False), "\n"]
    lw = load[load["load_warning"].notna()].merge(idx[["key", "model"]], on="key")
    if len(lw):
        tlw = lw.assign(message=lw["load_warning"].str.slice(0, 90)).groupby(["model", "message"]).size().rename("n").reset_index()
        tlw.to_csv(RES / "00_load_warnings.csv", index=False)
        report += ["Functions executed despite a runtime error in extra top-level code (e.g. usage examples):\n",
                   tlw.to_markdown(index=False), "\n"]

    valid = long[long["expected"] == "valid"].copy()
    invalid = long[long["expected"] == "invalid"].copy()
    valid["rejected"] = 1 - valid["accepted"]

    valid = valid.merge(corpus[["id", "region"]] if "region" in corpus else corpus[["id"]].assign(region=None), on="id", how="left")
    is_ctrl = valid["category"] == "control"
    is_phone = valid["field"] == "phone_number"
    ctrl_other = valid[is_ctrl & ~is_phone].groupby("key")["rejected"].max()
    ctrl_phone = 1 - valid[is_phone & (valid["region"] == "US")].groupby("key")["accepted"].max()
    ctrl = pd.concat([ctrl_other, ctrl_phone]).rename("fails_control")
    frr = valid[valid["category"] != "control"].groupby("key")["rejected"].mean().rename("frr")
    far = invalid.groupby("key")["accepted"].mean().rename("far")
    fn = idx.set_index("key")[FACTORS].join([frr, far, ctrl], how="inner").reset_index()
    fn["passes_control"] = 1 - fn["fails_control"]
    fn.to_csv(RES / "function_level.csv", index=False)

    # ---------- RQ1: exclusion ----------
    t_ctrl = summarise(fn, ["model"], "passes_control", args.boot, rng)
    t1 = summarise(fn, ["model"], "frr", args.boot, rng)
    t1f = summarise(fn, ["field"], "frr", args.boot, rng)
    cat = valid.groupby(["key", "field", "category"])["rejected"].mean().reset_index()
    t1c = summarise(cat, ["field", "category"], "rejected", args.boot, rng).sort_values(["field", "rejected"], ascending=[True, False])
    phone_md = []
    if "format" in corpus:
        ph = valid[valid["field"] == "phone_number"].merge(corpus[["id", "format"]], on="id", how="left")
        ph = ph.groupby(["key", "format"])["rejected"].mean().reset_index()
        t1p = summarise(ph, ["format"], "rejected", args.boot, rng)
        t1p.to_csv(RES / "01_phone_rejection_by_format.csv", index=False)
        phone_md = ["Phone numbers: rejection rate by input format (national = US control):\n", t1p.to_markdown(index=False), "\n"]
    for name, t in [("01_control_pass_by_model", t_ctrl), ("01_frr_by_model", t1), ("01_frr_by_field", t1f), ("01_rejection_by_category", t1c)]:
        t.to_csv(RES / f"{name}.csv", index=False)
    report += ["## RQ1. Exclusion\n",
               "Share of functions passing the control (Anglo-American) inputs:\n", t_ctrl.to_markdown(index=False), "\n",
               "False rejection rate (non-control valid inputs), mean across functions:\n", t1.to_markdown(index=False), "\n",
               t1f.to_markdown(index=False), "\n",
               "Rejection rate by field and category:\n", t1c.to_markdown(index=False), "\n"]
    report += phone_md

    # Sensitivity: strict coding
    vs = valid[valid["category"] != "control"].assign(rej_strict=lambda d: 1 - d["accepted_strict"])
    fs = vs.groupby("key")["rej_strict"].mean().rename("frr_strict")
    fn_s = idx.set_index("key")[FACTORS].join(fs, how="inner").reset_index()
    t1s_strict = summarise(fn_s, ["model"], "frr_strict", args.boot, rng)
    t1s_strict.to_csv(RES / "01_frr_by_model_strict.csv", index=False)
    report += ["Sensitivity analysis: FRR with strict coding (only `=== true` accepted):\n", t1s_strict.to_markdown(index=False), "\n"]

    # Sensitivity: only functions that pass the control inputs
    t1c_ok = summarise(fn[fn["passes_control"] == 1], ["model"], "frr", args.boot, rng)
    t1c_ok.to_csv(RES / "01_frr_by_model_control_passing.csv", index=False)
    report += ["Sensitivity analysis: FRR among functions that pass the control inputs:\n", t1c_ok.to_markdown(index=False), "\n"]

    # FRR by regex style
    if len(redos):
        latin_ext = redos[["key", "regexes"]].assign(latin_extended=redos["regexes"].apply(
            lambda rs: any(r.get("non_ascii_explicit") for r in rs)))
        tagged = fn.merge(redos[["key", "ascii_only_letters", "unicode_aware"]], on="key", how="left") \
                   .merge(latin_ext[["key", "latin_extended"]], on="key", how="left")
        tagged["regex_style"] = np.select(
            [tagged["unicode_aware"] == True, tagged["latin_extended"] == True, tagged["ascii_only_letters"] == True],
            ["unicode_property", "explicit_non_ascii_ranges", "ascii_only"], default="other/none")
        t1s = summarise(tagged, ["field", "regex_style"], "frr", args.boot, rng)
        t1s.to_csv(RES / "01_frr_by_regex_style.csv", index=False)
        report += ["False rejection rate by regex style (heuristic tags):\n", t1s.to_markdown(index=False), "\n"]

    # ---------- RQ2 + RQ3: prompt factors and mitigation ----------
    t2 = summarise(fn, ["language", "context", "inclusive"], "frr", args.boot, rng)
    t3 = summarise(fn, ["model", "inclusive"], "frr", args.boot, rng).merge(
        summarise(fn, ["model", "inclusive"], "far", args.boot, rng), on=["model", "inclusive"], suffixes=("_frr", "_far"))
    t2.to_csv(RES / "02_frr_by_condition.csv", index=False)
    t3.to_csv(RES / "03_mitigation_by_model.csv", index=False)
    report += ["## RQ2. Prompt factors\n", t2.to_markdown(index=False), "\n",
               "## RQ3. Mitigation (FRR and FAR with/without inclusivity instruction)\n", t3.to_markdown(index=False), "\n"]

    v = valid[valid["category"] != "control"].copy()
    for c in ("language", "context"):
        v[c] = v[c].astype(str)
    v["inclusive"] = v["inclusive"].astype(int)
    formula = "rejected ~ C(model) + C(language) + C(context) + inclusive + C(field)"
    tab, err = fit(formula, v, groups=v["key"])
    report += ["### GEE logistic model, false rejection (valid, non-control inputs), clustered by function\n",
               f"`{formula}`\n\n", tab.to_markdown() if tab is not None else f"Model failed: {err}", "\n"]
    if tab is not None:
        tab.to_csv(RES / "02_gee_false_rejection.csv")

    iv = invalid.copy()
    for c in ("language", "context"):
        iv[c] = iv[c].astype(str)
    iv["inclusive"] = iv["inclusive"].astype(int)
    formula = "accepted ~ C(model) + C(language) + C(context) + inclusive + C(field)"
    tab, err = fit(formula, iv, groups=iv["key"])
    report += ["### GEE logistic model, false acceptance (invalid inputs), clustered by function\n",
               f"`{formula}`\n\n", tab.to_markdown() if tab is not None else f"Model failed: {err}", "\n"]
    if tab is not None:
        tab.to_csv(RES / "03_gee_false_acceptance.csv")

    fa = (invalid.assign(input=invalid["value"].map(repr))
          .groupby(["field", "input", "inclusive"])["accepted"].mean().unstack("inclusive").round(4))
    fa.columns = [f"accepted_inclusive_{c}" for c in fa.columns]
    fa = fa.reset_index()
    fa.to_csv(RES / "03_false_acceptance_by_input.csv", index=False)
    report += ["### Acceptance rate of each invalid input, without/with inclusivity instruction\n",
               fa.to_markdown(index=False), "\n"]

    # Model x inclusivity interaction
    formula = "rejected ~ C(model) * inclusive + C(language) + C(context) + C(field)"
    tab, err = fit(formula, v, groups=v["key"])
    report += ["### GEE logistic model with model x inclusivity interaction (false rejection)\n",
               f"`{formula}`\n\n", tab.to_markdown() if tab is not None else f"Model failed: {err}", "\n"]
    if tab is not None:
        tab.to_csv(RES / "03_gee_false_rejection_interaction.csv")

    # ---------- RQ4: ReDoS ----------
    if len(redos):
        rd = redos.merge(idx[["key"] + FACTORS], on=["key", "field"] if "field" in redos else ["key"])
        for c in ("static_vulnerable", "exponential", "confirmed_vulnerable", "ascii_only_letters", "unicode_aware"):
            rd[c] = rd[c].astype(int)
        rd.to_csv(RES / "04_redos_function_level.csv", index=False)
        t4 = pd.concat([summarise(rd, ["inclusive"], c, args.boot, rng).set_index("inclusive")[[c, "ci_low", "ci_high"]]
                        .rename(columns={"ci_low": f"{c}_lo", "ci_high": f"{c}_hi"})
                        for c in ("static_vulnerable", "exponential", "confirmed_vulnerable", "unicode_aware")], axis=1)
        t4m = summarise(rd, ["model", "inclusive"], "confirmed_vulnerable", args.boot, rng)
        t4.to_csv(RES / "04_redos_by_inclusive.csv")
        t4m.to_csv(RES / "04_redos_by_model.csv", index=False)
        report += ["## RQ4. ReDoS\n", t4.to_markdown(), "\n", t4m.to_markdown(index=False), "\n"]
        r = rd.copy()
        for c in ("language", "context"):
            r[c] = r[c].astype(str)
        r["inclusive"] = r["inclusive"].astype(int)
        formula = "confirmed_vulnerable ~ C(model) + C(language) + C(context) + inclusive + C(field)"
        tab, err = fit(formula, r)
        report += [f"### Logistic model, function confirmed ReDoS-vulnerable\n`{formula}`\n\n",
                   tab.to_markdown() if tab is not None else f"Model failed: {err}", "\n"]
        link = rd.merge(fn[["key", "frr"]], on="key", how="left").groupby("confirmed_vulnerable")["frr"].describe()
        report += ["### False rejection rate of vulnerable vs non-vulnerable functions\n", link.to_markdown(), "\n"]
        from scipy.stats import fisher_exact, mannwhitneyu
        rows = []
        for m, g in rd.groupby("model"):
            a = g[g["inclusive"] == True]["confirmed_vulnerable"]
            b = g[g["inclusive"] == False]["confirmed_vulnerable"]
            table = [[int(a.sum()), int(len(a) - a.sum())], [int(b.sum()), int(len(b) - b.sum())]]
            odds, pval = fisher_exact(table)
            rows.append({"model": m, "vulnerable_with_instruction": f"{table[0][0]}/{len(a)}",
                         "vulnerable_without_instruction": f"{table[1][0]}/{len(b)}",
                         "odds_ratio": round(odds, 3) if np.isfinite(odds) else "inf", "fisher_p": f"{pval:.2e}"})
        tf = pd.DataFrame(rows)
        tf.to_csv(RES / "04_redos_fisher_by_model.csv", index=False)
        report += ["### Per-model effect of the inclusivity instruction on confirmed ReDoS (Fisher exact test)\n",
                   tf.to_markdown(index=False), "\n"]
        lk = rd.merge(fn[["key", "frr"]], on="key", how="inner")
        x, y = lk[lk["confirmed_vulnerable"] == 1]["frr"], lk[lk["confirmed_vulnerable"] == 0]["frr"]
        if len(x) and len(y):
            stat, pmw = mannwhitneyu(x, y, alternative="two-sided")
            report += [f"Mann-Whitney U test, FRR vulnerable vs non-vulnerable functions: U={stat:.0f}, p={pmw:.2e} "
                       f"(medians {x.median():.3f} vs {y.median():.3f})\n"]

    (RES / "summary.md").write_text("\n".join(report), encoding="utf-8")
    print("\n".join(report))


if __name__ == "__main__":
    main()