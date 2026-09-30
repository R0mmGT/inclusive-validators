function validate(address) {
  if (typeof address !== 'string') {
    return false;
  }

  const trimmed = address.trim();

  // Basic length constraints for an address line
  if (trimmed.length < 3 || trimmed.length > 100) {
    return false;
  }

  // A complete street address line typically requires both text (street name) and digits (house/unit number)
  const hasLetter = /\p{L}/u.test(trimmed);
  const hasNumber = /\p{N}/u.test(trimmed);

  if (!hasLetter || !hasNumber) {
    return false;
  }

  // Allow only letters, numbers, spaces, and common address punctuation (., / - ' #)
  const validAddressRegex = /^[\p{L}\p{N}\s.,#'\/\-]+$/u;

  return validAddressRegex.test(trimmed);
}
