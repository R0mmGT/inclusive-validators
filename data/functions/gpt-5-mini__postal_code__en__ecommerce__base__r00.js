function validate(postal) {
  if (typeof postal !== 'string') return false;
  const s = postal.trim();
  if (!s) return false;

  const patterns = [
    // United States: 5 digits or ZIP+4
    /^\d{5}(-\d{4})?$/,
    // Canada: A1A 1A1 (space or hyphen optional)
    /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/,
    // United Kingdom (simplified common pattern)
    /^[A-Za-z]{1,2}\d[A-Za-z\d]?\s?\d[A-Za-z]{2}$/i,
    // 5-digit postal codes (France, Germany, Spain, Italy, Belgium, etc.)
    /^\d{5}$/,
    // 4-digit postal codes (Australia, New Zealand, Switzerland, etc.)
    /^\d{4}$/,
    // Japan: 123-4567
    /^\d{3}-\d{4}$/,
    // Netherlands: 1234 AB (space optional)
    /^\d{4}\s?[A-Za-z]{2}$/i,
    // Fallback: short alphanumeric postal codes with spaces/hyphens (3-10 chars)
    /^[A-Za-z0-9][A-Za-z0-9\s-]{1,8}[A-Za-z0-9]$/
  ];

  return patterns.some((re) => re.test(s));
}
