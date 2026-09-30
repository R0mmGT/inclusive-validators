function validate(postalCode) {
  if (typeof postalCode !== 'string') {
    return false;
  }

  const trimmed = postalCode.trim();

  // Validate format: 2 to 10 alphanumeric characters, allowing single spaces or hyphens between blocks
  // Matches worldwide standards (e.g., US: "90210", "90210-1234"; UK: "SW1A 1AA"; CA: "K1A 0B1"; JP: "100-0001")
  if (!/^[a-zA-Z0-9]+(?:[ -][a-zA-Z0-9]+)*$/.test(trimmed)) {
    return false;
  }

  // Count raw alphanumeric characters (Universal Postal Union standards range from 2 to 10 characters)
  const alphanumericCount = trimmed.replace(/[\s-]/g, '').length;
  return alphanumericCount >= 2 && alphanumericCount <= 10;
}
