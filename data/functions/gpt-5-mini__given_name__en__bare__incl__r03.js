function validate(name) {
  // Basic type and trimming
  if (typeof name !== 'string') return false;
  name = name.trim();
  if (name.length === 0 || name.length > 100) return false; // reasonable length cap

  // Prefer a stable Unicode representation when available
  if (typeof name.normalize === 'function') {
    name = name.normalize('NFC');
  }

  // Build a Unicode-aware pattern:
  // - allow letters (\p{L}) with optional combining marks (\p{M})
  // - allow single-letter initials with a dot (e.g. "J.")
  // - allow separators between name parts: space, NBSP, hyphens, various dashes,
  //   ASCII apostrophe and Unicode right single quote, and middle dot (used in some names)
  // - do not allow separators at the start/end or repeated separators (enforced by pattern)
  const part = "(?:\\p{L}\\p{M}*|\\p{L}\\p{M}?\\.)";
  const sep = "[ \\u00A0\\-\\u2010\\u2011\\u2012\\u2013\\u2014\\u2015'\\u2019\\u00B7]";
  // Ensure the whole string is composed of one or more parts joined by single separators,
  // and limit overall length (characters) to the earlier checked range.
  const re = new RegExp(`^${part}(?:${sep}${part})*$`, 'u');

  return re.test(name);
}
