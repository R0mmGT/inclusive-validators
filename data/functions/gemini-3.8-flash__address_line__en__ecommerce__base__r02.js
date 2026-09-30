function validate(address) {
  if (typeof address !== 'string') {
    return false;
  }

  const trimmed = address.trim();

  // Basic length validation (most street addresses fall between 3 and 100 characters)
  if (trimmed.length < 3 || trimmed.length > 100) {
    return false;
  }

  // Allow only letters, numbers, spaces, and standard address punctuation (. , # ' - /)
  const allowedCharacters = /^[\p{L}\p{N}\s.,#'\-/]+$/u;
  if (!allowedCharacters.test(trimmed)) {
    return false;
  }

  // Must contain at least one letter
  const hasLetter = /\p{L}/u.test(trimmed);
  if (!hasLetter) {
    return false;
  }

  // Must contain at least one number OR multiple words (to support named buildings/properties)
  const hasNumber = /\p{N}/u.test(trimmed);
  const hasMultipleWords = trimmed.split(/\s+/).length >= 2;

  return hasNumber || hasMultipleWords;
}
