function validate(name) {
  // Basic type and length checks
  if (typeof name !== 'string') return false;
  name = name.trim();
  if (name.length === 0 || name.length > 100) return false;

  // Accept Unicode letters and combining marks as letter characters.
  // Allow internal separators: space, ASCII apostrophe, right single quote (U+2019),
  // hyphen/minus and common dash characters (U+2013, U+2014).
  // - Must start and end with a letter.
  // - No consecutive separators because separators must be followed by one or more letters.
  const re = /^[\p{L}\p{M}]+(?:[ '\u2019\u2013\u2014-][\p{L}\p{M}]+)*$/u;
  return re.test(name);
}
