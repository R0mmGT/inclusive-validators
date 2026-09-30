function validate(postal) {
  if (typeof postal !== 'string') return false;
  const s = postal.trim().toUpperCase();
  if (!s) return false;

  // A small collection of widely-used postal code patterns.
  const patterns = [
    // US ZIP: 12345 or 12345-6789
    /^\d{5}(?:-\d{4})?$/,
    // Canadian: A1A 1A1 (space optional)
    /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z]\s?\d[ABCEGHJ-NPRSTV-Z]\d$/,
    // UK (covers standard formats, including GIR 0AA)
    /^(GIR 0AA|(?:[A-PR-UWYZ][0-9][0-9]?|[A-PR-UWYZ][A-HK-Y][0-9][0-9]?|[A-PR-UWYZ][0-9][A-HJKPSTUW]|[A-PR-UWYZ][A-HK-Y][0-9][ABEHMNPRVWXY])\s?[0-9][ABD-HJLNP-UW-Z]{2})$/,
    // Germany, France, Spain, Italy: 5 digits
    /^\d{5}$/,
    // Australia, some others: 4 digits
    /^\d{4}$/,
    // Netherlands: 1234 AB (space optional)
    /^\d{4}\s?[A-Z]{2}$/
  ];

  return patterns.some(rx => rx.test(s));
}
