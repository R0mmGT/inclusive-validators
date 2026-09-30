function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  // Check length constraint (typically 1 to 100 characters)
  if (name.length < 1 || name.length > 100) {
    return false;
  }

  // Matches Unicode letters, allowing interior hyphens, apostrophes, and spaces.
  // Must start and end with a letter.
  const lastNameRegex = /^[\p{L}]+(?:['’\s-][\p{L}]+)*$/u;

  return lastNameRegex.test(name);
}
