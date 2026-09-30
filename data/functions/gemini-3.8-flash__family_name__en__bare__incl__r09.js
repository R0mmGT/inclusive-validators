function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Enforce reasonable length constraints
  if (trimmed.length === 0 || trimmed.length > 100) {
    return false;
  }

  // Must contain at least one Unicode letter
  if (!/\p{L}/u.test(trimmed)) {
    return false;
  }

  // Reject consecutive identical punctuation or multiple consecutive spaces
  if (/[\-\'’ʼ]{2,}|\s{2,}|\.{2,}/u.test(trimmed)) {
    return false;
  }

  // Allowed characters:
  // - Unicode letters (\p{L}) and combining marks (\p{M})
  // - Common name punctuation: spaces, hyphens, apostrophes, and periods
  // Allows valid cultural prefixes like Dutch "'t Hooft" and titles/abbreviations like "St. John"
  const namePattern = /^[\p{L}\p{M}'’ʼ](?:[\p{L}\p{M}\s'’ʼ\-\.]*[\p{L}\p{M}.])?$/u;

  return namePattern.test(trimmed);
}
