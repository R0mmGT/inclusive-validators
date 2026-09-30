function validate(name) {
  // Must be a string
  if (typeof name !== 'string') return false;

  // Normalize Unicode (if available) and trim whitespace
  const s = (name.normalize ? name.normalize('NFC') : name).trim();

  // Reject empty or excessively long names
  if (s.length === 0 || s.length > 50) return false;

  // Pattern:
  // - Start with one or more Unicode letters (including marks for accents)
  // - Then allow groups prefixed by a single separator:
  //   separators include space, ASCII apostrophe, common Unicode apostrophes, and hyphen/dash variants
  // - No leading/trailing separators, no consecutive separators
  //
  // Uses Unicode property escapes (\p{L}, \p{M}) so a modern JS engine is required.
  const re = /^[\p{L}\p{M}]+(?:[ \u2018\u2019\u2010\u2011\u2013\u2014'\-][\p{L}\p{M}]+)*$/u;

  return re.test(s);
}
