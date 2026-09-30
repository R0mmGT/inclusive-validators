function validate(postalCode) {
  if (typeof postalCode !== 'string') {
    return false;
  }

  const trimmed = postalCode.trim();

  // Validates common postal code formats internationally:
  // - US ZIP codes (e.g., 12345, 12345-6789)
  // - Canadian postal codes (e.g., A1A 1A1, A1A-1A1, A1A1A1)
  // - UK postcodes (e.g., SW1A 1AA, M1 1AA, CR2 6XH)
  // - Netherlands postal codes (e.g., 1234 AB)
  // - Standard numeric codes (3 to 10 digits, e.g., 75008, 100-0001)
  const postalCodeRegex = /^(?:\d{5}(?:-\d{4})?|[A-Z]\d[A-Z][ -]?\d[A-Z]\d|[A-Z]{1,2}\d[A-Z\d]?[ -]?\d[A-Z]{2}|\d{4}[ -]?[A-Z]{2}|\d{3,10}|\d{3}-\d{4})$/i;

  return postalCodeRegex.test(trimmed);
}
