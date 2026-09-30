function validate(s) {
  if (typeof s !== 'string') return false;
  s = s.trim();
  if (s.length < 2 || s.length > 60) return false;
  // Allow Unicode letters (including accented and ñ), combining marks,
  // and single separators (space, hyphen, apostrophe — including U+2019).
  const re = /^[\p{L}\p{M}]+(?:[ '\u2019\-][\p{L}\p{M}]+)*$/u;
  return re.test(s);
}
