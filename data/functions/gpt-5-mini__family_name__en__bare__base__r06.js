function validate(name) {
  // Return false for non-strings or obvious length problems
  if (typeof name !== 'string') return false;
  name = name.trim();
  if (name.length === 0 || name.length > 100) return false;

  // A name part is one or more Unicode letters (including combining marks).
  // Allowed separators between parts: space, hyphen, period, ASCII and common Unicode apostrophes,
  // middle dot and non-breaking hyphen.
  // Disallow leading/trailing separators and consecutive separators by construction.
  const re = /^[\p{L}\p{M}]+(?:[ \-'\u2019\u02BC\u00B7\u2011\.][\p{L}\p{M}]+)*$/u;

  return re.test(name);
}
