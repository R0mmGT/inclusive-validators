function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Validate length: must not be empty and must be within a reasonable limit
  if (trimmed.length === 0 || trimmed.length > 100) {
    return false;
  }

  // Must contain at least one Unicode letter across any script
  if (!/\p{L}/u.test(trimmed)) {
    return false;
  }

  // Allows:
  // - Unicode letters (\p{L}) and combining marks/diacritics (\p{M}) for international scripts
  // - Common name punctuation: spaces, hyphens, periods (for initials/abbreviations), and apostrophes
  // Ensures strings start with a letter, mark, or apostrophe, and end with a letter, mark, or period.
  const namePattern = /^['\p{L}\p{M}](?:[\p{L}\p{M}\s\-'’.]{0,98}[\p{L}\p{M}.])?$/u;

  return namePattern.test(trimmed);
}
