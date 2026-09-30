function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Check reasonable length constraints and reject multi-line input
  if (trimmed.length === 0 || trimmed.length > 150 || /[\r\n]/.test(trimmed)) {
    return false;
  }

  // Must contain at least one Unicode letter
  if (!/\p{L}/u.test(trimmed)) {
    return false;
  }

  // Allow:
  // - Unicode letters (\p{L}) and combining marks/diacritics (\p{M}) for all scripts
  // - Unicode space separators (\p{Zs})
  // - Common name punctuation: hyphens (-, ‐, ‑), apostrophes (', ’, ʼ, ʻ),
  //   periods (.), and middle dots used in Catalan/CJK transliteration (·, ・)
  const namePattern = /^[\p{L}\p{M}\p{Zs}'’ʼʻ\-\.·・]+$/u;

  return namePattern.test(trimmed);
}
