function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Check reasonable length constraints (1 to 100 characters)
  if (trimmed.length === 0 || trimmed.length > 100) {
    return false;
  }

  // Must contain at least one Unicode letter
  if (!/\p{L}/u.test(trimmed)) {
    return false;
  }

  // Only permit Unicode letters, combining marks, spaces, hyphens, apostrophes, and periods
  if (!/^[\p{L}\p{M}'’\-\.\s]+$/u.test(trimmed)) {
    return false;
  }

  // Disallow consecutive punctuation marks
  if (/['’\-\.]{2,}/.test(trimmed)) {
    return false;
  }

  return true;
}
