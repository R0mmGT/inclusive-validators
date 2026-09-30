function validate(name) {
  if (typeof name !== 'string') return false;
  const s = name.trim();
  if (s.length === 0 || s.length > 50) return false;

  // Accept Unicode letters (with combining marks), common apostrophes and hyphens, and spaces.
  // Disallow leading/trailing separators and consecutive separators.
  // Separator characters included: space, non-breaking space, apostrophes (', ’, ʼ), common hyphen/dash variants.
  const re = /^(?!.*[ '\u00A0\u2019\u02BC\u002D\u2010\u2011\u2012\u2013\u2014]{2})[\p{L}](?:[\p{L}\p{M}])*(?:[ '\u00A0\u2019\u02BC\u002D\u2010\u2011\u2012\u2013\u2014][\p{L}](?:[\p{L}\p{M}])*)*$/u;
  return re.test(s);
}
