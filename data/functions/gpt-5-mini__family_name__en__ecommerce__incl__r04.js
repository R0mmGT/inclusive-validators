function validate(name) {
  // Must be a string
  if (typeof name !== 'string') return false;

  // Normalize and trim whitespace at ends
  const s = name.normalize('NFC').trim();

  // Empty or excessively long names are not allowed
  if (s.length === 0 || s.length > 100) return false;

  // Allow letters and combining marks from any script, separated by a single
  // allowed separator (space, hyphen, apostrophe, middle dot, period, several hyphen types).
  // - \p{L} and \p{M} cover letters and combining marks across all Unicode scripts.
  // - Separators cannot appear at the start or end and cannot be consecutive.
  const re = new RegExp(
    "^[\\p{L}\\p{M}]+(?:(?:[ '\\-\\.\\u2019\\u00B7\\u2010\\u2011])[\\p{L}\\p{M}]+)*$",
    'u'
  );

  return re.test(s);
}
