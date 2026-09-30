function validate(address) {
  if (typeof address !== 'string') {
    return false;
  }

  const trimmed = address.trim();

  // Validate length (must be between 3 and 100 characters)
  if (trimmed.length < 3 || trimmed.length > 100) {
    return false;
  }

  // Must contain at least one letter (for the street/building name)
  if (!/\p{L}/u.test(trimmed)) {
    return false;
  }

  // Must consist of international letters, numbers, spaces, and standard address punctuation
  const addressRegex = /^[\p{L}\p{N}\s.,\/'#\-ºª&()]+$/u;

  return addressRegex.test(trimmed);
}
