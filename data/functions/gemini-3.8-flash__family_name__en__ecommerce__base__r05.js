function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  // Check overall length and ensure there are no leading or trailing whitespaces
  if (name.length < 1 || name.length > 100 || name !== name.trim()) {
    return false;
  }

  // Disallow repetitive punctuation or spaces (e.g., '--', "''", '..', '  ')
  if (/[-'’]{2,}|\.{2,}|\s{2,}/u.test(name)) {
    return false;
  }

  // Allows international letters, accents/marks, apostrophes, hyphens, spaces, and periods.
  // Must start and end with a letter (single-letter names are permitted).
  const lastNameRegex = /^[\p{L}\p{M}](?:[\p{L}\p{M}'’\s.-]*[\p{L}\p{M}])?$/u;

  return lastNameRegex.test(name);
}
