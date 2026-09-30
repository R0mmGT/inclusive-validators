function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Enforce reasonable length limits
  if (trimmed.length === 0 || trimmed.length > 100) {
    return false;
  }

  // Must contain at least one Unicode letter
  if (!/\p{L}/u.test(trimmed)) {
    return false;
  }

  // Allows:
  // - Unicode letters (\p{L}) from any script (Latin, Cyrillic, Arabic, Hanzi, etc.)
  // - Combining marks/accents (\p{M}) for diacritics (e.g., Indic, Arabic, accented Latin)
  // - Common naming punctuation: spaces, hyphens, periods, and apostrophes
  const validNamePattern = /^['’ʼ]?[\p{L}\p{M}]+(?:[\s'’ʼ.\-]+[\p{L}\p{M}]+)*['’ʼ.]?$/u;

  return validNamePattern.test(trimmed);
}
