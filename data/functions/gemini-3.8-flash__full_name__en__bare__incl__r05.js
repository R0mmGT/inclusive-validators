function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Guard against empty strings or excessively long inputs
  if (trimmed.length === 0 || trimmed.length > 255) {
    return false;
  }

  // A valid name must contain at least one Unicode letter (supports any script: Latin, Cyrillic, Han, Arabic, Devanagari, etc.)
  if (!/\p{L}/u.test(trimmed)) {
    return false;
  }

  // Must only contain letters, combining marks (accents, tone marks), spaces, hyphens,
  // apostrophes, periods (e.g., initials or titles), and middle dots (used in CJK transliterations)
  const allowedChars = /^[\p{L}\p{M}\s'\u2019\u02BB\u02BC\.\-\u2010-\u2015\u00B7\u30FB]+$/u;
  if (!allowedChars.test(trimmed)) {
    return false;
  }

  // Cannot start with a hyphen, dot, or middle dot (apostrophe allowed at start, e.g., 'Okina)
  if (!/^[\p{L}\p{M}'\u2019\u02BB\u02BC]/u.test(trimmed)) {
    return false;
  }

  // Cannot end with a hyphen or middle dot (must end with a letter, mark, apostrophe, or period)
  if (!/[\p{L}\p{M}'\u2019\u02BB\u02BC\.]$/u.test(trimmed)) {
    return false;
  }

  // Disallow unnatural consecutive repetitions of punctuation and whitespace
  if (/\s{2,}|\.{2,}|[-–—]{2,}|['’ʻʼ]{2,}/u.test(trimmed)) {
    return false;
  }

  return true;
}
