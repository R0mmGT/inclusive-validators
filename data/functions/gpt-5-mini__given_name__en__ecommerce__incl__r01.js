function validate(name) {
  // Accept only strings
  if (typeof name !== 'string') return false;

  // Normalize and trim invisible edges
  name = name.normalize('NFC').trim();
  if (name.length === 0) return false;

  // Count Unicode code points to limit ridiculously long inputs
  const codePoints = [...name].length;
  if (codePoints > 100) return false;

  // Rules:
  // - Must start with a letter (\p{L})
  // - May contain letters (\p{L}), combining marks (\p{M}), space separators (\p{Zs}),
  //   a few punctuation commonly used in names (hyphen, period, middle dot, a set of apostrophes)
  // - Must end with a letter or combining mark
  // - Disallow runs of more than one separator/punctuation in a row
  // The regex uses Unicode property escapes; the 'u' flag is required.
  const allowed = /^\p{L}[\p{L}\p{M}\p{Zs}\-\. \u00B7\u0027\u2019\u2018\u02BC\u02BB]*[\p{L}\p{M}]$/u;
  if (!allowed.test(name)) return false;

  // Disallow consecutive separators/punctuation (two or more in a row)
  const consecutiveSeparators = /[\p{Zs}\-\. \u00B7\u0027\u2019\u2018\u02BC\u02BB]{2,}/u;
  if (consecutiveSeparators.test(name)) return false;

  // Disallow names consisting only of a single punctuation-like character (already covered),
  // ensure there's at least one letter (start anchor enforces this, but double-check)
  if (!/\p{L}/u.test(name)) return false;

  return true;
}
