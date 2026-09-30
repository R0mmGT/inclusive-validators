function validate(postalCode) {
  if (typeof postalCode !== 'string') {
    return false;
  }

  const trimmed = postalCode.trim();

  // Validates common international postal code formats:
  // - 3 to 10 characters long
  // - Starts and ends with an alphanumeric character
  // - Contains at least one digit
  // - Allows alphanumeric characters with optional single spaces or hyphens
  const postalCodeRegex = /^(?=.*\d)[a-zA-Z0-9](?!.*[ -]{2})[a-zA-Z0-9 -]{1,8}[a-zA-Z0-9]$/;

  return postalCodeRegex.test(trimmed);
}
