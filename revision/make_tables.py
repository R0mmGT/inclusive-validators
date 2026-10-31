#!/usr/bin/env python3
"""Generate the LaTeX tables of the revision from revision/out/*.csv (avoids transcription errors)."""
import json
from pathlib import Path

import pandas as pd

OUT = Path(__file__).resolve().parent / "out"
ST = OUT / "stats"
L = []
CFG = {"node20_idle": ("Linux, Node.js 20.20.2 (V8 11.3), idle", "B"),
       "node20_interpreter": ("Linux, Node.js 20.20.2, \\texttt{--regexp-interpret-all}", "C"),
       "node22_idle": ("Linux, Node.js 22.23.4 (V8 12.4), idle", "D"),
       "node20_contention": ("Linux, Node.js 20.20.2, both cores saturated", "E"),
       "node20_warmup": ("Linux, Node.js 20.20.2, 20 warm-up calls", "F")}
MLAB = {"gemini-3.8-flash": "Gemini 3.8 Flash", "gpt-5-mini": "GPT-5 mini", "DeepSeek-V3.2": "DeepSeek-V3.2",
        "llama3.1:8b-instruct-q8_0": "Llama 3.1 8B"}


def term(t):
    t = t.replace("C(model, Treatment('DeepSeek-V3.2'))[T.", "").replace("C(language)[T.es]", "Spanish prompt")
    t = t.replace("C(context)[T.ecommerce]", "Online-store context").replace("inclusive", "Instruction")
    for k, v in MLAB.items():
        t = t.replace(k + "]", v).replace(k.replace(":", "-") + "]", v)
    for f, v in {"family_name": "Family name", "full_name": "Full name", "given_name": "Given name",
                 "phone_number": "Telephone number", "postal_code": "Postal code"}.items():
        t = t.replace(f"C(field)[T.{f}]", v)
    return t.replace(":", " $\\times$ ")


def p(x):
    return "$<$0.001" if x < 0.001 else f"{x:.3f}"


# ---- validation suite
sy = pd.read_csv(OUT / "synthetic_accuracy.csv")
cfgs = [c for c in CFG if c in set(sy["config"])]
piv = sy.pivot_table(index=["key", "complexity", "expected", "procedure_expected"], columns="config",
                     values="confirmed", aggfunc="first").reset_index()
L += ["\\begin{table}[H]", "\\caption{Validation suite: synthetic validators of known complexity. Expected = ground truth; "
      "the control-character case is expected to be missed with recheck's attack and found with an adapted suffix. "
      "Confirmed = classification by the procedure in each configuration " + ", ".join(CFG[c][1] for c in cfgs) + ".\\label{tab:validation}}",
      "\\begin{tabularx}{\\textwidth}{lXcc" + "c" * len(cfgs) + "}", "\\toprule",
      "\\textbf{Id} & \\textbf{Construction} & \\textbf{Exploitable} & \\textbf{Expected} & " +
      " & ".join(f"\\textbf{{{CFG[c][1]}}}" for c in cfgs) + "\\\\", "\\midrule"]
for _, r in piv.iterrows():
    L.append(f"{r['key'].replace('SYN_', '').replace('_', '-')} & {r['complexity']} & {'yes' if r['expected'] else 'no'} & "
             f"{'yes' if r['procedure_expected'] else 'no'} & " +
             " & ".join("yes" if r[c] is True or r[c] == 1 else ("no" if r[c] in (False, 0) else "--") for c in cfgs) + "\\\\")
L += ["\\bottomrule", "\\end{tabularx}", "\\end{table}", ""]

# ---- agreement
ag = pd.read_csv(OUT / "agreement.csv").set_index("config")
alt = pd.read_csv(OUT / "alt_rule.csv").set_index("config")
L += ["\\begin{table}[H]", "\\caption{Agreement of the growth-based classification with the original run (A: Windows, "
      "Node.js \\texttt{[v20.x.y]}, recheck pure backend) over the 283 statically vulnerable pattern occurrences in the 214 loadable "
      "vulnerable functions; same attack strings, same decision rule.\\label{tab:agreement}}",
      "\\small", "\\begin{tabularx}{\\textwidth}{l>{\\raggedright\\arraybackslash}X>{\\centering\\arraybackslash}p{1.7cm}c>{\\centering\\arraybackslash}p{1.9cm}>{\\centering\\arraybackslash}p{1.7cm}}", "\\toprule",
      "& \\textbf{Configuration} & \\textbf{Occurrences agreeing} & \\textbf{$\\kappa$} & \\textbf{Functions confirmed (A: 64)} & \\textbf{Functions agreeing}\\\\",
      "\\midrule"]
for c in cfgs:
    r = ag.loc[c]
    L.append(f"{CFG[c][1]} & {CFG[c][0]} & {r['agree']}/{r['occurrences']} & {r['kappa']:.2f} & "
             f"{r['functions_config_confirmed']} & {r['functions_agree']}/{r['functions']}\\\\")
L += ["\\bottomrule", "\\end{tabularx}", "\\end{table}", ""]

# ---- thresholds
g = pd.read_csv(OUT / "threshold_grid.csv")
gi = g[g["config"] == "node20_idle"]
L += ["\\begin{table}[H]", "\\caption{Sensitivity of the number of confirmed functions (of 214 loadable statically vulnerable "
      "functions) to the decision thresholds, re-applied to the growth curves of configuration B. Original setting in bold; "
      "agreement with the original run in parentheses.\\label{tab:thresholds}}",
      "\\begin{tabularx}{\\textwidth}{cC" + "C" * 3 + "}", "\\toprule",
      "\\textbf{Floor (ms)} & \\textbf{Exponent} & \\textbf{Timeout 1000 ms} & \\textbf{Timeout 2000 ms} & \\textbf{Timeout 5000 ms}\\\\", "\\midrule"]
for (fl, ex), gg in gi.groupby(["floor_ms", "exponent"]):
    cells = []
    for to in (1000, 2000, 5000):
        r = gg[gg["timeout_ms"] == to].iloc[0]
        s = f"{r['functions_confirmed']} ({100 * r['functions_agree_with_stored']:.1f}\\%)"
        cells.append(f"\\textbf{{{s}}}" if (fl, ex, to) == (20, 1.5, 2000) else s)
    L.append(f"{fl} & {ex} & " + " & ".join(cells) + "\\\\")
L += ["\\bottomrule", "\\end{tabularx}", "\\end{table}", ""]
gsum = pd.read_csv(OUT / "threshold_grid_summary.csv")

# ---- appendix: GEE tables with CI
def gee_table(files, caption, label):
    tabs = [pd.read_csv(ST / f) for f in files]
    rows = ["\\begin{table}[H]", f"\\caption{{{caption}\\label{{{label}}}}}",
            "\\begin{tabularx}{\\textwidth}{X" + "cc" * len(tabs) + "}", "\\toprule"]
    return tabs, rows


tabs = [pd.read_csv(ST / "gee_frr_main.csv"), pd.read_csv(ST / "gee_far_main.csv")]
L += ["\\begin{table}[H]", "\\caption{GEE logistic models (Table 7 with 95\\% confidence intervals). Robust standard errors, exchangeable "
      "working correlation, function as cluster. Reference levels: DeepSeek-V3.2, English, no context, no instruction, address line.\\label{tab:gee}}",
      "\\begin{tabularx}{\\textwidth}{Xcccc}", "\\toprule",
      "& \\multicolumn{2}{c}{\\textbf{False rejection}} & \\multicolumn{2}{c}{\\textbf{False acceptance}}\\\\",
      "\\textbf{Covariate} & \\textbf{OR [95\\% CI]} & \\textbf{\\emph{p}} & \\textbf{OR [95\\% CI]} & \\textbf{\\emph{p}}\\\\", "\\midrule"]
for (_, a), (_, b) in zip(tabs[0].iterrows(), tabs[1].iterrows()):
    if a["term"] == "Intercept":
        continue
    L.append(f"{term(a['term'])} & {a['OR']:.2f} [{a['OR_lo']:.2f}, {a['OR_hi']:.2f}] & {p(a['p'])} & "
             f"{b['OR']:.2f} [{b['OR_lo']:.2f}, {b['OR_hi']:.2f}] & {p(b['p'])}\\\\")
conv = pd.read_csv(ST / "gee_convergence.csv").set_index("model")
L += ["\\midrule", f"Observations / clusters & \\multicolumn{{2}}{{c}}{{{conv.loc['frr_main','n_obs']} / {conv.loc['frr_main','n_clusters']}}} & "
      f"\\multicolumn{{2}}{{c}}{{{conv.loc['far_main','n_obs']} / {conv.loc['far_main','n_clusters']}}}\\\\",
      f"Working correlation $\\hat\\rho$; iterations & \\multicolumn{{2}}{{c}}{{{conv.loc['frr_main','exchangeable_rho']:.3f}; {conv.loc['frr_main','iterations']}}} & "
      f"\\multicolumn{{2}}{{c}}{{{conv.loc['far_main','exchangeable_rho']:.3f}; {conv.loc['far_main','iterations']}}}\\\\",
      "\\bottomrule", "\\end{tabularx}", "\\end{table}", ""]

it = pd.read_csv(ST / "gee_frr_interaction.csv")
itp = pd.read_csv(ST / "gee_frr_interaction_control_passing.csv")
pm = pd.read_csv(ST / "instruction_or_by_model.csv")
L += ["\\begin{table}[H]", "\\caption{GEE model of false rejection with the model $\\times$ instruction interaction, for all usable "
      "validators and for control-passing validators only, and the instruction odds ratio within each model "
      "(linear combinations of coefficients).\\label{tab:interaction}}",
      "\\begin{tabularx}{\\textwidth}{Xcccc}", "\\toprule",
      "& \\multicolumn{2}{c}{\\textbf{All usable (n = 1763)}} & \\multicolumn{2}{c}{\\textbf{Control-passing (n = 1505)}}\\\\",
      "\\textbf{Term} & \\textbf{OR [95\\% CI]} & \\textbf{\\emph{p}} & \\textbf{OR [95\\% CI]} & \\textbf{\\emph{p}}\\\\", "\\midrule"]
for (_, a), (_, b) in zip(it.iterrows(), itp.iterrows()):
    if a["term"] == "Intercept":
        continue
    L.append(f"{term(a['term'])} & {a['OR']:.3g} [{a['OR_lo']:.3g}, {a['OR_hi']:.3g}] & {p(a['p'])} & "
             f"{b['OR']:.3g} [{b['OR_lo']:.3g}, {b['OR_hi']:.3g}] & {p(b['p'])}\\\\")
L += ["\\midrule", "\\multicolumn{5}{l}{\\textit{Instruction odds ratio within each model}}\\\\"]
for m in ["Gemini 3.8 Flash", "GPT-5 mini", "DeepSeek-V3.2", "Llama 3.1 8B"]:
    a = pm[(pm["analysis"] == "all usable") & (pm["model"] == m)].iloc[0]
    b = pm[(pm["analysis"] == "control-passing") & (pm["model"] == m)].iloc[0]
    L.append(f"{m} & {a['OR_instruction']:.3f} [{a['OR_lo']:.3f}, {a['OR_hi']:.3f}] & {p(a['p'])} & "
             f"{b['OR_instruction']:.3f} [{b['OR_lo']:.3f}, {b['OR_hi']:.3f}] & {p(b['p'])}\\\\")
L += ["\\bottomrule", "\\end{tabularx}", "\\end{table}", ""]

rl = pd.read_csv(ST / "redos_logistic.csv")
mn, ix = rl[rl["model"] == "main"], rl[rl["model"] == "interaction"]
L += ["\\begin{table}[H]", "\\caption{Logistic models of confirmed ReDoS vulnerability (n = 1919 extracted functions, 64 events): "
      "\\emph{confirmed} $\\sim$ model + language + context + instruction + field, fitted by maximum likelihood (ML) and with "
      "Firth's penalty; and the Firth model with the model $\\times$ instruction interaction (ML does not converge because "
      "GPT-5 mini without instruction has no event). Wald 95\\% CIs.\\label{tab:redoslogit}}",
      "\\begin{tabularx}{\\textwidth}{Xccc}", "\\toprule",
      "\\textbf{Term} & \\textbf{ML OR [95\\% CI]} & \\textbf{Firth OR [95\\% CI]} & \\textbf{Firth OR, interaction model}\\\\", "\\midrule"]
import numpy as np
import statsmodels.formula.api as smf
a = pd.read_csv(ST / "all_generations.csv")
r = a[a["status"] == "ok"].copy()
r["y"] = r["confirmed_vulnerable"].astype(int)
r["inclusive"] = r["inclusive"].astype(int)
ml = smf.logit("y ~ C(model, Treatment('DeepSeek-V3.2')) + C(language) + C(context) + inclusive + C(field)", r).fit(disp=0)
ci = ml.conf_int()
terms = list(ix["term"])
for t in terms:
    if t == "Intercept":
        continue
    cell_ml = f"{np.exp(ml.params[t]):.2f} [{np.exp(ci.loc[t,0]):.2f}, {np.exp(ci.loc[t,1]):.2f}]" if t in ml.params else "--"
    fm = mn[mn["term"] == t]
    cell_f = f"{fm['Firth_OR'].iloc[0]:.2f} [{fm['Firth_lo'].iloc[0]:.2f}, {fm['Firth_hi'].iloc[0]:.2f}]" if len(fm) else "--"
    fi = ix[ix["term"] == t].iloc[0]
    L.append(f"{term(t)} & {cell_ml} & {cell_f} & {fi['Firth_OR']:.3g} [{fi['Firth_lo']:.3g}, {fi['Firth_hi']:.3g}]\\\\")
L += ["\\bottomrule", "\\end{tabularx}", "\\end{table}", ""]

ho = pd.read_csv(ST / "holm.csv")
L += ["\\begin{table}[H]", "\\caption{Holm adjustment over the 14 inferential tests reported in Section 4.\\label{tab:holm}}",
      "\\begin{tabularx}{\\textwidth}{Xcc}", "\\toprule", "\\textbf{Test} & \\textbf{\\emph{p}} & \\textbf{Holm \\emph{p}}\\\\", "\\midrule"]
for _, rr in ho.iterrows():
    L.append(f"{rr['test'].replace('->', '$\\rightarrow$').replace(' x ', ' $\\times$ ')} & {rr['p']:.2g} & {min(1, rr['p_holm']):.2g}\\\\")
L += ["\\bottomrule", "\\end{tabularx}", "\\end{table}", ""]

es = pd.read_csv(ST / "frr_estimands.csv")
L += ["\\begin{table}[H]", "\\caption{False rejection rate (\\%) under three estimands: mean of per-function rates (used in the paper), "
      "pooled over all validator--input pairs (the scale of the GEE models), and category-balanced (per function, mean over "
      "input categories).\\label{tab:estimands}}", "\\begin{tabularx}{\\textwidth}{lcCCC}", "\\toprule",
      "\\textbf{Model} & \\textbf{Instr.} & \\textbf{Function mean} & \\textbf{Pooled inputs} & \\textbf{Category-balanced}\\\\", "\\midrule"]
for _, rr in es.iterrows():
    L.append(f"{rr['model']} & {'yes' if rr['instruction']=='with' else 'no'} & {rr['FRR_function_avg']} & {rr['FRR_pooled_inputs']} & {rr['FRR_category_balanced']}\\\\")
L += ["\\bottomrule", "\\end{tabularx}", "\\end{table}", ""]

bs = pd.read_csv(ST / "bootstrap_simple_vs_stratified.csv")
L += ["\\begin{table}[H]", "\\caption{Bootstrap 95\\% CIs for the FRR (\\%): resampling functions within model $\\times$ instruction "
      "(used in the paper) versus resampling within each of the 24 design cells (field $\\times$ language $\\times$ context).\\label{tab:bootstrap}}",
      "\\begin{tabularx}{\\textwidth}{lcCCC}", "\\toprule",
      "\\textbf{Model} & \\textbf{Instr.} & \\textbf{FRR} & \\textbf{Simple} & \\textbf{Stratified}\\\\", "\\midrule"]
for _, rr in bs.iterrows():
    L.append(f"{rr['model']} & {'yes' if rr['instruction']=='with' else 'no'} & {rr['FRR']} & {rr['simple_CI']} & {rr['stratified_CI']}\\\\")
L += ["\\bottomrule", "\\end{tabularx}", "\\end{table}", ""]

(OUT / "tables.tex").write_text("\n".join(L), encoding="utf-8")
print("\n".join(L)[:3000])
print(gsum.to_string())
