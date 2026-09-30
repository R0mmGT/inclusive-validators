function validate(name) {
  // Returns true if `name` looks like a reasonable given name from any culture.
  // - Accepts any Unicode letters (with marks), dashes, apostrophes, middle dots, periods and space separators.
  // - Requires the name to start with a letter and end with a letter or a period (to allow initials).
  // - Disallows digits and most other symbols.
  // - Disallows repeated identical separator characters (e.g. "--", "  ", "..", "''").
  // - Limits length to a sensible maximum (100 characters).
  if (typeof name !== 'string') return false;
  // Normalize and trim surrounding whitespace
  try { name = name.normalize('NFC'); } catch (e) { /* ignore if normalize not supported */ }
  name = name.trim();
  if (name.length === 0 || name.length > 100) return false;

  // Allowed separator characters:
  // \p{Pd}  : dash punctuation (hyphens, figure dash, etc.)
  // \p{Zs}  : space separators (space, NBSP, thin space, etc.)
  // ' . \u2018 \u2019 : ASCII apostrophe, period, left/right single quotes
  // \u00B7 : middle dot, \u30FB : katakana middle dot
  const re = /^(?=.{1,100}$)(?=.*\p{L})(?!.*([\p{Pd}\p{Zs}\.'\u2018\u2019\u00B7\u30FB])\1)\p{L}[\p{L}\p{M}\p{Pd}\p{Zs}\.'\u2018\u2019\u00B7\u30FB]*[\p{L}\.]$/u;

  return re.test(name);
}
