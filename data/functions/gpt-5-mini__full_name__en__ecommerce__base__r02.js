function validate(name) {
  if (typeof name !== 'string') return false;
  const s = name.trim();
  if (s.length < 2 || s.length > 100) return false;

  // must contain at least a first and last name (two separate parts)
  const parts = s.split(/\s+/);
  if (parts.length < 2) return false;

  // Each part must start and end with a letter. Internal allowed separators:
  // apostrophe (ASCII ' and Unicode ’), hyphen-minus (-) or en-dash (U+2013), and period.
  // No digits or other punctuation allowed. Uses Unicode property escapes.
  const partRe = /^\p{L}+(?:[.'’\-\u2013]\p{L}+)*\.?$/u;

  // reasonable limit on individual part length
  const MAX_PART_LEN = 50;

  for (const p of parts) {
    if (!p || p.length > MAX_PART_LEN) return false;
    if (!partRe.test(p)) return false;
  }

  return true;
}
