function validate(name) {
  if (typeof name !== 'string') return false;
  const trimmed = name.trim();
  if (trimmed.length === 0 || trimmed.length > 100) return false;
  // Accept Unicode letters (including diacritics), allow combining marks,
  // and allow single separators between letter groups:
  // space, non-breaking space, hyphen, ASCII apostrophe, and Unicode right single quote.
  const re = /^[\p{L}][\p{L}\p{M}]*(?:[ \u00A0\-'\u2019][\p{L}\p{M}]+)*$/u;
  return re.test(trimmed);
}
