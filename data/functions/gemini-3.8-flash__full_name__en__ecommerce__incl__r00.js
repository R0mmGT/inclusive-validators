function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Check for reasonable length (accommodates single-character mononyms up to long compound names)
  if (trimmed.length < 1 || trimmed.length > 150) {
    return false;
  }

  // Must contain at least one Unicode letter
  if (!/\p{L}/u.test(trimmed)) {
    return false;
  }

  // Allowed characters:
  // - \p{L}: Unicode letters (covers Latin, Cyrillic, Arabic, Hebrew, CJK, Devanagari, etc.)
  // - \p{M}: Unicode combining marks/accents
  // - \s: Spaces
  // - Punctuation commonly found in names across cultures:
  //   ' ’ ʼ ʻ : Apostrophes, right single quotes, and modifier letters (e.g., O'Connor, Hawaiʻian ʻokina)
  //   .       : Period/full stop (e.g., initials or honorific abbreviations)
  //   \- – —  : Hyphen and dashes (e.g., hyphenated surnames)
  //   ·       : Middle dot (used in Catalan, Chinese/Japanese transliterations)
  const allowedCharsPattern = /^[\p{L}\p{M}\s'’ʼʻ.\-–—·]+$/u;

  return allowedCharsPattern.test(trimmed);
}
