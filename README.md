# Inclusive or Exploitable? — Replication package

Code and data for the article *Inclusive or Exploitable? Cultural Exclusion and
ReDoS Vulnerabilities in LLM-Generated Input Validation Code* by Rommel Gutierrez
and Jaime Govea.

LLMs are asked to write a JavaScript `validate(value)` function for six
personal-data fields. Each generated function is run against a corpus of valid
inputs from different cultural conventions and of invalid inputs, and every
regular expression it contains is analysed for ReDoS.

## Repository layout

```
config.yaml          models, experimental factors, timeouts
corpus/              test corpus (curated.yaml -> corpus.json)
src/                 generation, extraction and analysis (Python)
harness/             execution sandbox and ReDoS analysis (Node.js)
data/                raw responses, extracted functions, execution and ReDoS results
results/             result tables (CSV)
revision/            additional analyses for the review rounds (see revision/README.md)
MANIFEST.md          index of every file with role, size and SHA-256
SHA256SUMS           checksums; verify with `sha256sum -c SHA256SUMS`
```

## Pipeline

| Step | Script | Output |
|---|---|---|
| 1. Build test corpus | `corpus/build_corpus.py` | `corpus/corpus.json` |
| 2. Query LLMs | `src/generate.py` | `data/responses.jsonl` |
| 3. Extract code | `src/extract.py` | `data/functions/*.js`, `data/extracted.jsonl` |
| 4. Execute validators | `harness/runner.js` | `data/results.jsonl` |
| 5. ReDoS analysis | `harness/redos.js` | `data/redos.jsonl` |
| 6. Statistics | `src/analyze.py` | `results/*.csv`, `results/summary.md` |

Steps 2, 4 and 5 skip items already present in their output file.

## Setup

Python ≥ 3.10 and Node.js ≥ 20.

```bash
pip install -r requirements.txt
npm install
```

## Reproducing the results

All data from the study is included. To recompute the tables from the stored
model outputs:

```bash
python src/analyze.py
```

To re-run execution and ReDoS analysis from scratch, remove
`data/results.jsonl` and `data/redos.jsonl` and run steps 4–6.

To run the full experiment with new generations, set the endpoints in
`config.yaml`, export the API keys named there (`AZURE_OPENAI_API_KEY`,
`GEMINI_API_KEY`, ...) and run steps 1–6 in order on an empty `data/` directory:

```bash
python corpus/build_corpus.py
python src/generate.py
python src/extract.py
node harness/runner.js
node harness/redos.js
python src/analyze.py
```

Design: 4 models × 6 fields × 2 languages (en, es) × 2 contexts (bare,
e-commerce) × 2 inclusivity conditions × 10 repetitions = 1,920 generations.
The exact prompts can be printed with `python src/prompts.py`.

## Outcome coding

- A validator *accepts* an input if `validate()` returns a truthy value;
  `accepted_strict` (sensitivity analysis) requires exactly `true`. Exceptions
  and timeouts count as not accepted.
- **Control inputs** (Anglo-American names, US ZIP codes, US phone numbers in
  national format, US street addresses) separate broken validators from
  exclusionary ones and are excluded from the false rejection rate.
- **False rejection rate (FRR):** share of non-control valid inputs rejected, per function.
- **False acceptance rate (FAR):** share of invalid inputs accepted, per function.
- Rates are averaged across functions, with 95% bootstrap CIs over functions.

## ReDoS analysis

1. Regexes are extracted statically with `acorn` (literals and `RegExp(...)`
   with constant arguments; non-constant arguments are counted as dynamic).
2. `recheck` classifies each regex as safe or vulnerable (polynomial/exponential)
   and produces an attack string.
3. Dynamic confirmation: `validate()` is called with attack strings of growing
   length. A function is confirmed vulnerable if the empirical complexity
   exponent is ≥ 1.5 or the call times out (2 s) after growth.
4. Revision analyses (`revision/`): cross-configuration and threshold
   checks of step 3, a validation suite of synthetic validators, a guard-aware
   probe of unconfirmed functions, run-time capture of dynamically built
   patterns, a supplementary negative/NFD corpus, additional statistics and
   the coding of confirmed vulnerabilities. The second review round added
   `revision/round2.py` (exponential/polynomial split, sensitivity table,
   language effect, false-acceptance separation checks and the agreement of
   the two authors' review of the coding). A failure to confirm is not
   evidence that a function is safe.

## Safety

`node:vm` is not a security boundary. Run steps 4–5 in an isolated container, e.g.:

```bash
docker run --rm -it --network none -v "$PWD":/work -w /work node:22 \
  sh -c "node harness/runner.js && node harness/redos.js"
```

## License

MIT. See `LICENSE`.

## Citation

If you use this code or data, please cite:

> R. Gutierrez and J. Govea, "Inclusive or Exploitable? Cultural Exclusion and
> ReDoS Vulnerabilities in LLM-Generated Input Validation Code," 2026.

See also `CITATION.cff`.
