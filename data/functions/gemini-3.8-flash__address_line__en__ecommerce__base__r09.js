function validate(address) {
  if (typeof address !== 'string') {
    return false;
  }

  const trimmed = address.trim();

  // Reasonable length bounds for a street address line
  if (trimmed.length < 4 || trimmed.length > 100) {
    return false;
  }

  // Must contain at least one letter (street/building/box name)
  if (!/\p{L}/u.test(trimmed)) {
    return false;
  }

  // Must contain at least one number (house, building, or PO Box number)
  if (!/\d/.test(trimmed)) {
    return false;
  }

  // Must only contain letters, digits, spaces, and standard address punctuation
  const validCharsRegex = /^[\p{L}\d\s.,'#\/-]+$/u;
  return validCharsRegex.test(trimmed);
}
