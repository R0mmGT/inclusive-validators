function validate(postal) {
  if (typeof postal !== 'string') return false;
  const s = postal.trim();
  if (s.length === 0) return false;

  // Common postal-code patterns (covers many countries: US, Canada, UK, NL, AU, DE/FR/ES/IT etc.)
  const patterns = [
    // US ZIP: 12345 or 12345-6789
    /^\d{5}(?:-\d{4})?$/,
    // Canadian: A1A 1A1 or A1A1A1 (allow lowercase)
    /^[A-Za-z]\d[A-Za-z]\s?\d[A-Za-z]\d$/i,
    // UK (widely used regex for UK postcodes, case-insensitive)
    /^(GIR ?0AA|(?:[A-PR-UWYZ](?:[0-9]{1,2}|[A-HK-Y][0-9]|[A-HK-Y][0-9]?[0-9]))\s?[0-9][ABD-HJLNP-UW-Z]{2})$/i,
    // Netherlands: 1234 AB (4 digits + 2 letters)
    /^\d{4}\s?[A-Za-z]{2}$/,
    // Australia: 4 digits
    /^\d{4}$/,
    // Generic 5-digit codes used by many countries (DE/FR/IT/ES etc.)
    /^\d{5}$/
  ];

  return patterns.some(re => re.test(s));
}
