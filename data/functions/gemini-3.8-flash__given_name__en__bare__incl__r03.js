function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  // Reject empty strings, overly long inputs, and leading/trailing whitespace
  if (name.length === 0 || name.length > 100 || name.trim() !== name) {
    return false;
  }

  // Must contain at least one Unicode letter
  if (!/\p{L}/u.test(name)) {
    return false;
  }

  // Cannot begin or end with a hyphen or dash
  if (/^[-–—]|[-–—]$/u.test(name)) {
    return false;
  }

  // Disallow repeated consecutive separators (e.g., "--", "  ", "''")
  if (/[\s'’ʼʻ\-–—·・.]{2,}/u.test(name)) {
    return false;
  }

  // Must only contain letters, combining marks, spaces, hyphens, apostrophes, and middle dots
  return /^[\p{L}\p{M}'’ʼʻ\-–—\s·・.]+$/u.test(name);
}
