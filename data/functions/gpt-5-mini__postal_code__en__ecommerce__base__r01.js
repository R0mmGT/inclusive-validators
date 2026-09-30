function validate(input) {
  if (typeof input !== 'string') return false;
  const s = input.trim();
  if (s.length === 0) return false;

  // Common postal code patterns (covers many countries)
  const patterns = [
    /^\d{5}(-\d{4})?$/,                 // US 12345 or 12345-6789
    /^[A-Za-z]\d[A-Za-z]\s?\d[A-Za-z]\d$/i, // Canada A1A 1A1
    /^(GIR 0AA|(?:(?:[A-PR-UWYZ][0-9]{1,2})|(?:[A-PR-UWYZ][A-HK-Y][0-9]{1,2})|(?:[A-PR-UWYZ][0-9][A-HJKPSTUW])|(?:[A-PR-UWYZ][A-HK-Y][0-9][ABEHMNPRVWXY]))\s?[0-9][ABD-HJLNP-UW-Z]{2})$/i, // UK
    /^\d{4}$/,                          // Australia (4 digits) and some others
    /^\d{5}$/,                          // France/Germany/Italy/Spain and many others (5 digits)
    /^\d{3}\s?[A-Za-z]{2}$/i,           // Some short formats like 123 AB
    /^\d{4}\s?[A-Za-z]{2}$/i,           // Netherlands 1234 AB
    /^[A-Za-z0-9]{2,4}\s?[A-Za-z0-9]{2,4}$/i // generic short alphanumeric groups (fallback)
  ];

  // Check against known patterns
  for (let re of patterns) {
    if (re.test(s)) return true;
  }

  // Generic fallback: allow letters, digits, spaces and hyphens, length 3-10, must include a digit
  if (s.length < 3 || s.length > 10) return false;
  if (!/^[A-Za-z0-9\s-]+$/.test(s)) return false;
  if (!/\d/.test(s)) return false;

  return true;
}
