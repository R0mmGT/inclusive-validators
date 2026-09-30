function validate(name) {
  // Must be a string
  if (typeof name !== 'string') return false;

  // Trim whitespace at ends
  name = name.trim();

  // Reject empty or excessively long names (practical limit; adjust if needed)
  if (name.length === 0 || name.length > 100) return false;

  /*
    Rules implemented:
    - Must start with a Unicode letter (\p{L}).
    - Letters may be followed by combining marks (\p{M}) to allow diacritics.
    - Allow internal separators commonly used in given names across cultures:
      space, hyphen-minus '-', right single quotation mark ’ (U+2019),
      ASCII apostrophe ' and middle dot · (U+00B7).
    - Separators cannot appear at the start or end, nor appear consecutively.
    - No digits or other punctuation/symbols are allowed.
    - Uses Unicode property escapes, so the 'u' flag is required.
  */
  const namePattern = new RegExp(
    // start anchor
    '^' +
      // first character must be a letter
      '\\p{L}' +
      // follow with any number of letters or combining marks
      '[\\p{L}\\p{M}]*' +
      // allow groups of (single separator + letter + letters/marks...)
      '(?:[ \\-\'\u2019\u00B7]\\p{L}[\\p{L}\\p{M}]*)*' +
    '$'
  , 'u');

  // Reject consecutive separators (e.g. "--", "  ", "''", " -", etc.)
  const consecutiveSeparators = /[ \-'\u2019\u00B7]{2,}/u;

  if (consecutiveSeparators.test(name)) return false;

  return namePattern.test(name);
}
