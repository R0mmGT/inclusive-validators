function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Reasonable length boundary for a given name
  if (trimmed.length < 1 || trimmed.length > 100) {
    return false;
  }

  // Must contain at least one Unicode letter
  if (!/\p{L}/u.test(trimmed)) {
    return false;
  }

  // Allows Unicode letters, diacritics/marks, whitespace, hyphens, periods, and apostrophes
  const namePattern = /^[\p{L}\p{M}\s'\u2019\u02BC\u02BB\-.]+$/u;

  return namePattern.test(trimmed);
}
