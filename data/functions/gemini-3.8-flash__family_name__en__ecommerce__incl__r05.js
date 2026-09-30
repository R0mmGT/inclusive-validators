function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Ensure reasonable length (family names can be a single character e.g. "O" or "李")
  if (trimmed.length < 1 || trimmed.length > 100) {
    return false;
  }

  // Must contain at least one Unicode letter
  if (!/\p{L}/u.test(trimmed)) {
    return false;
  }

  // Allow Unicode letters (\p{L}), combining marks/accents (\p{M}), 
  // spaces, hyphens/dashes, apostrophes, and periods (e.g., "St. John").
  const namePattern = /^[\p{L}\p{M}\s'\u2019\-.]+$/u;

  return namePattern.test(trimmed);
}
