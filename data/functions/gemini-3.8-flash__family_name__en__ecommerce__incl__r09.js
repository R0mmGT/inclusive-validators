function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Names generally range from 1 to 100 characters
  if (trimmed.length === 0 || trimmed.length > 100) {
    return false;
  }

  // Must contain at least one Unicode letter
  if (!/\p{L}/u.test(trimmed)) {
    return false;
  }

  // Allowed: Unicode letters, combining marks (accents/diacritics),
  // spaces, hyphens, periods, and apostrophes (standard and typographic)
  const validNamePattern = /^[\p{L}\p{M}\s'’\.\-]+$/u;

  return validNamePattern.test(trimmed);
}
