function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  // Enforce reasonable length boundaries for a given name
  if (name.length < 1 || name.length > 100) {
    return false;
  }

  // Disallow leading and trailing whitespace
  if (name.trim() !== name) {
    return false;
  }

  // Must contain at least one Unicode letter
  if (!/\p{L}/u.test(name)) {
    return false;
  }

  // Allow Unicode letters (\p{L}), combining marks (\p{M}), spaces,
  // hyphens/dashes, middle dots, and standard/modifier apostrophes
  const allowedChars = /^[\p{L}\p{M}'’ʼʻ\-‐–·・\s]+$/u;
  if (!allowedChars.test(name)) {
    return false;
  }

  // Cannot begin or end with a hyphen or dash
  if (/^[\-‐–]|[\-‐–]$/u.test(name)) {
    return false;
  }

  // Disallow repeated or adjacent separators (e.g., "--", " -", "- ")
  if (/[\s\-‐–]{2,}/u.test(name)) {
    return false;
  }

  return true;
}
