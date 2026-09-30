function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Validate length (between 1 and 50 characters)
  if (trimmed.length < 1 || trimmed.length > 50) {
    return false;
  }

  // Allows international letters, hyphens, apostrophes, and spaces.
  // Must start and end with a letter, without consecutive special characters.
  const nameRegex = /^\p{L}+(?:['’\- ][\p{L}]+)*$/u;

  return nameRegex.test(trimmed);
}
