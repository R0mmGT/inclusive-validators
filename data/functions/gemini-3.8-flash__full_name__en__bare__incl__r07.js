function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Check reasonable length constraints for full names
  if (trimmed.length < 1 || trimmed.length > 200) {
    return false;
  }

  // Must contain at least one Unicode letter
  if (!/\p{L}/u.test(trimmed)) {
    return false;
  }

  // Allowed characters:
  // \p{L}: any Unicode letter (Latin, Cyrillic, Arabic, Hanzi, Kanji, Devanagari, etc.)
  // \p{M}: Unicode combining marks/diacritics
  // \s: spaces (standard, non-breaking, etc.)
  // '\u2019\u02BB: apostrophes and modifier letter turned comma (e.g., Hawaiian ʻokina)
  // \-\u2010-\u2015: standard and Unicode hyphens/dashes
  // \.: periods for abbreviated initials (e.g., "J. K. Rowling")
  const validCharsPattern = /^[\p{L}\p{M}\s'\u2019\u02BB\-\u2010-\u2015\.]+$/u;
  if (!validCharsPattern.test(trimmed)) {
    return false;
  }

  // Must not begin with a period or hyphen, and must not end with a hyphen
  if (/^[.\-\u2010-\u2015]|[\-\u2010-\u2015]$/u.test(trimmed)) {
    return false;
  }

  // Must not contain consecutive punctuation marks (e.g., "..", "--", "'-")
  if (/['\u2019\u02BB\-\u2010-\u2015.]{2,}/u.test(trimmed)) {
    return false;
  }

  return true;
}
