function validate(address) {
  if (typeof address !== 'string') {
    return false;
  }

  const trimmed = address.trim();

  // Basic length constraints for a reasonable street address line
  if (trimmed.length < 3 || trimmed.length > 120) {
    return false;
  }

  // Allowed characters: letters, numbers, spaces, and common address punctuation (., - ' # / &)
  const validCharsRegex = /^[\p{L}\p{N}\s.,'#/\\&-]+$/u;
  if (!validCharsRegex.test(trimmed)) {
    return false;
  }

  // A valid street address line typically requires at least one letter (street name, PO Box, etc.)
  // and at least one number (building number, unit, PO Box number, etc.)
  const hasLetter = /\p{L}/u.test(trimmed);
  const hasNumber = /\p{N}/u.test(trimmed);

  return hasLetter && hasNumber;
}
