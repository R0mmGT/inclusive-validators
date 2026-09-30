function validate(name) {
  // Inclusive full-name validator for global use.
  // - Allows letters from any script (Unicode \p{L}) and combining marks (\p{M}).
  // - Allows common intra-name punctuation: hyphens, various apostrophes, middle dot, periods (for initials/abbreviations).
  // - Allows zero-width joiner/non-joiner used in many scripts.
  // - Parts are separated by Unicode space separators (\p{Zs}) (covers regular space, NBSP, etc.).
  // - Each name "part" must start with a letter and must contain at least one letter.
  // - Parts may either be an initial (e.g. "J.") or a multi-letter part that starts and ends with a letter.
  // - Rejects digits and most other symbols.
  if (typeof name !== 'string') return false;
  name = name.trim();
  if (name.length === 0 || name.length > 200) return false;

  // Build part:
  // 1) Initial like "J."
  // 2) Or a multi-character part that starts with a letter and ends with a letter (marks allowed),
  //    with allowed inner chars (letters, marks, hyphens, apostrophes, dots, middle dot, ZWJ/ZWNJ).
  const part = [
    // initial
    '\\p{L}\\.',
    // full part: start with letter, then zero or more allowed inner chars, end with letter or mark
    '\\p{L}(?:[\\p{L}\\p{M}\\-\\u2010-\\u2015\\u00B7\\u0027\\u2019\\u02BC\\.\\u200C\\u200D]*[\\p{L}\\p{M}])'
  ].join('|');

  // Full pattern: one part, optionally followed by more parts separated by one or more Unicode space separators.
  const pattern = `^(?:${part})(?:[\\p{Zs}]+(?:${part}))*$`;

  const re = new RegExp(pattern, 'u');
  return re.test(name);
}
