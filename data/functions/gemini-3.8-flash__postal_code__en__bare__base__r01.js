function validate(postalCode) {
  if (typeof postalCode !== 'string') {
    return false;
  }
  // Validates standard 5-digit postal codes and 9-digit ZIP+4 formats (e.g., "12345" or "12345-6789")
  const postalCodeRegex = /^\d{5}(-\d{4})?$/;
  return postalCodeRegex.test(postalCode.trim());
}
