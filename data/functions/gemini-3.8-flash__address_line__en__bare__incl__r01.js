function validate(addressLine) {
  if (typeof addressLine !== 'string') {
    return false;
  }

  const trimmed = addressLine.trim();

  // A single address line generally needs to be between 2 and 255 characters
  if (trimmed.length < 2 || trimmed.length > 255) {
    return false;
  }

  // Reject control characters (including line breaks, since it is a single address line)
  if (/[\u0000-\u001F\u007F-\u009F]/.test(trimmed)) {
    return false;
  }

  // Must contain at least one letter or number from any language/script (Unicode-aware)
  // Accommodates non-Latin scripts (e.g., CJK, Arabic, Cyrillic, Devanagari) as well as
  // descriptive addresses, named estates, or standard number-and-street formats.
  if (!/[\p{L}\p{N}]/u.test(trimmed)) {
    return false;
  }

  return true;
}
