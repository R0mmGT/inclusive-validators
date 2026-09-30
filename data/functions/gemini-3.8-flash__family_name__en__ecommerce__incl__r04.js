function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Family names must be between 1 and 100 characters
  if (trimmed.length < 1 || trimmed.length > 100) {
    return false;
  }

  // Must contain at least one Unicode letter
  if (!/\p{L}/u.test(trimmed)) {
    return false;
  }

  // Allow only Unicode letters, combining marks (diacritics), spaces, hyphens, periods, and apostrophes
  if (!/^[\p{L}\p{M}\s.'’ʼ‘-]+$/u.test(trimmed)) {
    return false;
  }

  // Cannot begin or end with a hyphen
  if (trimmed.startsWith('-') || trimmed.endsWith('-')) {
    return false;
  }

  // Cannot begin with a period
  if (trimmed.startsWith('.')) {
    return false;
  }

  // Cannot contain consecutive identical punctuation or excessive whitespace
  if (/--|\.{2,}|['’ʼ‘]{2,}|\s{2,}/u.test(trimmed)) {
    return false;
  }

  return true;
}
