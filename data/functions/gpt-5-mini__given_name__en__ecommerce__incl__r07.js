function validate(name) {
  // Validate input type
  if (typeof name !== 'string') return false;

  // Trim surrounding whitespace
  name = name.trim();

  // Basic length limits (reasonable for a given name)
  if (name.length === 0 || name.length > 60) return false;

  // We'll allow letters from any Unicode script (\p{L}),
  // combining marks (\p{M}) that modify letters,
  // Unicode space separators (\p{Zs}) for multi-part given names,
  // Unicode dash characters (\p{Pd}) for hyphenated names,
  // common apostrophes (') and RIGHT SINGLE QUOTATION MARK (’),
  // middle dot (·) and period (.) which appear in some names.
  //
  // Disallowed: digits, most other punctuation, control characters, symbols.
  const allowedRe = /^[\p{L}\p{M}\p{Zs}\p{Pd}'\u2019\u00B7.]+$/u;
  if (!allowedRe.test(name)) return false;

  // Must contain at least one letter
  if (!(/\p{L}/u.test(name))) return false;

  // Must not start or end with a separator/punctuation that we permit inside names
  const edgeSepRe = /^[\p{Zs}\p{Pd}'\u2019\u00B7.]/u;
  const edgeSepEndRe = /[\p{Zs}\p{Pd}'\u2019\u00B7.]$/u;
  if (edgeSepRe.test(name) || edgeSepEndRe.test(name)) return false;

  // Must not start with a combining mark
  if (/^\p{M}/u.test(name)) return false;

  // Disallow consecutive separator/punctuation characters (like "--", "  ", "''", "..")
  if (/(?:[\p{Zs}\p{Pd}'\u2019\u00B7.]){2,}/u.test(name)) return false;

  // Passed all checks: likely a valid given name across cultures
  return true;
}
