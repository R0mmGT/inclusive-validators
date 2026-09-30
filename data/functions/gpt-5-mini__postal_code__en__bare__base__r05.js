function validate(postal) {
  if (typeof postal !== 'string') return false;
  const s = postal.trim();
  const patterns = [
    // United States: 12345 or 12345-6789
    /^\d{5}(?:-\d{4})?$/,
    // Canada: A1A 1A1 (letters exclude D F I O Q U)
    /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z]\s?\d[ABCEGHJ-NPRSTV-Z]\d$/i,
    // United Kingdom (covers standard formats, incl. GIR 0AA)
    /^(?:GIR\s?0AA|(?:[A-PR-UWYZ](?:\d{1,2}|[A-HK-Y]\d{1,2}|\d[A-HJKPSTUW]|[A-HK-Y]\d[ABEHMNPRV-Y]))\s?\d[ABD-HJLNP-UW-Z]{2})$/i,
    // Netherlands: 1234 AB
    /^\d{4}\s?[A-Z]{2}$/i,
    // Australia: 4 digits
    /^\d{4}$/,
    // India: 6 digits
    /^\d{6}$/,
    // Generic 5-digit postal codes used by many countries (e.g., DE, FR, ES, IT)
    /^\d{5}$/
  ];
  return patterns.some(re => re.test(s));
}
