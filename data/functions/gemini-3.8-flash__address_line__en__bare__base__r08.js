function validate(address) {
  if (typeof address !== 'string') {
    return false;
  }

  const trimmed = address.trim();

  // Basic length constraints for a street address line
  if (trimmed.length < 4 || trimmed.length > 100) {
    return false;
  }

  // Allow only alphanumeric characters, spaces, and common address punctuation (. , # - / ')
  const validCharsPattern = /^[a-zA-Z0-9\s.,'#\/-]+$/;
  if (!validCharsPattern.test(trimmed)) {
    return false;
  }

  // A valid street address line generally requires both letters (street/box name) and numbers (building/box/unit number)
  const hasLetter = /[a-zA-Z]/.test(trimmed);
  const hasDigit = /\d/.test(trimmed);

  return hasLetter && hasDigit;
}
