function validate(postalCode) {
  if (typeof postalCode !== 'string') {
    return false;
  }

  const trimmed = postalCode.trim();

  // Validates common postal code formats worldwide:
  // - US ZIP code: 12345 or 12345-6789
  // - UK postcode: e.g., SW1A 1AA, M1 1AA, CR2 6XH
  // - Canada: e.g., K1A 0B1, A1A-1A1, A1A1A1
  // - Netherlands: e.g., 1012 JS
  // - Standard numeric / hyphenated codes (3–10 digits, e.g., Japan 100-0001, France 75008, India 110001)
  const postalCodeRegex = /^(?:[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}|[A-Z]\d[A-Z][ -]?\d[A-Z]\d|\d{4}\s*[A-Z]{2}|\d{5}(?:-\d{4})?|\d{2,5}[ -]\d{2,5}|\d{3,10})$/i;

  return postalCodeRegex.test(trimmed);
}
