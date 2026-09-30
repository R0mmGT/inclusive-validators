function validate(name) {
  if (typeof name !== 'string') return false;
  const s = name.trim();
  if (s.length === 0 || s.length > 60) return false; // reasonable length limits
  // Allow Unicode letters and combining marks, spaces, ASCII apostrophe, right single quote (U+2019) and hyphen.
  // - Must start and end with a letter (or combining mark attached to a letter)
  // - No consecutive separators (space, hyphen, apostrophe)
  const re = /^(?!.*[ '\-\u2019]{2})(?!.*[ '\-\u2019]$)[\p{L}\p{M}]+(?:[ '\-\u2019][\p{L}\p{M}]+)*$/u;
  return re.test(s);
}
