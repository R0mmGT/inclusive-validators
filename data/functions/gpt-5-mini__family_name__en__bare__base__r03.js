function validate(name) {
  // Basic sanity checks
  if (typeof name !== 'string') return false;
  const s = name.trim();
  if (s.length === 0 || s.length > 100) return false;

  // Allow Unicode letters (and combining marks), separated by single
  // hyphens, apostrophes (ASCII and U+2019), a few hyphen variants, or spaces.
  // Disallow leading/trailing separators and consecutive separators.
  const re = /^[\p{L}\p{M}]+(?:[-'\u2019\u2010\u2011 ][\p{L}\p{M}]+)*$/u;
  return re.test(s);
}
