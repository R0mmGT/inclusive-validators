function validate(code) {
  if (typeof code !== 'string') {
    return false;
  }

  const trimmed = code.trim();

  // Postal codes globally range between 3 and 12 characters.
  // They consist of alphanumeric characters, occasionally separated by a single space or hyphen,
  // and must start and end with an alphanumeric character.
  if (trimmed.length < 3 || trimmed.length > 12) {
    return false;
  }

  const postalCodeRegex = /^[a-zA-Z0-9](?!.*[ -]{2})[a-zA-Z0-9 -]*[a-zA-Z0-9]$/;

  return postalCodeRegex.test(trimmed);
}
