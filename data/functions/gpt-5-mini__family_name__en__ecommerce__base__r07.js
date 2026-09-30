function validate(name) {
  if (typeof name !== 'string') return false;
  const s = name.trim();
  if (s.length === 0 || s.length > 60) return false;

  // Accept Unicode letters (and combining marks), allow internal apostrophes, hyphens, dots and spaces
  // - Must start and end with a letter
  // - Separators (hyphen, apostrophe, dot+optional space, or space) must be followed by a letter (prevents consecutive separators)
  // - Common unicode apostrophe/right-single-quote and a few hyphen variants are allowed
  const re = /^\p{L}[\p{L}\p{M}]*(?:(?:[-\u2010\u2011\u2013]|['\u2019\u2018]|\. ?|\s)\p{L}[\p{L}\p{M}]*)*$/u;
  return re.test(s);
}
