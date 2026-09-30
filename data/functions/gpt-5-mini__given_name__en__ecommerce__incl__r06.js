function validate(name) {
  // Accept only strings
  if (typeof name !== 'string') return false;

  // Normalize and trim
  const s = name.trim();

  // Reasonable length limits for a given name (allows very long names but prevents empty/abusive input)
  if (s.length === 0 || s.length > 100) return false;

  // Require at least one letter from any Unicode script
  if (!/\p{L}/u.test(s)) return false;

  // Allowed characters:
  // - Unicode letters (\p{L})
  // - Unicode combining marks (\p{M}) so letters with diacritics are allowed in composed/decomposed forms
  // - Space (U+0020)
  // - ASCII apostrophe ' and right single quotation mark ’ (U+2019)
  // - Hyphen-minus -
  // - Middle dot · (U+00B7)
  // - Period . (to permit initials like "J. R.")
  const allowedRe = /^[\p{L}\p{M} '\u2019\-\.\u00B7]{1,100}$/u;
  if (!allowedRe.test(s)) return false;

  // Disallow starting or ending with a separator punctuation or space
  if (/^[ '\u2019\-\.\u00B7]/u.test(s) || /[ '\u2019\-\.\u00B7]$/u.test(s)) return false;

  // Disallow consecutive separator characters (two or more of space/apostrophe/hyphen/period/middle-dot)
  if (/[ '\u2019\-\.\u00B7]{2,}/u.test(s)) return false;

  // Passed all checks
  return true;
}
