function validate(address) {
  if (typeof address !== 'string') {
    return false;
  }

  const trimmed = address.trim();

  // An address line must have a reasonable length (e.g., 2 to 150 characters)
  if (trimmed.length < 2 || trimmed.length > 150) {
    return false;
  }

  // Disallow control characters and newlines within a single address line
  if (/[\u0000-\u001F\u007F-\u009F]/.test(trimmed)) {
    return false;
  }

  // Must contain at least one letter or number from any Unicode script
  // (supports Latin, Cyrillic, Arabic, CJK, Devanagari, etc., while rejecting strings of only symbols/punctuation)
  if (!/[\p{L}\p{N}]/u.test(trimmed)) {
    return false;
  }

  return true;
}
