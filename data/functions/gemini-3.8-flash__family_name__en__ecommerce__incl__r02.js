function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Length check: allows single-character names while guarding against overly long strings
  if (trimmed.length < 1 || trimmed.length > 100) {
    return false;
  }

  // Must contain at least one Unicode letter (supports any alphabet, script, or ideogram)
  if (!/\p{L}/u.test(trimmed)) {
    return false;
  }

  // Allowed characters across cultures:
  // - \p{L}: Unicode letters (Latin, Cyrillic, CJK, Arabic, Devanagari, Hebrew, etc.)
  // - \p{M}: Unicode combining marks and diacritics
  // - Spaces, standard/curly apostrophes, ʻokina, hyphens, and periods
  const validPattern = /^[\p{L}\p{M}\s'’ʻʼ.\-]+$/u;

  return validPattern.test(trimmed);
}
