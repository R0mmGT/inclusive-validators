function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Allow names between 1 and 150 characters
  if (trimmed.length === 0 || trimmed.length > 150) {
    return false;
  }

  // Must contain at least one Unicode letter.
  // Supports scripts worldwide (Latin, Cyrillic, CJK, Arabic, Devanagari, etc.),
  // combining marks/accents (\p{M}), spaces, hyphens, apostrophes, periods, commas, and middle dots.
  const nameRegex = /^(?=.*\p{L})[\p{L}\p{M}\s'’.\-–—·・,]+$/u;

  return nameRegex.test(trimmed);
}
