function validate(name) {
  // Validate a person's family name across cultures (Unicode-aware).
  if (typeof name !== 'string') return false;
  const s = name.trim();
  if (s.length === 0 || s.length > 100) return false; // reasonable max length

  // If single character, it must be a letter.
  if (s.length === 1) return /\p{L}/u.test(s);

  // Allowed characters:
  // \p{L} letters, \p{M} combining marks,
  // common separators: space, apostrophes (straight and curly), various dashes/hyphens,
  // period, middle dot (· U+00B7), Japanese middle dot (・ U+30FB)
  const allowedRe = /^[\p{L}\p{M} '\u2018\u2019\-\u2010\u2011\u2013\u2014\.\u00B7\u30FB]+$/u;
  if (!allowedRe.test(s)) return false;

  // Must contain at least one letter.
  if (!/\p{L}/u.test(s)) return false;

  // Disallow leading or trailing separator characters.
  const sepChars = new Set([" ", "'", "’", "‘", "-", "\u2010", "\u2011", "\u2013", "\u2014", ".", "\u00B7", "\u30FB"]);
  if (sepChars.has(s[0]) || sepChars.has(s[s.length - 1])) return false;

  // Disallow most consecutive separators (two separators in a row), but allow a period followed by a space
  for (let i = 0; i < s.length - 1; i++) {
    const a = s[i], b = s[i + 1];
    if (sepChars.has(a) && sepChars.has(b)) {
      // allow ". " (e.g. "St. John")
      if (a === "." && b === " ") continue;
      return false;
    }
  }

  // Reject names that are purely punctuation-like (e.g., only separators even if they include letters check passed earlier,
  // this protects against weird edge cases).
  // (At this point we already ensured at least one Unicode letter exists, so this is mostly redundant but harmless.)
  return true;
}
