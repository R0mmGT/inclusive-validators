function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();
  if (trimmed.length < 3 || trimmed.length > 100) {
    return false;
  }

  // A full name must consist of at least two parts separated by whitespace.
  const parts = trimmed.split(/\s+/);
  if (parts.length < 2) {
    return false;
  }

  // Each part must consist of Unicode letters, optionally containing hyphens/apostrophes,
  // and may end with an optional period (e.g., for initials or titles).
  const namePartRegex = /^[\p{L}]+(?:['’\-][\p{L}]+)*\.?$/u;

  return parts.every(part => namePartRegex.test(part));
}
