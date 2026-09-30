function validate(postalCode) {
  if (typeof postalCode !== 'string') {
    return false;
  }

  const trimmed = postalCode.trim();

  // Postal codes universally require at least one digit
  if (!/\d/.test(trimmed)) {
    return false;
  }

  // Validates common international postal code formats:
  // - 3 to 10 alphanumeric characters (e.g., US ZIP '90210', international '100000')
  // - Two segments separated by a single space or hyphen (e.g., US ZIP+4 '12345-6789',
  //   UK 'SW1A 1AA', Canada 'K1A 0B1', Japan '100-0001')
  const postalCodeRegex = /^(?:[A-Za-z0-9]{3,10}|[A-Za-z0-9]{2,5}[- ][A-Za-z0-9]{2,5})$/;

  return postalCodeRegex.test(trimmed);
}
