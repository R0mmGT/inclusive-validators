function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Check reasonable length constraints (1 to 100 characters)
  if (trimmed.length < 1 || trimmed.length > 100) {
    return false;
  }

  // Must contain at least one Unicode letter
  if (!/\p{L}/u.test(trimmed)) {
    return false;
  }

  // Permissive international name validation:
  // - \p{L}: Any Unicode letter (covers Latin, Cyrillic, Han, Arabic, Devanagari, etc.)
  // - \p{M}: Unicode combining marks/accents (essential for many non-Latin scripts)
  // - Permitted punctuation: hyphens (-), apostrophes (' / ’ / ʻ / ʼ), dots (.), and spaces
  // - Ensures the name does not start or end with invalid separators (e.g., trailing hyphens)
  const namePattern = /^['’\p{L}\p{M}](?:[\p{L}\p{M}\s'\-’.\u02BB\u02BC]*[\p{L}\p{M}.'’])?$/u;

  return namePattern.test(trimmed);
}
