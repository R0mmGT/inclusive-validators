function validate(name) {
  if (typeof name !== 'string' || name.length < 1 || name.length > 100) {
    return false;
  }

  // Matches names using Unicode letters, permitting single spaces, hyphens, or apostrophes between letters
  const lastNameRegex = /^[\p{L}]+(?:['’\- ][\p{L}]+)*$/u;

  return lastNameRegex.test(name);
}
