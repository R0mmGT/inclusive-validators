function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Guard against empty strings and excessively long input
  if (trimmed.length === 0 || trimmed.length > 255) {
    return false;
  }

  // A valid full name must contain at least one Unicode letter
  if (!/\p{L}/u.test(trimmed)) {
    return false;
  }

  // Allow Unicode letters (\p{L}), combining diacritical marks (\p{M}),
  // spaces, hyphens/dashes, apostrophes/quotes, periods (e.g., initials),
  // and middle dots (used in various cultures, e.g., Catalan or Asian transliterations).
  const namePattern = /^[\p{L}\p{M}\s'’ʼʻ.\-\u2010-\u2015·・]+$/u;

  return namePattern.test(trimmed);
}
