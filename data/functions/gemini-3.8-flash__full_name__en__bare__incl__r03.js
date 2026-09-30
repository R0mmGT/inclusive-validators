function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Reasonable length boundary: allows 1-character mononyms up to long compound names
  if (trimmed.length < 1 || trimmed.length > 200) {
    return false;
  }

  // Must contain at least one letter in any writing system
  if (!/\p{L}/u.test(trimmed)) {
    return false;
  }

  // Allow only Unicode letters (\p{L}), combining marks/diacritics (\p{M}), 
  // whitespace, and standard name punctuation (hyphens, apostrophes/okina, periods for initials)
  const validNamePattern = /^[\p{L}\p{M}\s'’ʻ.\-]+$/u;

  return validNamePattern.test(trimmed);
}
