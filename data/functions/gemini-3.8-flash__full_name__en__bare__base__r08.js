function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  // Matches at least two name parts separated by a single space.
  // Supports Unicode letters, hyphens, apostrophes, and optional periods (e.g., for initials or titles).
  const namePattern = /^[\p{L}]+(?:['\u2019\-][\p{L}]+)*\.?(?: [\p{L}]+(?:['\u2019\-][\p{L}]+)*\.?)+$/u;

  return namePattern.test(name.trim());
}
