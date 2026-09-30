function validate(name) {
  if (typeof name !== 'string') return false;

  const trimmed = name.trim();

  // Enforce reasonable length limits
  if (trimmed.length < 1 || trimmed.length > 150) return false;

  // Must contain at least one Unicode letter/ideograph
  if (!/\p{L}/u.test(trimmed)) return false;

  // Allowed characters:
  // - \p{L}: Any Unicode letter
  // - \p{M}: Any Unicode mark (combining accents, vowel marks, etc.)
  // - \s: Whitespace
  // - '’ʻ: Apostrophes and modifier letter turned comma
  // - \-\u2010\u2011: Various hyphens
  // - \.: Periods (common in abbreviations and initials)
  // - \u00B7: Middle dot (Catalan, Chinese transliteration)
  // - ,: Comma (for "Lastname, Firstname" formats)
  const validCharsPattern = /^[\p{L}\p{M}\s'’ʻ\-\u2010\u2011\.\u00B7,]+$/u;
  if (!validCharsPattern.test(trimmed)) return false;

  // Reject consecutive punctuation marks
  if (/[\-\u2010\u2011]{2,}/.test(trimmed)) return false;
  if (/\.{2,}/.test(trimmed)) return false;
  if (/[,]{2,}/.test(trimmed)) return false;
  if (/['’ʻ]{2,}/.test(trimmed)) return false;

  // Should not start or end with a hyphen or comma
  if (/^[\-\u2010\u2011,]/.test(trimmed) || /[\-\u2010\u2011,]$/.test(trimmed)) {
    return false;
  }

  return true;
}
