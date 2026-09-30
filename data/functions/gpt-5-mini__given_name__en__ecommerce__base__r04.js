function validate(name) {
  if (typeof name !== 'string') return false;
  name = name.trim();
  if (name.length === 0 || name.length > 60) return false;

  // Allowed separator characters between name parts
  const separators = new Set([" ", "-", "'", "\u2019", "\u02BC", "\u00B7"]);
  // Unicode letter and mark checks
  const isLetterOrMark = ch => /\p{L}|\p{M}/u.test(ch);
  const hasLetter = s => /\p{L}/u.test(s);

  // Must contain at least one letter overall
  if (!hasLetter(name)) return false;

  // No forbidden characters and no consecutive separators; cannot start/end with a separator
  if (separators.has(name[0]) || separators.has(name[name.length - 1])) return false;
  let prevSep = false;
  for (let i = 0; i < name.length; i++) {
    const ch = name[i];
    if (separators.has(ch)) {
      if (prevSep) return false; // consecutive separators not allowed
      prevSep = true;
    } else if (isLetterOrMark(ch)) {
      prevSep = false;
    } else {
      // any other character (digits, punctuation, symbols, control chars) is invalid
      return false;
    }
  }

  // Each part between separators must contain at least one letter (prevents parts that are only combining marks)
  const parts = name.split(/[\s\-'\u2019\u02BC\u00B7]+/u);
  for (const part of parts) {
    if (part.length === 0) return false;
    if (!hasLetter(part)) return false;
  }

  return true;
}
