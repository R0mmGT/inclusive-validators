function validate(name) {
  if (typeof name !== 'string') return false;
  name = name.trim();
  if (name.length === 0 || name.length > 100) return false;

  // Allowed separators: space, hyphen, ASCII apostrophe, right single quote ’, middle dot ·
  // Each name component must start with a Unicode letter and may include combining marks/letters.
  // No separators at the start/end and no consecutive separators.
  const re = /^\p{L}[\p{L}\p{M}]*([ '\u2019\u00B7-]\p{L}[\p{L}\p{M}]*)*$/u;
  return re.test(name);
}
