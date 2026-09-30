"""Extract the JavaScript function from each raw response.

Output:
    data/functions/<key>.js   one file per extracted function
    data/extracted.jsonl      extraction status for every generation

Extraction rule: the first fenced block tagged javascript/js/jsx/mjs; otherwise
the first fenced block of any language; otherwise the whole response if it
mentions `validate`.
"""
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
RESP = ROOT / "data" / "responses.jsonl"
FUNC_DIR = ROOT / "data" / "functions"
INDEX = ROOT / "data" / "extracted.jsonl"

FENCE = re.compile(r"```([A-Za-z0-9_+-]*)[^\n]*\n(.*?)```", re.S)
JS_TAGS = {"javascript", "js", "jsx", "mjs", "node"}


def extract_code(text: str):
    blocks = [(m.group(1).lower(), m.group(2)) for m in FENCE.finditer(text or "")]
    for tag, code in blocks:
        if tag in JS_TAGS:
            return code, f"fence:{tag}"
    if blocks:
        tag, code = blocks[0]
        return code, f"fence:{tag or 'untagged'}"
    if text and "validate" in text:
        return text, "raw"
    return None, "none"


def main():
    latest, failed = {}, {}
    with RESP.open(encoding="utf-8") as f:
        for line in f:
            rec = json.loads(line)
            if rec["status"] == "ok":
                latest[rec["key"]] = rec
            else:
                failed[rec["key"]] = rec
    for key, rec in failed.items():
        if key not in latest:
            latest[key] = rec

    FUNC_DIR.mkdir(parents=True, exist_ok=True)
    counts = {}
    with INDEX.open("w", encoding="utf-8") as out:
        for key, rec in sorted(latest.items()):
            if rec["status"] != "ok":
                how = "none"
                err = rec.get("error") or ""
                status = ("api_content_filter" if "content_filter" in err
                          else "api_rate_limit" if "429" in err else "api_error")
            else:
                code, how = extract_code(rec["response"])
                if code is None:
                    status = "no_code"
                elif "validate" not in code:
                    status = "no_validate_symbol"
                else:
                    status = "ok"
                    (FUNC_DIR / f"{key}.js").write_text(code, encoding="utf-8")
            counts[status] = counts.get(status, 0) + 1
            meta = {k: rec[k] for k in ("key", "model", "field", "language", "context", "inclusive", "rep")}
            out.write(json.dumps({**meta, "extraction": how, "status": status,
                                  "file": f"data/functions/{key}.js" if status == "ok" else None,
                                  "finish_reason": rec.get("finish_reason")}, ensure_ascii=False) + "\n")
    print("Extraction:", counts)


if __name__ == "__main__":
    main()
