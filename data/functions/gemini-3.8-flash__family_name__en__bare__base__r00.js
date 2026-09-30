function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Typical family name lengths range from 1 to 100 characters
  if (trimmed.length < 1 || trimmed.length > 100) {
    return false;
  }

  // Must contain at least one Unicode letter
  if (!/\p{L}/u.test(trimmed)) {
    return false;
  }

  // Allow letters, diacritics/accents (\p{M}), spaces, hyphens, apostrophes, and periods
  // Reject consecutive hyphens, apostrophes, or spaces
  const validPattern = /^[\p{L}\p{M}]+(?:['’\-.\s][\p{L}\p{M}]+)*['’]?$/u;

  // Also support names starting with an apostrophe (e.g., 't Hooft)
  const leadingApostrophePattern = /^['’][\p{L}\p{M}]+(?:['’\-.\s][\p{L}\p{M}]+)*['’]?$/u;

  return validPattern.test(trimmed) || leadingApostrophePattern.test(trimmed);
}
