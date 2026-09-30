function validate(input) {
  // Must be a string
  if (typeof input !== 'string') return false;

  // Trim surrounding whitespace (users often paste with spaces)
  const s = input.trim();

  // Reject empty or excessively long names
  if (s.length === 0 || s.length > 100) return false;

  // Normalize to a canonical Unicode form
  const name = s.normalize('NFC');

  // Allowed separators:
  //  - space
  //  - hyphen (-)
  //  - ASCII apostrophe (')
  //  - common Unicode apostrophe variants (U+2019, U+02BC, U+02BB)
  //  - middle dot (U+00B7) often used in some languages (e.g. Catalan)
  //
  // Rules enforced by the regex:
  //  - Only Unicode letters (\p{L}) and combining marks (\p{M}) are allowed in name pieces
  //  - Pieces may be separated by a single allowed separator (no leading/trailing separators)
  //  - No consecutive separators
  //  - Overall length already checked above
  //
  // The `u` flag enables Unicode property escapes (\p{L}, \p{M}).
  const re = /^(?=.{1,100}$)(?!.*[ \-'\u2019\u02BC\u02BB\u00B7]{2,})[\p{L}\p{M}]+(?:[ \-'\u2019\u02BC\u02BB\u00B7][\p{L}\p{M}]+)*$/u;

  return re.test(name);
}
