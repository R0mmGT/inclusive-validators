function validate(address) {
  if (typeof address !== 'string') {
    return false;
  }

  const trimmed = address.trim();

  // Check reasonable address line length
  if (trimmed.length < 4 || trimmed.length > 100) {
    return false;
  }

  // Allow only alphanumeric characters, spaces, and common address punctuation
  const validChars = /^[a-zA-Z0-9\s,.'#/\\-]+$/;
  if (!validChars.test(trimmed)) {
    return false;
  }

  // Must contain at least one digit (street/building/box number)
  const hasDigit = /\d/;

  // Must contain a street or location name with at least two consecutive letters
  const hasStreetName = /[a-zA-Z]{2,}/;

  return hasDigit.test(trimmed) && hasStreetName.test(trimmed);
}
