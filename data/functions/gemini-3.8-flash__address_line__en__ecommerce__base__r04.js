function validate(address) {
  if (typeof address !== 'string') {
    return false;
  }

  const trimmed = address.trim();

  // Validate standard length for a street address line
  if (trimmed.length < 3 || trimmed.length > 100) {
    return false;
  }

  // Must contain at least one letter (street name, building name, etc.)
  if (!/\p{L}/u.test(trimmed)) {
    return false;
  }

  // Allow letters, numbers, spaces, and common street address punctuation
  const validCharsRegex = /^[\p{L}\p{N}\s.,'#/\\&-]+$/u;
  if (!validCharsRegex.test(trimmed)) {
    return false;
  }

  return true;
}
