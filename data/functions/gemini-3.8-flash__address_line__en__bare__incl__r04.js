function validate(addressLine) {
  if (typeof addressLine !== 'string') {
    return false;
  }

  const trimmed = addressLine.trim();

  // Enforce realistic minimum and maximum lengths for a street address line
  if (trimmed.length < 2 || trimmed.length > 255) {
    return false;
  }

  // Reject unprintable and control characters (e.g., line breaks, null bytes)
  if (/[\u0000-\u001F\u007F-\u009F]/.test(trimmed)) {
    return false;
  }

  // Globally, address lines contain house numbers, street names, building/estate names,
  // or landmark descriptions in various scripts (Latin, Hanzi, Kanji, Arabic, Cyrillic, etc.).
  // Require at least two alphanumeric characters from any Unicode script.
  const alphanumericCount = (trimmed.match(/[\p{L}\p{N}]/gu) || []).length;
  if (alphanumericCount < 2) {
    return false;
  }

  return true;
}
