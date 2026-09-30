function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Ensure reasonable length (between 1 and 255 characters)
  if (trimmed.length === 0 || trimmed.length > 255) {
    return false;
  }

  // Must contain at least one Unicode letter (supports mononyms and non-Latin scripts)
  if (!/\p{L}/u.test(trimmed)) {
    return false;
  }

  // Allowed:
  // - Unicode letters (\p{L}) and combining marks (\p{M}) for all scripts (Latin, CJK, Arabic, Cyrillic, Devanagari, etc.)
  // - Punctuation used in names: spaces, hyphens (-), apostrophes (' ’ ‘), periods (.), and middle dots (·)
  // Names may start with a letter or an apostrophe (e.g., 't Hooft)
  const validPattern = /^[\p{L}\p{M}'’‘][\p{L}\p{M}'’‘.\-‐‑· \u00A0\u3000]*$/u;
  if (!validPattern.test(trimmed)) {
    return false;
  }

  // Disallow consecutive punctuation (e.g., "..", "--")
  if (/[\-‐‑.]{2,}/.test(trimmed)) {
    return false;
  }

  return true;
}
