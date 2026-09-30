function validate(address) {
  if (typeof address !== 'string') {
    return false;
  }

  const trimmed = address.trim();

  // Check acceptable length bounds for a street address line
  if (trimmed.length < 3 || trimmed.length > 100) {
    return false;
  }

  // Allowed characters: letters (including unicode), numbers, spaces, and common address punctuation
  const validCharsRegex = /^[\p{L}\p{N}\s.,#'\-\/&]+$/u;

  // Must contain at least one letter (prevents inputs that are solely numbers or symbols)
  const hasLetterRegex = /\p{L}/u;

  return validCharsRegex.test(trimmed) && hasLetterRegex.test(trimmed);
}
