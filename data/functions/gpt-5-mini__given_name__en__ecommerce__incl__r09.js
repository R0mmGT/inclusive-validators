function validate(name) {
  // Accept only strings
  if (typeof name !== 'string') return false;

  // Trim and quick length checks
  const trimmed = name.trim();
  if (trimmed.length === 0 || trimmed.length > 100) return false;

  // Normalize runs of Unicode space separators to a single ASCII space.
  // This helps tolerate accidental extra spaces while keeping validation strict otherwise.
  const normalized = trimmed.replace(/\p{Zs}+/gu, ' ');

  // Regex explanation:
  // - ^\p{L}           : must start with a Unicode letter
  // - [\p{L}\p{M}]*    : followed by letters or combining marks (accents, etc.)
  // - (?:[...] ... )*  : zero or more groups of:
  //     a single separator (space, any dash punctuation, ASCII apostrophe, typographic apostrophe, middle dot)
  //     followed by a letter + optional marks
  // - $                : end of string
  //
  // This allows names from any script (Latin, Cyrillic, Arabic, Chinese, etc.), including diacritics,
  // and common name separators like hyphens and apostrophes, while rejecting digits, emoji, and most punctuation.
  const re = /^\p{L}[\p{L}\p{M}]*(?:[ \p{Pd}'\u2019\u00B7]\p{L}[\p{L}\p{M}]*)*$/u;

  return re.test(normalized);
}
