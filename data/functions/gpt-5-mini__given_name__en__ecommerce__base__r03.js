function validate(name) {
  if (typeof name !== 'string') return false;
  name = name.trim();
  if (name.length === 0) return false;

  // reasonable length limits (in Unicode codepoints)
  const length = [...name].length;
  if (length < 1 || length > 50) return false;

  // Allow Unicode letters (with combining marks), spaces, hyphens and common apostrophes.
  // - Segments must start and end with a letter (no leading/trailing separators)
  // - No consecutive separators
  const re = /^[\p{L}\p{M}]+(?:[\u0027\u2018\u2019\- ][\p{L}\p{M}]+)*$/u;
  return re.test(name);
}
