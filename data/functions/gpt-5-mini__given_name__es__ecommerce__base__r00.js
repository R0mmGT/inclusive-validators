function validate(name) {
  // must be a string
  if (typeof name !== 'string') return false;

  // trim edges
  const s = name.trim();

  // reasonable length limits for a given name (adjust if needed)
  if (s.length < 2 || s.length > 50) return false;

  // Unicode-aware regex:
  // - \p{L} = any kind of letter from any language
  // - \p{M} = combining marks (accents)
  // pattern allows groups of letters (with marks) separated by single spaces, hyphens or apostrophes
  // includes both straight apostrophe (') and right single quotation mark (’)
  const re = /^[\p{L}\p{M}]+(?:[ \-'\u2019][\p{L}\p{M}]+)*$/u;

  return re.test(s);
}
