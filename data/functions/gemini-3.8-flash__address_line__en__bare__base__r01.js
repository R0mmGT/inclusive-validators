function validate(address) {
  if (typeof address !== 'string') {
    return false;
  }

  const trimmed = address.trim();

  // Basic length constraints for an address line
  if (trimmed.length < 3 || trimmed.length > 120) {
    return false;
  }

  // Allow letters, numbers, spaces, and standard address punctuation (. , - ' # /)
  const validCharsRegex = /^[\p{L}\p{N}\s.,'#/\\-]+$/u;
  if (!validCharsRegex.test(trimmed)) {
    return false;
  }

  // A valid street address line generally requires at least one letter and at least one digit
  const hasLetter = /\p{L}/u.test(trimmed);
  const hasDigit = /\p{N}/u.test(trimmed);

  return hasLetter && hasDigit;
}
