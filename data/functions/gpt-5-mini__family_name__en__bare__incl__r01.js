function validate(name) {
  if (typeof name !== 'string') return false;
  // Normalize and trim common surrounding whitespace
  const s = name.normalize('NFC').trim();
  if (s.length === 0 || s.length > 200) return false; // reasonable upper limit

  // Unicode-aware helpers
  const isLetter = ch => /\p{L}/u.test(ch);      // any letter in any script
  const isMark   = ch => /\p{M}/u.test(ch);      // combining marks
  const isSpace  = ch => /\p{Zs}/u.test(ch);     // space separators (includes NBSP)
  const isDigit  = ch => /\p{N}/u.test(ch);      // any number
  const isSymbol = ch => /\p{S}/u.test(ch);      // emoji, currency symbols, etc.
  // Allowed punctuation often found inside family names
  const allowedPunct = new Set([
    "'", "\u2019",    // apostrophe, right single quotation mark
    "-", "\u2010", "\u2011", "\u2012", "\u2013", "\u2014", "\u2015", // hyphen/dashes
    "\u00B7",         // middle dot (e.g. Catalan ela geminada)
    "."               // period (to allow "St. John" style)
  ]);

  // Basic structural rules:
  // - First and last character must be a letter (marks must follow letters)
  // - Only letters, combining marks, allowed punctuation, and spacing separators permitted
  // - Punctuation cannot start/end the string, cannot follow a punctuation or a space
  // - A combining mark must follow a letter
  let prevType = null; // 'L' = letter, 'P' = punctuation, 'S' = space
  let sawLetter = false;

  for (let i = 0; i < s.length; i++) {
    const ch = s[i];

    if (isDigit(ch) || isSymbol(ch)) {
      // Reject numbers, emoji, currency, etc.
      return false;
    }

    if (isLetter(ch)) {
      sawLetter = true;
      prevType = 'L';
      continue;
    }

    if (isMark(ch)) {
      // Combining marks must follow a letter (not start after a separator)
      if (prevType !== 'L') return false;
      // prevType remains 'L' (mark attaches to previous letter)
      continue;
    }

    if (isSpace(ch)) {
      // No leading/trailing spaces (we trimmed), but still reject if at edges
      if (i === 0 || i === s.length - 1) return false;
      // Spaces can follow letters or other spaces or punctuation (punctuation followed by space is allowed)
      // but we will disallow space followed immediately by punctuation later when punctuation is encountered.
      prevType = 'S';
      continue;
    }

    // Punctuation: only allow specific characters and enforce adjacency rules
    if (allowedPunct.has(ch)) {
      // Cannot be first or last char
      if (i === 0 || i === s.length - 1) return false;
      // Punctuation must follow a letter (not a space or another punctuation)
      if (prevType !== 'L') return false;
      prevType = 'P';
      continue;
    }

    // Any other character (other punctuation, control chars, etc.) is rejected
    return false;
  }

  return sawLetter;
}
