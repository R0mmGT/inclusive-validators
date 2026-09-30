function validate(name) {
  // Basic type and normalization
  if (typeof name !== 'string') return false;
  // Normalize all whitespace to single ASCII space and trim ends
  const normalized = name.replace(/\s+/gu, ' ').trim();
  if (!normalized) return false;

  // Reasonable length limits (in Unicode code points)
  const length = Array.from(normalized).length;
  if (length < 1 || length > 100) return false;

  // Must contain at least one letter from any script
  if (!/\p{L}/u.test(normalized)) return false;

  // Split into space-separated tokens (many cultures write multiple parts; mononyms are allowed)
  const parts = normalized.split(' ');

  // Build reusable Unicode-aware patterns.
  // \p{L} = any letter, \p{M} = combining marks, \p{Pd} = dash punctuation
  const L = '\\p{L}';
  const M = '\\p{M}';
  const PD = '\\p{Pd}';
  // Common apostrophe-like characters and middle dot
  const APOSTROPHES = "'\u2019\u02BC";
  const MIDDLEDOT = '\u00B7';

  // A token that is "wordy": starts with letters/marks and may contain internal single
  // punctuation pieces (apostrophe/dash/middle-dot) followed by letters again.
  const wordyPattern = new RegExp(
    `^[${L}${M}]+(?:[${APOSTROPHES}${MIDDLEDOT}${PD}][${L}${M}]+)*$`,
    'u'
  );

  // Allow common abbreviations/initials that end with a dot, e.g. "J.", "St." or "Dr."
  // Limit abbreviation length to a small number to avoid accepting arbitrary punctuation-heavy tokens.
  const abbrevPattern = new RegExp(`^[${L}${M}]{1,5}\\.$`, 'u');

  for (const part of parts) {
    if (!part) return false; // double space would have been collapsed, but guard anyway

    // Reject tokens that contain digits or other symbols not explicitly allowed
    if (/[0-9]/u.test(part)) return false;

    // Accept standalone abbreviations like "J." or "St."
    if (abbrevPattern.test(part)) continue;

    // Accept "wordy" tokens like "O'Neill", "Jean-Luc", "李", "Иванов", "Anne•Marie"
    if (wordyPattern.test(part)) continue;

    // If none matched, it's invalid
    return false;
  }

  return true;
}
