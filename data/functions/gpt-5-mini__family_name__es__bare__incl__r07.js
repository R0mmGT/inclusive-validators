function validate(name) {
  // Very permissive, Unicode-aware surname validator:
  // - Accepts letters from any script and their combining marks.
  // - Allows common name punctuation: spaces, dashes, apostrophes, middle dot, period.
  // - Disallows digits, control chars, emojis, and other symbols.
  // - Disallows leading/trailing separators and most consecutive separators,
  //   but allows the common abbreviation pattern ". " (e.g. "St. John").
  // - Length limited to avoid pathological inputs.
  if (typeof name !== 'string') return false;

  name = name.trim();
  if (name.length === 0) return false;
  if (name.length > 200) return false; // reasonable upper bound

  // Quick: must contain at least one Unicode letter
  if (!/\p{L}/u.test(name)) return false;

  // Helper tests
  const isLetter = ch => /\p{L}/u.test(ch);
  const isMark = ch => /\p{M}/u.test(ch);
  const isDash = ch => /\p{Pd}/u.test(ch); // any dash punctuation
  const isSpace = ch => ch === ' ';
  const isApostrophe = ch => ch === "'" || ch === '’' || ch === 'ʼ' || ch === 'ʻ' || ch === '\u02BC';
  const isMiddleDot = ch => ch === '\u00B7' || ch === '\u0387';
  const isDot = ch => ch === '.';

  // Validate character set and sequencing
  let prevIsSeparator = false;
  let prevChar = '';
  let sawLetter = false;

  // First char must be a letter
  let firstChar = [...name][0];
  if (!isLetter(firstChar)) return false;

  for (const ch of name) {
    // Allowed categories: letter, mark, dash, space, apostrophe, middle dot, dot
    if (isLetter(ch)) {
      sawLetter = true;
      prevIsSeparator = false;
    } else if (isMark(ch)) {
      // combining marks are allowed but must follow a letter/mark sequence; 
      // we treat them as non-separators (they attach to previous base)
      // If a mark appears at the very start (no previous letter), invalid:
      if (!sawLetter) return false;
      prevIsSeparator = false;
    } else if (isSpace(ch) || isDash(ch) || isApostrophe(ch) || isMiddleDot(ch) || isDot(ch)) {
      // Separator character
      // Disallow certain invalid combos: two separators in a row,
      // except allow dot followed by space (e.g. "St. John").
      if (prevIsSeparator) {
        // allow ". " specifically
        if (!(isDot(prevChar) && isSpace(ch))) return false;
      }
      prevIsSeparator = true;
    } else {
      // any other character (digits, symbols, emoji, punctuation not allowed) => invalid
      return false;
    }
    prevChar = ch;
  }

  // Last character must be a letter (surname shouldn't end with punctuation or space)
  const lastChar = [...name].slice(-1)[0];
  if (!isLetter(lastChar)) return false;

  // Final sanity: contains at least one letter (already checked) and no isolated weird sequences
  return true;
}
