function validate(addressLine) {
  if (typeof addressLine !== 'string') {
    return false;
  }

  const trimmed = addressLine.trim();

  // Address lines globally range from very short (e.g., in CJK characters) to long descriptive lines
  if (trimmed.length < 2 || trimmed.length > 150) {
    return false;
  }

  // Disallow non-printable ASCII control characters
  if (/[\u0000-\u001F\u007F]/.test(trimmed)) {
    return false;
  }

  // Must contain at least one Unicode letter or numeric digit to exclude pure punctuation/symbols
  if (!/[\p{L}\p{N}]/u.test(trimmed)) {
    return false;
  }

  return true;
}
