function validate(name) {
  // Basic type and trimming
  if (typeof name !== 'string') return false;
  const s = name.trim();
  if (s.length === 0 || s.length > 60) return false; // reject empty or unreasonably long names

  // Accept Unicode letters (including diacritics and many scripts). Allow single separators:
  // space, hyphen, ASCII apostrophe (') and Unicode right single quotation mark (’).
  // Each separator must be followed and preceded by a letter. No consecutive separators.
  const re = /^\p{L}\p{M}*(?:[ '\-\u2019]\p{L}\p{M}*)*$/u;

  return re.test(s);
}
