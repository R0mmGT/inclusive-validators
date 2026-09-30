function validate(name) {
  if (typeof name !== 'string') return false;
  name = name.trim();
  if (name.length === 0 || name.length > 100) return false;
  // Allow Unicode letters and combining marks. Permit single separators between letter groups:
  // space, hyphen/minus, ASCII apostrophe, right single quotation mark, and common dash characters.
  // Each chunk must start with a letter and cannot begin or end with a separator.
  const re = /^\p{L}[\p{L}\p{M}]*(?:[ \-'\u2019\u2010-\u2014]\p{L}[\p{L}\p{M}]*)*$/u;
  return re.test(name);
}
