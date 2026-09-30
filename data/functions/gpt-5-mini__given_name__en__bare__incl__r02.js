function validate(name) {
  // Accept only strings
  if (typeof name !== 'string') return false;

  // Trim surrounding whitespace (including Unicode spaces)
  name = name.trim();
  if (name.length === 0) return false;

  // Reasonable length limit (in Unicode code points)
  const maxCodePoints = 100;
  if ([...name].length > maxCodePoints) return false;

  // Pattern explanation:
  // - ^ and $ anchor the whole string
  // - [\p{L}\p{M}]+ : one or more Unicode letters (L) or combining marks (M)
  // - (?: ... [\p{L}\p{M}]+)* : zero or more groups of:
  //     a single allowed separator followed by one or more letters/marks
  // - Allowed separators:
  //     \p{Pd}  -> any dash/punctuation dash (hyphens, en-dash, etc.)
  //     \p{Zs}  -> any space separator (regular spaces, non-breaking, etc.)
  //     ' \u2019 \u02BC \u02BB -> common apostrophe-like characters and ʻ (okina)
  //     \u00B7 -> middle dot used in some names
  //
  // This allows names like: "Mary", "Mary Ann", "Jean-Luc", "O'Connor", "李小龍", "A", "Hélène"
  const namePattern = /^[\p{L}\p{M}]+(?:[\p{Pd}\p{Zs}'\u2019\u02BC\u02BB\u00B7][\p{L}\p{M}]+)*$/u;

  return namePattern.test(name);
}
