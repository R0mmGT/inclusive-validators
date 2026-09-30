function validate(postalCode) {
  if (typeof postalCode !== 'string') {
    return false;
  }

  const trimmed = postalCode.trim();

  // Validates common international postal code formats:
  // - US ZIP and ZIP+4 (e.g., 12345, 12345-6789)
  // - Canada (e.g., A1A 1A1, A1A-1A1, A1A1A1)
  // - United Kingdom (e.g., SW1A 1AA, M1 1AA, CR2 6XH)
  // - Netherlands (e.g., 1234 AB)
  // - Japan (e.g., 123-4567)
  // - Brazil (e.g., 12345-678)
  // - Poland / Portugal (e.g., 12-345, 1234-567)
  // - Standard 3 to 8 digit numeric codes (e.g., Germany, France, Australia, India)
  const patterns = [
    /^\d{5}(-\d{4})?$/,
    /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/,
    /^[A-Za-z]{1,2}\d[A-Za-z\d]?\s*\d[A-Za-z]{2}$/,
    /^\d{4}\s?[A-Za-z]{2}$/,
    /^\d{3}-\d{4}$/,
    /^\d{5}-\d{3}$/,
    /^\d{2}-\d{3}$/,
    /^\d{4}-\d{3}$/,
    /^\d{3}\s\d{2}$/,
    /^\d{3,8}$/
  ];

  return patterns.some((regex) => regex.test(trimmed));
}
