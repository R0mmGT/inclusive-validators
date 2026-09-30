function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Check length constraints (typical given name length between 1 and 50 characters)
  if (trimmed.length < 1 || trimmed.length > 50) {
    return false;
  }

  // Allows international letters/diacritics with optional spaces, hyphens, or apostrophes between letters
  const nameRegex = /^[\p{L}\p{M}]+(?:['’ -][\p{L}\p{M}]+)*$/u;

  return nameRegex.test(trimmed);
}
