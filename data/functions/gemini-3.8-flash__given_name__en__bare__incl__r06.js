function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  // Check length constraints (most given names worldwide are between 1 and 100 characters)
  // and disallow leading or trailing whitespace.
  if (name.length === 0 || name.length > 100 || name.trim() !== name) {
    return false;
  }

  // Regex breakdown:
  // ^\p{L}             - Must start with a Unicode letter (supports Latin, Cyrillic, Arabic, CJK, Devanagari, etc.)
  // [\p{L}\p{M}]*      - Followed by any number of Unicode letters or combining marks (diacritics, accents, vowel signs)
  // (?:['’ -]\p{L}[\p{L}\p{M}]*)*$ - Allows single apostrophes, hyphens, or spaces between letters (for compound names)
  // /u flag enables full Unicode property support.
  const nameRegex = /^\p{L}[\p{L}\p{M}]*(?:['’ -]\p{L}[\p{L}\p{M}]*)*$/u;

  return nameRegex.test(name);
}
