function validate(addressLine) {
  if (typeof addressLine !== 'string') {
    return false;
  }

  const trimmed = addressLine.trim();

  // Basic length constraints: an address line needs at least 3 characters
  // and should not exceed reasonable database or courier limits (e.g., 150 chars).
  if (trimmed.length < 3 || trimmed.length > 150) {
    return false;
  }

  // Address lines must not contain newline, tab, or other control characters.
  if (/[\u0000-\u001F\u007F-\u009F]/.test(trimmed)) {
    return false;
  }

  // Must contain at least one letter in any writing system/script.
  // This filters out values consisting solely of numbers (such as an accidental
  // phone number or postal code) or punctuation/symbols.
  if (!/\p{L}/u.test(trimmed)) {
    return false;
  }

  // Must contain at least two alphanumeric characters in total (e.g., "Å 1", "Y 2", "10 St").
  const alphanumericMatches = trimmed.match(/[\p{L}\p{N}]/gu);
  if (!alphanumericMatches || alphanumericMatches.length < 2) {
    return false;
  }

  return true;
}
