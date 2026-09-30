function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Ensure reasonable length (at least 1 character, capped at 100)
  if (trimmed.length === 0 || trimmed.length > 100) {
    return false;
  }

  // Must contain at least one Unicode letter
  if (!/\p{L}/u.test(trimmed)) {
    return false;
  }

  // Allow only Unicode letters, combining marks/diacritics, spaces, hyphens, apostrophes, and periods
  if (!/^[\p{L}\p{M}\s'\-–—.’]+$/u.test(trimmed)) {
    return false;
  }

  // Must not start or end with a hyphen, dash, or period
  if (/^[\-–—.]|[\-–—.]$/u.test(trimmed)) {
    return false;
  }

  // Must not contain consecutive hyphens, dashes, or periods
  if (/[\-–—.]{2,}/u.test(trimmed)) {
    return false;
  }

  return true;
}
