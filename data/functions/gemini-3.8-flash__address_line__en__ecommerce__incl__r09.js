function validate(address) {
  if (typeof address !== 'string') {
    return false;
  }

  const trimmed = address.trim();

  // Check length: addresses globally range from short descriptive names to detailed lines.
  if (trimmed.length < 2 || trimmed.length > 255) {
    return false;
  }

  // Reject unprintable control characters (ASCII & Latin-1 control codes)
  if (/[\u0000-\u001F\u007F-\u009F]/.test(trimmed)) {
    return false;
  }

  // Ensure the address contains at least two alphanumeric characters from any script
  // (using Unicode property escapes for letters \p{L} and numbers \p{N})
  const alphanumericCount = (trimmed.match(/[\p{L}\p{N}]/gu) || []).length;
  if (alphanumericCount < 2) {
    return false;
  }

  return true;
}
