function validate(name) {
  if (typeof name !== 'string') return false;
  name = name.trim();
  if (name.length === 0 || name.length > 100) return false;

  // Allow Unicode letters and combining marks, with optional single separators (space, hyphen, apostrophe)
  // - Must start and end with a letter
  // - No consecutive separators
  // - No digits or other punctuation
  const re = /^[\p{L}\p{M}]+(?:[ '\-][\p{L}\p{M}]+)*$/u;
  return re.test(name);
}
