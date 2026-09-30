function validate(name) {
  if (typeof name !== 'string') return false;
  // Trim surrounding whitespace (but internal spaces are allowed)
  const s = name.trim();
  if (s.length === 0 || s.length > 100) return false; // simple length guard

  // Allow Unicode letters and combining marks, optionally separated by single:
  // space, hyphen, ASCII apostrophe, Unicode right single quote, or middle dot.
  // No leading/trailing separators, no consecutive separators.
  const re = /^[\p{L}\p{M}]+(?:[ \-\u0027\u2019\u00B7][\p{L}\p{M}]+)*$/u;
  return re.test(s);
}
