function validate(postalCode) {
  if (typeof postalCode !== 'string') return false;
  const code = postalCode.trim();
  if (!code) return false;

  // Common postal code patterns for international online stores:
  const patterns = [
    // US ZIP: 12345 or 12345-6789
    /^\d{5}(-\d{4})?$/,
    // Canada: A1A 1A1 (space optional)
    /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z]\s?\d[ABCEGHJ-NPRSTV-Z]\d$/i,
    // UK (covers standard UK postcode patterns, includes GIR 0AA)
    /^(GIR ?0AA|([A-PR-UWYZ][A-HK-Y]?\d{1,2}[A-Z]?\s?\d[ABD-HJLNP-UW-Z]{2}))$/i,
    // Netherlands: 1234 AB (space optional)
    /^\d{4}\s?[A-Z]{2}$/i,
    // General 4-digit postal codes (Australia, New Zealand, some EU countries)
    /^\d{4}$/,
    // Generic 3-10 alphanumeric (allows many other country formats, with optional space/hyphen)
    /^[A-Z0-9][A-Z0-9\- ]{1,8}[A-Z0-9]$/i
  ];

  return patterns.some((re) => re.test(code));
}
