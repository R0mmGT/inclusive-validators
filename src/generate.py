"""Query the LLMs and store the raw responses in data/responses.jsonl.

Usage: python src/generate.py
Generations already stored with status "ok" are skipped.
"""
import argparse
import datetime as dt
import itertools
import json
import os
import random
import threading
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
from pathlib import Path

import yaml

from prompts import build_prompt

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "data" / "responses.jsonl"
_lock = threading.Lock()


def make_key(model, field, lang, ctx, inc, rep):
    slug = model.replace("/", "-").replace(":", "-")
    return f"{slug}__{field}__{lang}__{ctx}__{'incl' if inc else 'base'}__r{rep:02d}"


def load_done():
    done = set()
    if OUT.exists():
        with OUT.open(encoding="utf-8") as f:
            for line in f:
                rec = json.loads(line)
                if rec.get("status") == "ok":
                    done.add(rec["key"])
    return done


def append(rec):
    with _lock, OUT.open("a", encoding="utf-8") as f:
        f.write(json.dumps(rec, ensure_ascii=False) + "\n")


# Some endpoints reject `max_tokens` and require `max_completion_tokens`.
_token_param = {}


def call_api(client, cfg, model, prompt):
    token_param = _token_param.get(model, "max_tokens")
    last_err = None
    attempt = 0
    while attempt < cfg["api"]["max_retries"]:
        kwargs = dict(model=model, messages=[{"role": "user", "content": prompt}],
                      **{token_param: cfg["generation"]["max_tokens"]})
        if cfg["generation"]["temperature"] is not None:
            kwargs["temperature"] = cfg["generation"]["temperature"]
        try:
            r = client.chat.completions.create(**kwargs)
            usage = r.usage.model_dump() if r.usage else None
            return {"status": "ok", "response": r.choices[0].message.content or "",
                    "finish_reason": r.choices[0].finish_reason,
                    "model_returned": getattr(r, "model", None), "usage": usage,
                    "token_param": token_param}
        except Exception as e:
            last_err = repr(e)
            if token_param == "max_tokens" and "max_completion_tokens" in str(e):
                token_param = "max_completion_tokens"
                _token_param[model] = token_param
                continue
            status = getattr(e, "status_code", None)
            if "content_filter" in str(e):
                attempt += 1
                continue
            if status is not None and 400 <= status < 500 and status not in (408, 409, 429):
                break
            attempt += 1
            time.sleep(min(60, 2 ** attempt + random.random()))
    return {"status": "error", "error": last_err}


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--reps", type=int, default=None, help="override repetitions")
    args = ap.parse_args()

    cfg = yaml.safe_load((ROOT / "config.yaml").read_text(encoding="utf-8"))
    reps = args.reps or cfg["generation"]["repetitions"]
    model_specs = {}
    for m in cfg["models"]:
        if isinstance(m, str):
            m = {"name": m}
        model_specs[m["name"]] = {"base_url": m.get("base_url", cfg["api"]["base_url"]),
                                  "api_key_env": m.get("api_key_env", cfg["api"]["api_key_env"]),
                                  "max_workers": m.get("max_workers", cfg["api"]["max_workers"])}
    models = list(model_specs)
    OUT.parent.mkdir(parents=True, exist_ok=True)

    jobs = []
    done = load_done()
    for model, field, lang, ctx, inc, rep in itertools.product(
            models, cfg["fields"], cfg["languages"], cfg["contexts"], cfg["inclusive"], range(reps)):
        key = make_key(model, field, lang, ctx, inc, rep)
        if key not in done:
            jobs.append((key, model, field, lang, ctx, inc, rep))
    print(f"{len(jobs)} generations pending ({len(done)} already done)")

    from openai import OpenAI
    clients = {}
    for name, spec in model_specs.items():
        key = os.environ.get(spec["api_key_env"])
        if not key:
            raise SystemExit(f"Environment variable {spec['api_key_env']} is not set (needed for {name})")
        clients[name] = OpenAI(base_url=spec["base_url"], api_key=key)

    def run(job):
        key, model, field, lang, ctx, inc, rep = job
        prompt = build_prompt(field, lang, ctx, inc)
        res = call_api(clients[model], cfg, model, prompt)
        rec = {"key": key, "model": model,
               "endpoint": model_specs[model]["base_url"], "field": field, "language": lang, "context": ctx,
               "inclusive": inc, "rep": rep, "prompt": prompt,
               "temperature": cfg["generation"]["temperature"],
               "max_tokens": cfg["generation"]["max_tokens"],
               "timestamp": dt.datetime.now(dt.timezone.utc).isoformat(), **res}
        append(rec)
        return rec["status"], model

    # One worker pool per model; jobs within a model run in a seeded random order.
    by_model = {}
    for j in jobs:
        by_model.setdefault(j[1], []).append(j)
    pools, futures = [], []
    for model, mjobs in by_model.items():
        random.Random(42).shuffle(mjobs)
        n = model_specs[model]["max_workers"]
        ex = ThreadPoolExecutor(max_workers=n)
        pools.append(ex)
        futures += [ex.submit(run, j) for j in mjobs]
        print(f"  {model}: {len(mjobs)} pending, {n} parallel request(s)")

    ok = err = 0
    per_model = {m: [0, len(v)] for m, v in by_model.items()}
    try:
        for i, fut in enumerate(as_completed(futures), 1):
            status, model = fut.result()
            per_model[model][0] += 1
            if status == "ok":
                ok += 1
            else:
                err += 1
            if i % 25 == 0 or i == len(futures):
                prog = "  ".join(f"{m.split('/')[-1][:18]} {d}/{t}" for m, (d, t) in per_model.items())
                print(f"  {i}/{len(jobs)} ok={ok} err={err} | {prog}")
    except KeyboardInterrupt:
        print("\nInterrupted.")
        for ex in pools:
            ex.shutdown(wait=False, cancel_futures=True)
        os._exit(1)
    for ex in pools:
        ex.shutdown()
    print(f"Done. ok={ok} err={err}")


if __name__ == "__main__":
    main()
