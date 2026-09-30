function validate(name) {
  // Normalize input
  if (typeof name !== 'string') return false;
  const s = name.trim();
  if (s.length === 0) return false;

  // Must contain at least two letters (covers single-character-name cultures too if they use two-letter full names)
  const letters = s.match(/\p{L}/gu);
  if (!letters || letters.length < 2) return false;

  // Disallow control characters and most symbols (numbers, emoji, @, #, etc.)
  // Allowed: Unicode letters (\p{L}), combining marks (\p{M}), spaces, periods (.), dash punctuation (\p{Pd}),
  // common apostrophes/modifiers (', ’, ʼ), and middle dot (·).
  const forbidden = /[^\p{L}\p{M}\s\.\p{Pd}'\u2019\u02BC\u00B7]/u;
  if (forbidden.test(s)) return false;

  // No leading/trailing spaces remaining (we trimmed) and no multiple consecutive internal spaces
  if (/\s{2,}/u.test(s)) return false;

  // No consecutive connector characters like "--", "''", "..", etc.
  if (/(?:[.\p{Pd}'\u2019\u02BC\u00B7]){2,}/u.test(s)) return false;

  // Split into space-separated words. Many cultures use single-word names, so we don't require multiple words,
  // but we validate each "word" component carefully.
  const words = s.split(/\s+/u);

  // Regex parts for later use
  const lettersOnly = /^\p{L}[\p{L}\p{M}]*$/u; // token must start with a letter and contain only letters/marks
  const initialsPattern = /^(\p{L}\.)+$/u; // e.g. "J.R.R."
  const trailingDotWord = /^\p{L}[\p{L}\p{M}]*\.$/u; // e.g. "St." or "J."
  const connectorChars = /[\p{Pd}'\u2019\u02BC\u00B7]/u; // hyphens/apostrophes/middle dot

  for (const w of words) {
    if (w.length === 0) return false;

    // If word contains a period, we only allow:
    //  - sequences of single-letter initials with dots: "J.R.R." or "J.R."
    //  - or a single trailing dot abbreviation: "St." or "Dr."
    if (w.includes('.')) {
      if (initialsPattern.test(w)) {
        continue; // valid initials group
      }
      if (trailingDotWord.test(w)) {
        // ensure inside the word there are no connector characters (e.g. "O.'" is invalid)
        const inner = w.slice(0, -1);
        // allow multi-letter abbreviation like "St." but must be letters/marks only
        if (lettersOnly.test(inner)) continue;
      }
      return false;
    }

    // Word without periods: ensure it does not start or end with connector and connectors are not adjacent
    if (connectorChars.test(w[0]) || connectorChars.test(w[w.length - 1])) return false;
    if (/(?:[\p{Pd}'\u2019\u02BC\u00B7]){2,}/u.test(w)) return false;

    // Split by connectors (hyphen, apostrophe, middle dot, various dash punctuation)
    const parts = w.split(/[\p{Pd}'\u2019\u02BC\u00B7]/u).filter(Boolean);
    if (parts.length === 0) return false;

    // Each part must be letters (with optional combining marks)
    for (const p of parts) {
      if (!lettersOnly.test(p)) return false;
    }
  }

  // All checks passed
  return true;
}
