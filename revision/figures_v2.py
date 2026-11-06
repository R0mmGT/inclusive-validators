"""Revised paper figures (Reviewer 1: "Figures and tables can be improved").

Same data, numbering and file names as src/figures.py; changes are presentational only:
  * every figure is drawn at its printed size, so fonts print at 7-9 pt;
  * no rotated tick labels (model names on two lines);
  * Figure 1: values printed once per bar, without "0.0%" clutter;
  * Figures 2-5: larger cells and labels, shared colour scale;
  * Figure 6: small multiples (one panel per field) with horizontal bars, so the regex
    style is read from the axis rather than from colour alone, and n is readable;
  * vector PDF (embedded TrueType fonts) plus 600-dpi PNG.

Usage: python revision/figures_v2.py   ->   revision/out/figures/fig1..fig7 (.pdf, .png)
"""
import json
from pathlib import Path

import matplotlib
matplotlib.use("Agg")
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
from scipy.stats import fisher_exact

ROOT = Path(__file__).resolve().parent.parent
RES = ROOT / "results"
OUT = ROOT / "revision" / "out" / "figures"
CM = 1 / 2.54

MODEL_ORDER = ["gemini-3.8-flash", "gpt-5-mini", "DeepSeek-V3.2", "llama3.1:8b-instruct-q8_0"]
MODEL_2L = {"gemini-3.8-flash": "Gemini\n3.8 Flash", "gpt-5-mini": "GPT-5\nmini",
            "DeepSeek-V3.2": "DeepSeek-\nV3.2", "llama3.1:8b-instruct-q8_0": "Llama\n3.1 8B"}
FIELD_LABELS = {"full_name": "Full name", "given_name": "Given name", "family_name": "Family name",
                "address_line": "Address line", "postal_code": "Postal code", "phone_number": "Telephone number"}
CATEGORY_LABELS = {
    "diacritics": "Diacritics", "enye": "Letter ñ", "two_surnames": "Two family names", "hyphen": "Hyphen",
    "apostrophe": "Apostrophe", "lowercase_particle": "Lower-case particle", "single_name": "Single-word name",
    "short": "Very short", "long": "Very long", "initials_suffix": "Initials or suffix",
    "non_latin": "Non-Latin script", "compound": "Compound", "us_zip_plus4": "US ZIP+4",
    "alphanumeric": "Alphanumeric", "hyphenated_non_us": "Hyphenated (non-US)",
    "internal_space_digits": "Digits with space", "four_digit": "Four digits", "six_digit": "Six digits",
    "three_digit": "Three digits", "five_digit_non_us": "Five digits (non-US)",
    "number_after_street": "Number after street name", "non_ascii_latin": "Non-ASCII Latin",
    "special_symbols": "Symbols (#, /, No.)", "no_number": "No street number (s/n)",
    "reference_based": "Reference-based", "block_numbering": "Block numbering",
    "fmt:e164": "E.164", "fmt:international": "International with spaces",
}
CONTROL_LABELS = {"names": "Control (Anglo-American)", "address_line": "Control (US street address)",
                  "postal_code": "Control (US ZIP code)", "phone_number": "Control (US, national format)"}
STYLE_ORDER = ["ascii_only", "explicit_non_ascii_ranges", "unicode_property", "other/none"]
STYLE_LABELS = {"ascii_only": "ASCII-only classes", "explicit_non_ascii_ranges": "Explicit non-ASCII ranges",
                "unicode_property": "Unicode property escapes", "other/none": "No letter class"}

# Okabe-Ito (colour-blind safe; checked with a CVD validator)
C_WITHOUT, C_WITH = "#0072B2", "#E69F00"
INK, MUTED, GRID = "#222222", "#555555", "#DDDDDD"

plt.rcParams.update({
    "font.family": "DejaVu Sans", "font.size": 8, "axes.titlesize": 8.5, "axes.labelsize": 8,
    "xtick.labelsize": 7.5, "ytick.labelsize": 7.5, "legend.fontsize": 7.5,
    "axes.spines.top": False, "axes.spines.right": False, "axes.edgecolor": MUTED, "axes.linewidth": 0.6,
    "xtick.color": INK, "ytick.color": INK, "xtick.major.width": 0.6, "ytick.major.width": 0.6,
    "text.color": INK, "axes.labelcolor": INK, "pdf.fonttype": 42, "ps.fonttype": 42,
    "savefig.bbox": "tight", "savefig.pad_inches": 0.02,
})


def as_bool(s):
    return s.astype(str).str.lower().isin(["true", "1"])


def save(fig, name):
    OUT.mkdir(parents=True, exist_ok=True)
    fig.savefig(OUT / f"{name}.pdf")
    fig.savefig(OUT / f"{name}.png", dpi=600)
    plt.close(fig)
    print("wrote", name)


def wilson(k, n, z=1.96):
    p = k / n
    d = 1 + z * z / n
    c = (p + z * z / (2 * n)) / d
    h = z * np.sqrt(p * (1 - p) / n + z * z / (4 * n * n)) / d
    return max(0.0, c - h), min(1.0, c + h)


def ygrid(ax):
    ax.yaxis.grid(True, color=GRID, linewidth=0.5)
    ax.set_axisbelow(True)


def grouped(ax, vals, los, his, labels_fmt=None, w=0.36):
    """vals/los/his: dict inc -> list over MODEL_ORDER (fractions)."""
    x = np.arange(len(MODEL_ORDER))
    for off, inc, col, lab in ((-w / 2 - 0.01, False, C_WITHOUT, "Without instruction"),
                               (w / 2 + 0.01, True, C_WITH, "With inclusivity instruction")):
        v, lo, hi = (np.asarray(d[inc], dtype=float) * 100 for d in (vals, los, his))
        ax.bar(x + off, v, w, color=col, label=lab, zorder=2)
        ax.errorbar(x + off, v, yerr=np.vstack([np.clip(v - lo, 0, None), np.clip(hi - v, 0, None)]),
                    fmt="none", ecolor=INK, elinewidth=0.6, capsize=1.8, capthick=0.6, zorder=3)
        if labels_fmt:
            for xi, vi, hii in zip(x + off, v, hi):
                ax.text(xi, hii + ax.get_ylim()[1] * 0.012, labels_fmt(vi), ha="center", va="bottom",
                        fontsize=6.5, color=INK)
    ax.set_xticks(x)
    ax.set_xticklabels([MODEL_2L[m] for m in MODEL_ORDER])
    ax.tick_params(axis="x", length=0)
    ygrid(ax)


# ---------------------------------------------------------------- Figure 1
def fig1():
    t = pd.read_csv(RES / "03_mitigation_by_model.csv")
    t["inclusive"] = as_bool(t["inclusive"])
    g = lambda inc, col: [float(t[(t.model == m) & (t.inclusive == inc)][col].squeeze()) for m in MODEL_ORDER]
    fig, axes = plt.subplots(1, 2, figsize=(17 * CM, 6.6 * CM))
    spec = ((axes[0], "frr", "(a) False rejection of valid inputs", 100, lambda v: "0" if v == 0 else f"{v:.1f}" if v < 1 else f"{v:.0f}"),
            (axes[1], "far", "(b) False acceptance of invalid inputs", 12, lambda v: "0" if v == 0 else f"{v:.1f}"))
    for ax, m, title, ymax, fmt in spec:
        ax.set_ylim(0, ymax)
        grouped(ax, {i: g(i, m) for i in (False, True)}, {i: g(i, f"ci_low_{m}") for i in (False, True)},
                {i: g(i, f"ci_high_{m}") for i in (False, True)}, labels_fmt=fmt)
        ax.set_title(title, loc="left", fontweight="bold")
        ax.set_ylabel("Mean rate per function (%)")
    h, l = axes[0].get_legend_handles_labels()
    fig.legend(h, l, frameon=False, ncol=2, loc="lower center", bbox_to_anchor=(0.5, -0.02))
    fig.tight_layout(rect=(0, 0.07, 1, 1), w_pad=2.5)
    save(fig, "fig1_exclusion_and_mitigation")


# ---------------------------------------------------------------- Figures 2-5
NAME_FIELDS = ("full_name", "given_name", "family_name")
FIG2_PARTS = [("names", "fig2_rejection_names"), ("address_line", "fig3_rejection_address"),
              ("postal_code", "fig4_rejection_postal_code"), ("phone_number", "fig5_rejection_phone")]


def fig2():
    long = pd.read_csv(RES / "long_results.csv.gz", low_memory=False)
    corpus = pd.DataFrame(json.load(open(ROOT / "corpus/corpus.json", encoding="utf-8"))["items"])
    v = long[long["expected"] == "valid"].copy()
    v["rejected"] = 1 - v["accepted"]
    v = v.merge(corpus[["id", "format"]], on="id", how="left")
    ph = v["field"] == "phone_number"
    v.loc[ph, "category"] = "fmt:" + v.loc[ph, "format"].astype(str)
    v.loc[v["category"] == "fmt:national", "category"] = "control"
    v.loc[v["category"] == "short_parts", "category"] = "short"
    v["group"] = np.where(v["field"].isin(NAME_FIELDS), "names", v["field"])
    per_fn = v.groupby(["model", "key", "group", "category"])["rejected"].mean().reset_index()
    per_model = per_fn.groupby(["group", "category", "model"])["rejected"].mean()
    overall = per_fn.groupby(["group", "category"])["rejected"].mean()
    cmap = matplotlib.colormaps["OrRd"]
    for group, fname in FIG2_PARTS:
        sub = overall.loc[group]
        rest = sub.drop("control").sort_values(ascending=False).index.tolist()
        cats = ["control"] + rest
        mat = np.array([[per_model.get((group, c, m), np.nan) for m in MODEL_ORDER] for c in cats]) * 100
        h = (0.52 * len(cats) + 1.9) * CM
        fig, ax = plt.subplots(figsize=(11 * CM, h))
        im = ax.imshow(mat, aspect="auto", cmap=cmap, vmin=0, vmax=100)
        for i in range(mat.shape[0]):
            for j in range(mat.shape[1]):
                if np.isfinite(mat[i, j]):
                    ax.text(j, i, f"{mat[i, j]:.0f}", ha="center", va="center", fontsize=7.5,
                            color="white" if mat[i, j] > 55 else INK)
        ax.set_xticks(range(len(MODEL_ORDER)))
        ax.set_xticklabels([MODEL_2L[m] for m in MODEL_ORDER])
        ax.xaxis.tick_top()
        ax.set_yticks(range(len(cats)))
        ax.set_yticklabels([CONTROL_LABELS[group] if c == "control" else CATEGORY_LABELS.get(c, c) for c in cats])
        ax.get_yticklabels()[0].set_fontstyle("italic")
        ax.axhline(0.5, color=INK, linewidth=0.8)
        ax.set_xticks(np.arange(-0.5, len(MODEL_ORDER)), minor=True)
        ax.set_yticks(np.arange(-0.5, len(cats)), minor=True)
        ax.grid(which="minor", color="white", linewidth=1.2)
        ax.tick_params(which="both", length=0)
        for sp in ax.spines.values():
            sp.set_visible(False)
        cb = fig.colorbar(im, ax=ax, fraction=0.045, pad=0.03)
        cb.set_label("Rejection rate (%)")
        cb.outline.set_visible(False)
        cb.ax.tick_params(length=2, width=0.5)
        fig.tight_layout()
        save(fig, fname)


# ---------------------------------------------------------------- Figure 6
def fig6():
    t = pd.read_csv(RES / "01_frr_by_regex_style.csv")
    fields = [f for f in FIELD_LABELS if f in set(t["field"])]
    fig, axes = plt.subplots(2, 3, figsize=(17 * CM, 8.4 * CM), sharex=True, sharey=True)
    y = np.arange(len(STYLE_ORDER))[::-1]
    for ax, f in zip(axes.flat, fields):
        for yi, s in zip(y, STYLE_ORDER):
            r = t[(t.field == f) & (t.regex_style == s)]
            if not len(r):
                continue
            v, lo, hi = (float(r[c].iloc[0]) * 100 for c in ("frr", "ci_low", "ci_high"))
            n = int(r["n_functions"].iloc[0])
            col = {"ascii_only": "#D55E00", "explicit_non_ascii_ranges": "#CC79A7", "unicode_property": "#009E73"}.get(s, "#8C8C8C")
            ax.barh(yi, v, 0.62, color=col, zorder=2)
            ax.errorbar(v, yi, xerr=[[max(v - lo, 0)], [max(hi - v, 0)]], fmt="none", ecolor=INK,
                        elinewidth=0.6, capsize=1.6, capthick=0.6, zorder=3)
            ax.text(min(hi, 100) + 2.5, yi, f"{v:.0f}% (n = {n})", va="center", ha="left", fontsize=6.5)
        ax.set_title(FIELD_LABELS[f], loc="left", fontweight="bold")
        ax.set_xlim(0, 135)
        ax.set_xticks([0, 25, 50, 75, 100])
        ax.xaxis.grid(True, color=GRID, linewidth=0.5)
        ax.set_axisbelow(True)
        ax.tick_params(axis="y", length=0)
        ax.spines["left"].set_visible(False)
    axes[0, 0].set_yticks(y)
    axes[0, 0].set_yticklabels([STYLE_LABELS[s] for s in STYLE_ORDER])
    for ax in axes[1]:
        ax.set_xlabel("False rejection rate (%)")
    fig.tight_layout(h_pad=1.0, w_pad=0.8)
    save(fig, "fig6_rejection_by_regex_style")


# ---------------------------------------------------------------- Figure 7
def fig7():
    rd = pd.read_csv(RES / "04_redos_function_level.csv")
    rd["inclusive"] = as_bool(rd["inclusive"])
    st = {}
    for m in MODEL_ORDER:
        for inc in (False, True):
            g = rd[(rd.model == m) & (rd.inclusive == inc)]["confirmed_vulnerable"]
            k, n = int(g.sum()), len(g)
            st[(m, inc)] = (k, n, k / n, *wilson(k, n))
    fig, ax = plt.subplots(figsize=(10.5 * CM, 6.4 * CM))
    ax.set_ylim(0, 25)
    d = lambda i: {inc: [st[(m, inc)][i] for m in MODEL_ORDER] for inc in (False, True)}
    grouped(ax, d(2), d(3), d(4))
    for j, m in enumerate(MODEL_ORDER):
        for off, inc in ((-0.19, False), (0.19, True)):
            k, n, p, lo, hi = st[(m, inc)]
            ax.text(j + off, hi * 100 + 0.4, f"{k}", ha="center", va="bottom", fontsize=6.5)
        a, b = st[(m, True)], st[(m, False)]
        _, pv = fisher_exact([[a[0], a[1] - a[0]], [b[0], b[1] - b[0]]])
        mark = "***" if pv < 0.001 else "**" if pv < 0.01 else "*" if pv < 0.05 else ""
        if mark:
            top = max(a[4], b[4]) * 100 + 2.6
            ax.plot([j - 0.19, j - 0.19, j + 0.19, j + 0.19], [top - 0.5, top, top, top - 0.5], color=INK, lw=0.7)
            ax.text(j, top + 0.1, mark, ha="center", va="bottom", fontsize=8)
    ax.set_ylabel("Confirmed ReDoS-vulnerable\nfunctions (%)")
    ax.legend(frameon=False, loc="upper right")
    fig.tight_layout()
    save(fig, "fig7_redos_by_model")


if __name__ == "__main__":
    for f in (fig1, fig2, fig6, fig7):
        f()
