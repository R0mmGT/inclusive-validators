// Validates a person's full name in a permissive, international way.
// - Accepts letters from any script (using Unicode property escapes).
// - Allows common name punctuation: hyphen, apostrophe, middle dot, dots (for initials), en/em dashes.
// - Prevents digits, most symbols, leading/trailing punctuation or spaces, consecutive punctuation, and accidental double spaces.
// - Allows single-word names (some cultures use one name).
function validate(name) {
  if (typeof name !== 'string') return false;

  // Basic trim and reasonable length limits (in Unicode code points).
  name = name.trim();
  const len = [...name].length;
  if (len === 0 || len > 200) return false;

  // Must contain at least one letter from any script.
  if (!/\p{L}/u.test(name)) return false;

  // Allowed characters:
  // \p{L} = any letter, \p{M} = combining marks
  // Space (U+0020), apostrophes (U+0027 and U+2019), hyphen-minus, middle dot (U+00B7),
  // period (for initials), en-dash (U+2013), em-dash (U+2014)
  const allowed = /^[\p{L}\p{M}\u0020'’\-\u00B7\.\u2013\u2014]+$/u;
  if (!allowed.test(name)) return false;

  // Must start and end with a letter or combining mark (no leading/trailing punctuation or space).
  if (!/^[\p{L}\p{M}]/u.test(name) || !/[\p{L}\p{M}]$/u.test(name)) return false;

  // Disallow two or more punctuation characters (apostrophe, hyphen, dot excluded) in a row.
  // (We exclude '.' from this rule because initials like "J. R. R." are common.)
  if (/['’\-\u00B7\u2013\u2014]{2,}/u.test(name)) return false;

  // Disallow consecutive spaces.
  if (/ {2,}/.test(name)) return false;

  // Disallow punctuation (except period '.') adjacent to spaces.
  // This prevents "Jean - Luc", " O' Connor", "Smith -" etc., but still allows "A. B.".
  if (/(?:[\'’\-\u00B7\u2013\u2014]\s)|(?:\s[\'’\-\u00B7\u2013\u2014])/u.test(name)) return false;

  return true;
}
