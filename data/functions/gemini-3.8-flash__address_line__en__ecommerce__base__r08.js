function validate(address) {
  if (typeof address !== 'string') {
    return false;
  }

  const trimmed = address.trim();

  // Basic length constraints for a street address line
  if (trimmed.length < 3 || trimmed.length > 120) {
    return false;
  }

  // Must contain at least one letter (supports international characters)
  if (!/\p{L}/u.test(trimmed)) {
    return false;
  }

  // Must contain at least one alphanumeric character overall
  if (!/[\p{L}\p{N}]/u.test(trimmed)) {
    return false;
  }

  // Allow unicode letters, numbers, spaces, and common street address punctuation
  const allowedCharacters = /^[\p{L}\p{N}\s,.'#\-/&]+$/u;

  return allowedCharacters.test(trimmed);
}
