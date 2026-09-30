function validate(name) {
  // Basic type and trimming
  if (typeof name !== 'string') return false;
  let s = name.trim();
  if (!s) return false;

  // Reasonable length limits for a given name (allows very long names but prevents abuse)
  if (s.length > 100) return false;

  // Normalize so combining sequences behave predictably when possible
  if (typeof s.normalize === 'function') s = s.normalize('NFC');

  // Allowed characters:
  // - \p{L} Unicode letters from any script
  // - \p{M} combining marks (accent marks, etc.)
  // - common name punctuation: hyphen, ASCII apostrophe, U+2019 (typographic apostrophe),
  //   U+02BC (modifier letter apostrophe), middle dot U+00B7, period, spaces (including NBSP)
  const allowed = /^[\p{L}\p{M}\-'\u2019\u02BC\u00B7\.\s\u00A0]+$/u;
  if (!allowed.test(s)) return false;

  // Must contain at least one letter
  if (!/\p{L}/u.test(s)) return false;

  // First visible character must be a letter (prevent leading punctuation)
  if (!/^\p{L}/u.test(s)) return false;

  // Last visible character should be a letter or a combining mark
  if (!/[\p{L}\p{M}]$/u.test(s)) return false;

  // Disallow obvious problematic sequences:
  // - repeated spaces or repeated punctuation like "--", "''", "..", "··"
  // - space immediately before punctuation
  // - punctuation immediately before space (for hyphen/apostrophes/middledot); allow ". " (e.g. "St. John")
  if (/(?:\s{2,}|-{2,}|'{2,}|\u2019{2,}|\.{2,}|·{2,})/.test(s)) return false;
  if (/\s[-'\u2019\u02BC\u00B7\.]/.test(s)) return false;                 // space then punctuation
  if (/[-'\u2019\u02BC\u00B7]\s/.test(s)) return false;                  // punctuation then space (except dot handled above)

  // If all checks pass, consider it a valid given name
  return true;
}
