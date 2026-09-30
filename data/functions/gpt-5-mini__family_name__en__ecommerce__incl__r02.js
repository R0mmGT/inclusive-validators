function validate(name) {
  // Return true if `name` looks like a valid family/last name across cultures.
  // Rules (balanced for permissiveness and abuse prevention):
  // - Must be a non-empty string (1..100 chars after trim).
  // - Only letters (all Unicode scripts) and combining marks are allowed in name parts.
  // - Allow separators commonly used inside family names: space, hyphen, ASCII apostrophe,
  //   common Unicode apostrophes, middle dot and period (for abbreviations such as "St. John").
  // - Separators must not appear at start or end, nor be repeated consecutively.
  // - Each name part (between separators) must contain at least one letter.
  if (typeof name !== 'string') return false;
  const s = name.trim();
  if (s.length === 0 || s.length > 100) return false;

  // Allowed separator characters:
  // space, hyphen -, apostrophes (' and ’ U+2019 and ʼ U+02BC), middle dot · U+00B7, period .
  const consecutiveSep = /[ \-'\u2019\u02BC\u00B7\.]{2,}/u;
  if (consecutiveSep.test(s)) return false;

  const startsOrEndsWithSep = /^[ \-'\u2019\u02BC\u00B7\.]|[ \-'\u2019\u02BC\u00B7\.]$/u;
  if (startsOrEndsWithSep.test(s)) return false;

  // Only letters (all Unicode letter categories) and combining marks plus allowed separators
  const allowed = /^[\p{L}\p{M} \-'\u2019\u02BC\u00B7\.]+$/u;
  if (!allowed.test(s)) return false;

  // Split into parts by any single separator and ensure each part is letters+marks only.
  const splitSep = /[ \-'\u2019\u02BC\u00B7\.]/u;
  const parts = s.split(splitSep);
  for (const part of parts) {
    if (!/^[\p{L}\p{M}]+$/u.test(part)) return false;
  }

  return true;
}
