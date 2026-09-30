function validate(address) {
  if (typeof address !== 'string') {
    return false;
  }

  const trimmed = address.trim();

  // Basic length bounds for a valid street address line
  if (trimmed.length < 3 || trimmed.length > 100) {
    return false;
  }

  // Must only contain letters, numbers, spaces, and common address punctuation
  const allowedChars = /^[\p{L}\p{N}\s,.'\-/#&]+$/u;
  if (!allowedChars.test(trimmed)) {
    return false;
  }

  // Must contain at least one digit (building, house, or PO Box number)
  const hasDigit = /\p{N}/u.test(trimmed);

  // Must contain at least two letters (street name/type)
  const letters = trimmed.match(/\p{L}/gu);
  const hasLetters = letters !== null && letters.length >= 2;

  return hasDigit && hasLetters;
}
