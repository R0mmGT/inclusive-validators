function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  // Normalize Unicode representations (e.g., combined vs. decomposed accents)
  const normalized = name.normalize('NFC');

  // Check length constraints (names must be at least 1 character and reasonable max length)
  // Rejects leading/trailing whitespace
  if (normalized.trim() !== normalized || normalized.length === 0 || normalized.length > 100) {
    return false;
  }

  // Must contain at least one Unicode letter
  if (!/\p{L}/u.test(normalized)) {
    return false;
  }

  // Cannot start or end with a hyphen
  if (normalized.startsWith('-') || normalized.endsWith('-')) {
    return false;
  }

  // Cannot contain consecutive spaces, hyphens, or apostrophes
  if (/\s{2,}|--|['’]{2,}/u.test(normalized)) {
    return false;
  }

  // Allowed characters:
  // - \p{L}: Any Unicode letter (covers Latin, Cyrillic, CJK, Arabic, Devanagari, Hebrew, etc.)
  // - \p{M}: Any Unicode mark (combining diacritics, vowel signs, accents)
  // - Common name punctuation: hyphens (-), typographic/ASCII apostrophes (' and ’), and single spaces
  const validPattern = /^[\p{L}\p{M}'’ -]+$/u;

  return validPattern.test(normalized);
}
