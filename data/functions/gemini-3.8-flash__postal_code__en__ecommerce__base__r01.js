function validate(postalCode) {
  if (typeof postalCode !== 'string') {
    return false;
  }

  const code = postalCode.trim();

  // US ZIP code (e.g., 12345 or 12345-6789)
  const usPostalCode = /^\d{5}(-\d{4})?$/;

  // Canadian postal code (e.g., A1A 1A1 or A1A1A1)
  const caPostalCode = /^[A-Za-z]\d[A-Za-z][ ]?\d[A-Za-z]\d$/;

  // UK postal code (e.g., SW1A 1AA, M1 1AE, etc.)
  const ukPostalCode = /^[A-Za-z]{1,2}\d[A-Za-z\d]?[ ]?\d[A-Za-z]{2}$/;

  return usPostalCode.test(code) || caPostalCode.test(code) || ukPostalCode.test(code);
}
