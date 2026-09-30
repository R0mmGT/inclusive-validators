function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  // Length sanity check (covers single-letter surnames up to very long noble/compound names)
  if (name.length === 0 || name.length > 100) {
    return false;
  }

  // Must not have leading/trailing whitespace or hyphens
  if (/^[\s\-]|[\s\-]$/u.test(name)) {
    return false;
  }

  // Must not contain consecutive separators/punctuation
  if (/[\s\-.]{2,}|['’ʼ]{2,}/u.test(name)) {
    return false;
  }

  // Must contain at least one Unicode letter
  if (!/\p{L}/u.test(name)) {
    return false;
  }

  // Allowed characters:
  // - \p{L}: Any Unicode letter (covers Latin, Cyrillic, CJK, Arabic, Devanagari, Hebrew, etc.)
  // - \p{M}: Unicode combining marks/diacritics (vowels, tone marks, accents)
  // - Separators and punctuation found in family names globally: space, hyphen, apostrophe variants, period
  const validNamePattern = /^[\p{L}\p{M}\s\-'’ʼ.]+$/u;

  return validNamePattern.test(name);
}
