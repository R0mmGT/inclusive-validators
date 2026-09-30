function validate(name) {
  // Accept only strings
  if (typeof name !== 'string') return false;

  // Trim surrounding whitespace
  const s = name.trim();
  if (s.length === 0) return false;

  // Work in terms of Unicode code points
  const chars = Array.from(s);
  const len = chars.length;

  // Reject extremely long names (practical safeguard)
  if (len > 100) return false;

  // Helpers using Unicode property escapes
  const isLetter = cp => /^\p{L}$/u.test(cp);
  const isMark = cp => /^\p{M}$/u.test(cp);
  const isLetterOrMark = cp => /^\p{L}|\p{M}$/u.test(cp);

  const isHyphen = cp => /^\p{Pd}$/u.test(cp); // any hyphen-type punctuation
  const isApostrophe = cp => cp === "'" || cp === "\u2019"; // ASCII apostrophe or right single quote
  const isMiddleDot = cp => cp === "\u00B7";
  const isPeriod = cp => cp === ".";
  const isSpace = cp => cp === " ";

  const isAllowedSeparator = cp =>
    isHyphen(cp) || isApostrophe(cp) || isMiddleDot(cp) || isPeriod(cp) || isSpace(cp);

  // Quick allowed-character check (letters, marks, and a small set of separators)
  for (let i = 0; i < len; i++) {
    const cp = chars[i];
    if (!isLetter(cp) && !isMark(cp) && !isAllowedSeparator(cp)) return false;
  }

  // Must contain at least one letter
  if (!chars.some(isLetter)) return false;

  // Must start with a letter
  if (!isLetter(chars[0])) return false;

  // Must end with a letter or combining mark (so trailing combining marks are allowed)
  if (!(isLetter(chars[len - 1]) || isMark(chars[len - 1]))) return false;

  // Disallow any separator at the ends (already covered by start/end checks),
  // and disallow any separator that is adjacent to non-letters on either side.
  // That prevents multiple separators in a row and separators at boundaries.
  for (let i = 0; i < len; i++) {
    const cp = chars[i];
    if (isAllowedSeparator(cp)) {
      // Separator must be surrounded by letter/mark on both sides
      // (e.g., "Jean-Luc", "D'Arcy", "Mary Anne")
      const prev = chars[i - 1];
      const next = chars[i + 1];
      if (!prev || !next) return false; // shouldn't happen because start/end already checked
      if (!(isLetter(prev) || isMark(prev))) return false;
      if (!(isLetter(next) || isMark(next))) return false;
    }
  }

  // All checks passed
  return true;
}
