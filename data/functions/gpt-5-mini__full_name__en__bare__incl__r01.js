function validate(name) {
  // Accept only strings
  if (typeof name !== 'string') return false;

  // Normalize and quick length checks
  name = name.trim();
  if (name.length === 0 || name.length > 200) return false;

  // Allowed characters:
  // - Letters (\p{L}) and combining marks (\p{M})
  // - Space separators (\p{Zs})
  // - Common name punctuation: ASCII apostrophe ('), right single quotation mark (’),
  //   various dashes/hyphens, middle dot (·) and dot (.) for initials/abbreviations.
  // This allows names in any script while excluding digits and most symbols.
  const allowed = /^[\p{L}\p{M}\p{Zs}'\u2019\-\u2013\u2014\u2010\u00B7.]+$/u;
  if (!allowed.test(name)) return false;

  // Must start with a letter and end with a letter or a dot (to allow e.g. "Jr.")
  if (!(/^[\p{L}].*[\p{L}.]$/u.test(name))) return false;

  // Disallow multiple adjacent space separators
  if (/\p{Zs}{2,}/u.test(name)) return false;

  // Disallow consecutive punctuation characters from the set (apostrophes, dashes, middle dot, dot)
  if (/(?:['\u2019\-\u2013\u2014\u2010\u00B7.]){2,}/u.test(name)) return false;

  // Validate each space-separated token (a token is a contiguous run of space separators)
  const tokens = name.split(/\p{Zs}+/u);
  for (const token of tokens) {
    // Each token must contain at least one letter
    if (!/\p{L}/u.test(token)) return false;

    // Tokens must not start or end with apostrophes, dashes, middle dot (but may end with a dot)
    if (/^[\'\u2019\-\u2013\u2014\u2010\u00B7]/u.test(token)) return false;
    if (/[\'\u2019\-\u2013\u2014\u2010\u00B7]$/u.test(token)) return false;

    // Token must not start with a dot, and must not contain consecutive dots
    if (/^\./.test(token) || /\.\./.test(token)) return false;

    // A token of a single dot is invalid
    if (token === '.') return false;

    // Prevent tokens that are only punctuation (e.g. "---" or "''") - already covered,
    // but ensure token has at least one letter or a letter+dot initial
    if (!/[\p{L}]/u.test(token)) return false;
  }

  // If all checks pass, consider the input a plausible full name across cultures.
  return true;
}
