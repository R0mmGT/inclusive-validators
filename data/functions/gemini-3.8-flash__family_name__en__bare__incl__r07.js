function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  // Reject strings with leading/trailing whitespace
  if (name !== name.trim()) {
    return false;
  }

  // Length constraints: valid surnames can be 1 character (e.g., "O", "Li") up to 100 characters
  if (name.length < 1 || name.length > 100) {
    return false;
  }

  // Must contain at least one Unicode letter or modifier letter
  if (!/[\p{L}\p{Lm}]/u.test(name)) {
    return false;
  }

  // Allowed characters:
  // \p{L}  - Letters in any script
  // \p{M}  - Combining marks (diacritics, accents, Indic/Arabic vowel markers)
  // \p{Lm} - Letter modifiers (e.g., Hawaiian ʻokina)
  // \p{Pd} - Hyphens and dashes
  // '’ʼ    - Standard and typographic apostrophes
  // .      - Period (e.g., "St. John")
  // ·      - Middle dot (e.g., Catalan "l·l", transliterations)
  // \s     - Space (for compound surnames like "van der Bellen" or "da Silva")
  const allowedCharacters = /^[\p{L}\p{M}\p{Lm}\p{Pd}'’ʼ.·\s]+$/u;
  if (!allowedCharacters.test(name)) {
    return false;
  }

  // Disallow punctuation/whitespace at the very beginning or end
  if (/^[\p{Pd}.\s]|[\p{Pd}.\s]$/u.test(name)) {
    return false;
  }

  // Disallow consecutive whitespace characters
  if (/\s{2,}/.test(name)) {
    return false;
  }

  return true;
}
