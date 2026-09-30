function validate(postalCode) {
  if (typeof postalCode !== 'string') return false;
  const s = postalCode.trim();
  if (!s) return false;

  // Common postal code patterns: US (ZIP), Canada, UK
  const patterns = [
    // US ZIP: 12345 or 12345-6789
    /^\d{5}(?:-\d{4})?$/,
    // Canada: A1A 1A1 (space optional), letters exclude D F I O Q U
    /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z]\s?\d[ABCEGHJ-NPRSTV-Z]\d$/i,
    // UK: comprehensive pattern including special GIR 0AA (space optional)
    /^(GIR 0AA|[A-PR-UWYZ](?:\d{1,2}|[A-HK-Y]\d{1,2}|\d[A-HJKSTUW]|[A-HK-Y]\d[ABEHMNPRVWXY])\s?\d[ABD-HJLNP-UW-Z]{2})$/i
  ];

  return patterns.some(regex => regex.test(s));
}
