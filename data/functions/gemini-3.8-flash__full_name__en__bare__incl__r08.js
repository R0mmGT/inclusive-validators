function validate(name) {
  if (typeof name !== 'string') return false;

  const trimmed = name.trim();
  if (trimmed.length < 1 || trimmed.length > 150) return false;

  // Must contain at least one Unicode letter
  if (!/\p{L}/u.test(trimmed)) return false;

  // Only allow letters, marks/diacritics, spaces, hyphens, apostrophes, and periods
  if (!/^[\p{L}\p{M}\s'’‘ʻ.\-]+$/u.test(trimmed)) return false;

  // Must start with a letter/mark or an apostrophe
  if (!/^['’‘ʻ]?[\p{L}\p{M}]/u.test(trimmed)) return false;

  // Must end with a letter, mark, period, or apostrophe
  if (!/[\p{L}\p{M}.'’‘ʻ]$/u.test(trimmed)) return false;

  // Disallow consecutive punctuation marks
  if (/['’‘ʻ.\-]{2,}/u.test(trimmed)) return false;

  // Disallow consecutive whitespace
  if (/\s{2,}/u.test(trimmed)) return false;

  // Disallow spaces before punctuation or spaces immediately following hyphens/apostrophes
  if (/\s['’‘ʻ.\-]|['’‘ʻ\-]\s/u.test(trimmed)) return false;

  return true;
}
