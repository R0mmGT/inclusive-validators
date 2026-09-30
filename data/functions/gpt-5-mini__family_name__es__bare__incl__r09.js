function validate(s) {
  // Must be a string
  if (typeof s !== 'string') return false;

  // Trim surrounding whitespace
  s = s.trim();

  // Basic length limits (allow reasonably long surnames)
  if (s.length === 0 || s.length > 100) return false;

  // Must contain at least one Unicode letter
  if (!/\p{L}/u.test(s)) return false;

  // Define sets of allowed punctuation commonly found in surnames
  const hyphens = "-\u2010\u2011\u2012\u2013\u2014\u2015"; // ASCII hyphen + various dashes
  const apostrophes = "\u0027\u2018\u2019\u02BC"; // ' and several apostrophe variants
  const middleDots = "\u00B7\u0387"; // middle dot and Greek ano teleia

  // Entire string may only contain letters, marks (diacritics), spaces, and the allowed punctuation
  const allowedChars = new RegExp(
    `^[\\p{L}\\p{M}\\s${hyphens}${apostrophes}${middleDots}]+$`,
    'u'
  );
  if (!allowedChars.test(s)) return false;

  // No consecutive spaces
  if (/\s{2,}/.test(s)) return false;

  // Validate each space-separated word (many surnames are multi-word)
  const wordPartsSeparator = new RegExp(`[${hyphens}${apostrophes}${middleDots}]`, 'u');
  const consecutiveSeparators = new RegExp(`[${hyphens}${apostrophes}${middleDots}]{2,}`, 'u');

  const words = s.split(' ');
  for (const word of words) {
    // Word must be non-empty (split could produce empties if there were trailing/leading spaces, but we trimmed)
    if (word.length === 0) return false;

    // Word must start and end with a letter or combining mark (no leading/trailing punctuation)
    if (!/^[\p{L}\p{M}].*[\p{L}\p{M}]$/u.test(word)) return false;

    // No consecutive internal separators like -- or '' or ··
    if (consecutiveSeparators.test(word)) return false;

    // Each segment between internal separators must contain at least one letter
    const segments = word.split(wordPartsSeparator);
    for (const seg of segments) {
      if (seg.length === 0) return false;                 // separators adjacent or at ends not allowed
      if (!/\p{L}/u.test(seg)) return false;              // must include a letter
      if (!/^[\p{L}\p{M}]+$/u.test(seg)) return false;    // segments can only be letters + marks
    }
  }

  // If all checks passed, accept as a plausible surname
  return true;
}
