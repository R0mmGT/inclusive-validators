function validate(postalCode) {
  if (typeof postalCode !== 'string') {
    return false;
  }

  const trimmed = postalCode.trim();

  // Ensure overall length is reasonable for international formats
  if (trimmed.length < 2 || trimmed.length > 14) {
    return false;
  }

  // Must start and end with an alphanumeric character,
  // allowing only alphanumeric characters with single internal spaces or hyphens
  if (!/^[A-Za-z0-9](?:[A-Za-z0-9]|[-\s][A-Za-z0-9])*$/.test(trimmed)) {
    return false;
  }

  // Extract raw alphanumeric characters
  const alphanumeric = trimmed.replace(/[-\s]/g, '');

  // International postal codes range from 2 to 10 alphanumeric characters
  // and universally contain at least one digit (to distinguish from city/state names)
  return alphanumeric.length >= 2 && 
         alphanumeric.length <= 10 && 
         /\d/.test(alphanumeric);
}
