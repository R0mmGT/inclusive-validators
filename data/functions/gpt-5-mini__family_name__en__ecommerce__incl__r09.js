function validate(name) {
  // Basic type and trimming
  if (typeof name !== 'string') return false;
  const s = name.trim();
  if (s.length === 0 || s.length > 100) return false; // reasonable max length

  // Unicode-aware validation:
  // - Start and end with a letter (any script)
  // - Segments are one or more letters or combining marks
  // - Segments can be separated by a single allowed separator:
  //     any space separator, any dash (Pd), apostrophes (', ’, ʼ), or middle dot (·)
  // - No digits or other punctuation are allowed
  // Uses Unicode property escapes, requires environments that support them
  const re = /^[\p{L}\p{M}]+(?:[\p{Zs}\p{Pd}'\u2019\u02BC\u00B7][\p{L}\p{M}]+)*$/u;
  return re.test(s);
}
