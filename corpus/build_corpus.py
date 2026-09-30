"""Build corpus/corpus.json from curated.yaml plus generated phone numbers.

Phone numbers are libphonenumber example numbers, in E.164 and INTERNATIONAL format.

Usage: python corpus/build_corpus.py
"""
import json
import unicodedata
from pathlib import Path

import phonenumbers
import yaml
from phonenumbers import PhoneNumberFormat as Fmt
from phonenumbers import PhoneNumberType as PType

HERE = Path(__file__).resolve().parent

# Control: US number in national format.
PHONE_CONTROL_REGION = "US"
PHONE_REGIONS = {
    "north_america": ["US", "CA"],
    "latin_america": ["EC", "CO", "PE", "MX", "AR", "BR", "CL"],
    "europe": ["GB", "ES", "DE", "FR", "IT", "RU"],
    "asia": ["IN", "CN", "JP", "KR", "ID", "PH"],
    "africa": ["NG", "ZA", "EG", "KE"],
    "middle_east": ["SA", "AE"],
    "oceania": ["AU", "NZ"],
}
NAME_FIELDS = ["full_name", "given_name", "family_name"]


def nfc(s):
    return unicodedata.normalize("NFC", s)


def main():
    cur = yaml.safe_load((HERE / "curated.yaml").read_text(encoding="utf-8"))
    sources = cur["sources"]
    items = []

    def add(field, value, expected, category, source, note=None, verify=False, extra=None):
        items.append({"field": field, "value": nfc(value), "expected": expected,
                      "category": category, "source": source, "source_ref": sources.get(source, source),
                      "note": note, "verify": verify, **(extra or {})})

    for field, cats in cur["valid"].items():
        for cat, spec in cats.items():
            for v in spec["values"]:
                add(field, v, "valid", cat, spec["source"], spec.get("note"), spec.get("verify", False))

    for group, regions in PHONE_REGIONS.items():
        for region in regions:
            num = phonenumbers.example_number_for_type(region, PType.MOBILE) or phonenumbers.example_number(region)
            assert num is not None and phonenumbers.is_valid_number(num), region
            for fmt_name, fmt in (("e164", Fmt.E164), ("international", Fmt.INTERNATIONAL)):
                add("phone_number", phonenumbers.format_number(num, fmt), "valid", group,
                    "LIBPHONENUMBER", extra={"region": region, "format": fmt_name})
    num = phonenumbers.example_number_for_type(PHONE_CONTROL_REGION, PType.MOBILE)
    national = phonenumbers.format_number(num, Fmt.NATIONAL)
    for v in (national, national.replace("(", "").replace(")", "").replace(" ", "-")):
        add("phone_number", v, "valid", "control", "LIBPHONENUMBER",
            extra={"region": PHONE_CONTROL_REGION, "format": "national"})
    sources["LIBPHONENUMBER"] = "Google libphonenumber example numbers, Python port 'phonenumbers' v" + phonenumbers.__version__
    for it in items:
        if it["source"] == "LIBPHONENUMBER":
            it["source_ref"] = sources["LIBPHONENUMBER"]

    inv = cur["invalid"]
    for field in NAME_FIELDS:
        for v in inv["names"]["values"]:
            add(field, v, "invalid", "invalid", inv["names"]["source"])
    for field in ("phone_number", "postal_code", "address_line"):
        for v in inv[field]["values"]:
            add(field, v, "invalid", "invalid", inv[field]["source"])

    seen = set()
    for i, it in enumerate(items):
        k = (it["field"], it["value"])
        assert k not in seen, f"duplicate corpus item: {k}"
        seen.add(k)
        it["id"] = f"{it['field']}-{i:04d}"

    out = HERE / "corpus.json"
    out.write_text(json.dumps({"sources": sources, "items": items}, ensure_ascii=False, indent=1), encoding="utf-8")

    from collections import Counter
    c = Counter((it["field"], it["expected"]) for it in items)
    print(f"{len(items)} items written to {out}")
    for (f, e), n in sorted(c.items()):
        print(f"  {f:14s} {e:8s} {n}")


if __name__ == "__main__":
    main()
