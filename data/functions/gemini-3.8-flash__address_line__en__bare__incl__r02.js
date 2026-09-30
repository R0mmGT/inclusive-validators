function validate(addressLine) {
  if (typeof addressLine !== 'string') {
    return false;
  }

  const trimmed = addressLine.trim();

  // A valid address line must have a reasonable length (2 to 255 characters)
  if (trimmed.length < 2 || trimmed.length > 255) {
    return false;
  }

  // Must not contain line breaks or control characters
  if (/[\u0000-\u001F\u007F-\u009F]/.test(trimmed)) {
    return false;
  }

  // Must contain at least one Unicode letter or number to accommodate:
  // - Descriptive/named addresses with no numbers (e.g., Costa Rica, Ireland)
  // - Numeric/hyphenated block formats with no letters (e.g., Japan, South Korea)
  // - Non-Latin scripts (Arabic, Cyrillic, CJK, Devanagari, Greek, Hebrew, etc.)
  if (!/[\p{L}\p{N}]/u.test(trimmed)) {
    return false;
  }

  return true;
}
