function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  // Check reasonable length constraints (1 to 100 characters)
  if (name.length < 1 || name.length > 100) {
    return false;
  }

  // Matches names using Unicode letters (\p{L}) and combining marks (\p{M}).
  // Allows single spaces, hyphens, and apostrophes between letter segments.
  const lastNameRegex = /^[\p{L}\p{M}]+(?:['’ -][\p{L}\p{M}]+)*$/u;

  return lastNameRegex.test(name);
}
