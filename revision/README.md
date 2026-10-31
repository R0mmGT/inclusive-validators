# Revision analyses (Reviewer 1, round 1)

Everything in this folder was added for the revision. It reads the stored data in `data/`,
`corpus/` and `results/` and never modifies them. Node scripts need the dependencies of the
main package (`npm ci`); Python scripts need `requirements.txt`.

| Step | Command | Output (in `revision/out/`) | Reviewer point |
| --- | --- | --- | --- |
| Coverage of the ReDoS analysis | `python revision/coverage.py` | `coverage_*.csv` | 3 |
| Re-derive attacks, capture run-time patterns | `RECHECK_BACKEND=pure node revision/recheck_attacks.js` | `attacks.json`, `dynamic_capture.json` | 1, 3 |
| Growth curves under five configurations | `./revision/run_configs.sh` (calls `curves.js`) | `curves_<config>.jsonl` | 1 |
| Re-apply the decision rule, threshold grid, validation suite | `python revision/analyze_curves.py` | `agreement.csv`, `threshold_grid*.csv`, `synthetic_accuracy.csv`, `dynamic_confirmed.csv`, `alt_rule.csv` | 1, 2 |
| Guard-aware probe of unconfirmed functions | `node revision/adaptive_probe.js` | `adaptive_probe.json` | 2 |
| recheck native vs pure backend | `RECHECK_BACKEND=pure node revision/backend_compare.js`, then `native`, then `--compare` | `backend_*.jsonl`, `backend_compare.json` | 1 |
| Supplementary corpus | `python revision/corpus_extension.py`, `node revision/run_ext.js`, `python revision/ext_analysis.py` | `../corpus_ext.json`, `results_ext.jsonl`, `ext_*.csv` | 5 |
| Functional and statistical analyses | `python revision/functional.py` | `stats/*.csv`, `stats/summary.md` | 4, 5, 7 |
| Dependence sensitivity (prompt-cell and two-way clustering) | `python revision/dependence.py` | `stats/dependence.csv` | R2-4 |
| Coding of confirmed vulnerabilities | `python revision/code_vulns.py` | `vuln_coding*.csv` | 6 |
| Worked example | `node revision/worked_example.js` | `worked_example.json` | 9 |
| LaTeX tables | `python revision/make_tables.py` | `tables.tex` | all |

Synthetic validators of known complexity are defined in `synthetic_suite.js`.

Configurations of the timing study (all on the same Linux machine, 2 vCPU Intel Xeon 2.1 GHz):
`node20_idle` (Node.js 20.20.2), `node20_interpreter` (`--regexp-interpret-all`), `node22_idle`
(Node.js 22.23.4), `node20_contention` (two busy loops saturating both cores), `node20_warmup`
(20 calls with the k = 1 attack before measuring). The original run (Windows) is the reference.
Timings are machine-specific; the classifications, not the milliseconds, are what should replicate.
