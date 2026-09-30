function validate(name) {
  if (typeof name !== 'string') return false;
  const s = name.trim();
  if (s.length === 0 || s.length > 200) return false;

  // Reject control characters (including non-printable)
  if (/[\p{C}]/u.test(s)) return false;

  // Split on any whitespace sequence (allows multiple spaces/tabs/newlines to be treated as separators)
  const parts = s.split(/\s+/);

  // A valid name part:
  // - starts with a Unicode letter (\p{L}) possibly followed by combining marks (\p{M})
  // - may contain internal separators: apostrophes, right single quote, hyphens, various hyphen forms, middle dot, or a period,
  //   but each such separator must be followed by a letter (so no consecutive punctuation or punctuation at the start)
  // - may optionally end with a period (for initials or abbreviations)
  //
  // This is intentionally permissive to accommodate global naming conventions but forbids digits, commas, @, #, etc.
  const partRe = /^\p{L}\p{M}*(?:['’\-\u2010\u2011\u00B7\.]\p{L}\p{M}*)*(?:\.)?$/u;

  for (const part of parts) {
    if (!partRe.test(part)) return false;
  }

  return true;
}
