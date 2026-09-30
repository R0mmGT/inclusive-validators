function validate(postalCode) {
  if (typeof postalCode !== 'string') {
    return false;
  }

  const trimmed = postalCode.trim();

  // Validates common postal code formats worldwide:
  // - US ZIP and ZIP+4 (e.g., 12345, 12345-6789)
  // - UK Postcode (e.g., SW1A 1AA, M1 1AA)
  // - Canadian Postal Code (e.g., K1A 0B1)
  // - Netherlands (e.g., 1234 AB)
  // - Standard numeric postal codes between 3 and 10 digits (e.g., France, Germany, Australia)
  // - Hyphenated or space-separated numeric postal codes (e.g., Japan 123-4567, Poland 00-950)
  const patterns = [
    /^\d{5}(?:[-\s]\d{4})?$/,
    /^[A-Z]{1,2}\d[A-Z\d]?[\s-]?\d[A-Z]{2}$/i,
    /^[A-CEGHJ-NPR-TV-Z]\d[A-CEGHJ-NPR-TV-Z][\s-]?\d[A-CEGHJ-NPR-TV-Z]\d$/i,
    /^\d{4}[\s-]?[A-Z]{2}$/i,
    /^\d{3,10}$/,
    /^\d{2,5}[-\s]\d{2,5}$/
  ];

  return patterns.some((pattern) => pattern.test(trimmed));
}
