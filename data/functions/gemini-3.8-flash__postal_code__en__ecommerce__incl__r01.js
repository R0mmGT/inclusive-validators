function validate(postalCode) {
  if (typeof postalCode !== 'string') {
    return false;
  }

  const trimmed = postalCode.trim();

  // Postal codes worldwide consist of 2 to 12 alphanumeric characters,
  // occasionally separated by standard spaces or hyphens.
  // Supports Unicode letters and digits for international systems.
  const postalCodeRegex = /^[\p{L}\p{N}][\p{L}\p{N}\s-]{0,10}[\p{L}\p{N}]$/u;

  if (!postalCodeRegex.test(trimmed)) {
    return false;
  }

  // Reject invalid patterns such as consecutive separators (e.g., "--" or "  ")
  if (/[\s-]{2,}/.test(trimmed)) {
    return false;
  }

  return true;
}
