function validate(name) {
  // Must be a string
  if (typeof name !== 'string') return false;

  // No leading/trailing whitespace
  if (name.trim() !== name) return false;
  if (name.length === 0) return false;

  // Only allow Unicode letters (including accents), spaces, hyphens and apostrophes.
  // - Must start with a letter and each separator must be followed by a letter.
  // - Disallows consecutive separators, leading/trailing separators, digits and other punctuation.
  const pattern = /^\p{L}\p{M}*(?:[ '-]\p{L}\p{M}*)*$/u;
  if (!pattern.test(name)) return false;

  // Require at least two letters (helps avoid inputs like "-" or single-letter garbage)
  const letterCount = (name.match(/\p{L}/gu) || []).length;
  return letterCount >= 2;
}
