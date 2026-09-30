function validate(name) {
  if (typeof name !== 'string') return false;
  name = name.trim();
  // reasonable length limits (in Unicode code points)
  const len = [...name].length;
  if (len < 1 || len > 100) return false;

  // must contain at least one letter from any script
  if (!/\p{L}/u.test(name)) return false;

  // Allowed characters:
  // - Unicode letters (\p{L}) and combining marks (\p{M})
  // - whitespace (\s)
  // - common name punctuation: ASCII apostrophe, right single quote and modifier letter apostrophe,
  //   hyphen/minus, en-dash, em-dash, period, middle dot
  const allowed = /^[\p{L}\p{M}\s'’\u02BC\-\u2013\u2014\.\u00B7]+$/u;
  if (!allowed.test(name)) return false;

  // disallow consecutive separators (spaces or the punctuation allowed above)
  const consecutiveSeparators = /[ \t'’\u02BC\-\u2013\u2014\.\u00B7]{2,}/u;
  if (consecutiveSeparators.test(name)) return false;

  // must start with a letter
  if (!/^\p{L}/u.test(name)) return false;
  // must end with a letter, a combining mark, or a period (to allow initials, e.g. "Jr.")
  if (!/[\p{L}\p{M}\.]$/u.test(name)) return false;

  // Validate each space-separated token more strictly
  const tokens = name.split(/\s+/);
  for (const token of tokens) {
    // single-letter initial like "A."
    if (/^\p{L}\.$/u.test(token)) continue;

    // normal token: start with a letter, end with a letter or combining mark or period,
    // and contain only allowed internal characters (letters, marks, apostrophes, hyphens, periods, middle dot)
    if (!/^\p{L}[\p{L}\p{M}'’\u02BC\-\u2013\u2014\.\u00B7]*[\p{L}\p{M}\.]$/u.test(token)) {
      return false;
    }

    // no token should start or end with hyphen or apostrophe (those are handled above but double-check)
    if (/^[\-'\u02BC'’\u2019]/u.test(token) || /[\-'\u02BC'’\u2019]$/u.test(token)) {
      return false;
    }

    // no consecutive internal punctuation in a token
    if (/[\'’\u02BC\-\u2013\u2014\.\u00B7]{2,}/u.test(token)) {
      return false;
    }
  }

  return true;
}
