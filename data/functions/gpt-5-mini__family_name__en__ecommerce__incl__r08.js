function validate(name) {
  // Basic type/trim checks
  if (typeof name !== 'string') return false;
  const s = name.trim();
  if (s.length === 0 || s.length > 100) return false; // reasonable max length

  // Must contain at least one Unicode letter
  if (!/\p{L}/u.test(s)) return false;

  // Allowed characters:
  // - Unicode letters (\p{L}) and combining marks (\p{M})
  // - space
  // - ASCII apostrophe ' and right single quotation mark ’ (U+2019)
  // - hyphen-minus -
  // - period .
  // - middle dot · (U+00B7) (used in some Catalan/other names)
  const allowed = /^[\p{L}\p{M} '\u2019\-\.\u00B7]+$/u;
  if (!allowed.test(s)) return false;

  // Disallow starting or ending with a separator character
  if (/^[ '\u2019\-\.\u00B7]/u.test(s) || /[ '\u2019\-\.\u00B7]$/u.test(s)) return false;

  // Disallow repeated separator characters (e.g. "--", "  ", "''", ". ")
  if (/[ '\u2019\-\.\u00B7]{2,}/u.test(s)) return false;

  // Passed all checks
  return true;
}
