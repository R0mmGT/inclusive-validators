function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Family names range from single letters (e.g., O, U, Li) to long compound names.
  if (trimmed.length < 1 || trimmed.length > 100) {
    return false;
  }

  // Must contain at least one Unicode letter (supports all alphabets and scripts worldwide).
  if (!/\p{L}/u.test(trimmed)) {
    return false;
  }

  // Allow only Unicode letters, combining marks (accents/diacritics), spaces,
  // hyphens, periods, and apostrophes (standard and typographic).
  if (!/^[\p{L}\p{M}\s'’.\-]+$/u.test(trimmed)) {
    return false;
  }

  // Prevent invalid sequences such as multiple consecutive hyphens or periods.
  if (/[-.]{2,}/u.test(trimmed)) {
    return false;
  }

  return true;
}
