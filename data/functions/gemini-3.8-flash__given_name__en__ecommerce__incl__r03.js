function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Ensure length is within a reasonable range (1 to 100 characters)
  if (trimmed.length === 0 || trimmed.length > 100) {
    return false;
  }

  // Regex to support international given names across all Unicode scripts:
  // - \p{L}: any Unicode letter (Latin, Cyrillic, Arabic, Han, Devanagari, etc.)
  // - \p{M}: combining marks/accents (essential for scripts like Hindi, Thai, Arabic, etc.)
  // - Permitted internal separators: spaces, hyphens, periods, middle dots, and apostrophes
  // - Allows optional leading/trailing apostrophes or trailing periods (common in initials/transliterations)
  const nameRegex = /^['’ʻ]?[\p{L}\p{M}]+(?:[\s'’.\-·・]+[\p{L}\p{M}]+)*['’.]?$/u;

  return nameRegex.test(trimmed);
}
