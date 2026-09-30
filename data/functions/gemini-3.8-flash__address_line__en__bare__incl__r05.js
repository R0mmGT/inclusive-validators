function validate(addressLine) {
  if (typeof addressLine !== 'string') {
    return false;
  }

  const trimmed = addressLine.trim();

  // Address lines must be of a reasonable length
  if (trimmed.length < 2 || trimmed.length > 255) {
    return false;
  }

  // Must not contain unprintable control characters
  if (/[\u0000-\u001F\u007F-\u009F]/.test(trimmed)) {
    return false;
  }

  // Must contain at least one Unicode letter or number to support all writing systems
  if (!/[\p{L}\p{N}]/u.test(trimmed)) {
    return false;
  }

  return true;
}
