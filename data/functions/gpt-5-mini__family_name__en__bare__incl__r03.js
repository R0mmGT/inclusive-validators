function validate(name) {
  // Basic type & trimming
  if (typeof name !== 'string') return false;
  let s = name.trim();
  if (s.length === 0) return false;
  // Reasonable length guard for last names (adjustable)
  if (s.length > 100) return false;

  // Normalize some common space characters to ASCII space and collapse runs
  s = s.replace(/[\u00A0\u1680\u2000-\u200A\u202F\u205F\u3000]/g, ' ');
  s = s.replace(/ +/g, ' ');

  // Disallow ASCII control characters
  if (/[\p{Cc}]/u.test(s)) return false;

  // Disallow any numeric characters (last names generally don't contain digits)
  if (/\p{N}/u.test(s)) return false;

  // A "segment" is a run that starts (optionally) with an apostrophe, then a letter,
  // may have combining marks, and may contain internal separators followed by letters.
  // Allowed internal separators: any dash (Unicode Pd), apostrophes (' and ’),
  // middle dot (·), period, and zero-width joiner/non-joiner.
  const segment = "(?:['\u2019])?\\p{L}\\p{M}*(?:[\\p{Pd}'\u2019\u00B7\u200C\u200D\\.]\\p{L}\\p{M}*)*";
  // Full pattern: one or more segments separated by single ASCII spaces
  const full = new RegExp(`^${segment}(?: ${segment})*$`, 'u');

  return full.test(s);
}
