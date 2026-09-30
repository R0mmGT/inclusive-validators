function validate(address) {
  if (typeof address !== 'string') {
    return false;
  }

  const trimmed = address.trim();

  // Check reasonable length constraints for an international address line
  if (trimmed.length < 2 || trimmed.length > 250) {
    return false;
  }

  // Reject unprintable and control characters
  if (/[\u0000-\u001F\u007F-\u009F]/.test(trimmed)) {
    return false;
  }

  // Must contain at least one Unicode letter or number to accommodate
  // all global naming conventions, writing systems, and house/street formats
  return /[\p{L}\p{N}]/u.test(trimmed);
}
