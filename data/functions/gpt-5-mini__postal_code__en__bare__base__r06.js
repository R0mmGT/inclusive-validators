function validate(postal) {
  if (typeof postal !== 'string') return false;
  const s = postal.trim();
  if (!s) return false;

  const patterns = [
    // United States: 5 digits or ZIP+4
    /^\d{5}(-\d{4})?$/,
    // Canada: A1A 1A1 (space optional)
    /^[A-Z]\d[A-Z][ -]?\d[A-Z]\d$/i,
    // United Kingdom (simplified common pattern, case-insensitive)
    /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i,
    // Netherlands: 1234 AB (space optional)
    /^\d{4}\s?[A-Z]{2}$/i,
    // Germany/France/Spain/Italy etc.: 5 digits
    /^\d{5}$/,
    // Australia / New Zealand: 4 digits
    /^\d{4}$/,
    // India: 6 digits, not starting with 0
    /^[1-9]\d{5}$/
  ];

  return patterns.some((re) => re.test(s));
}
