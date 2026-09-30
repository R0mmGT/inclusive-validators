function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Guard against empty strings or unrealistically long input
  if (trimmed.length < 1 || trimmed.length > 150) {
    return false;
  }

  // A valid name must contain at least one Unicode letter
  if (!/\p{L}/u.test(trimmed)) {
    return false;
  }

  // Allow Unicode letters (\p{L}), combining marks/accents (\p{M}),
  // spaces (\s), hyphens/dashes, apostrophes, periods (for initials/titles),
  // and middle dots (used in scripts such as Japanese or Catalan)
  const validNamePattern = /^[\p{L}\p{M}\s'’\-‐‑–—\.·・]+$/u;

  return validNamePattern.test(trimmed);
}
