function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Allow names between 1 and 100 characters in length
  if (trimmed.length === 0 || trimmed.length > 100) {
    return false;
  }

  // Must contain at least one Unicode letter
  if (!/\p{L}/u.test(trimmed)) {
    return false;
  }

  // Allow Unicode letters (\p{L}), combining marks/accents (\p{M}),
  // spaces, hyphens, periods, and common apostrophe/modifier characters.
  const namePattern = /^[\p{L}\p{M}\s'\-\.\u2010-\u2015\u2018\u2019\u02BB\u02BC]+$/u;

  return namePattern.test(trimmed);
}
