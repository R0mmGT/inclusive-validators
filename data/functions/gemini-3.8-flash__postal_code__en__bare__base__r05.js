function validate(postalCode) {
  if (typeof postalCode !== 'string') {
    return false;
  }
  // Validates standard 5-digit ZIP codes and ZIP+4 formats (e.g., "12345" or "12345-6789")
  return /^\d{5}(-\d{4})?$/.test(postalCode.trim());
}
