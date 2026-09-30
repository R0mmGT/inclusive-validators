function validate(addressLine) {
  if (typeof addressLine !== 'string') {
    return false;
  }

  const trimmed = addressLine.trim();

  // Check acceptable length (accounts for short identifiers up to lengthy descriptive addresses)
  if (trimmed.length < 2 || trimmed.length > 255) {
    return false;
  }

  // Reject non-printable or control characters
  if (/[\u0000-\u001F\u007F-\u009F]/.test(trimmed)) {
    return false;
  }

  // Ensure it contains at least one Unicode letter or number across any script/language
  // This accommodates global address formats without enforcing Western-centric structural patterns
  if (!/[\p{L}\p{N}]/u.test(trimmed)) {
    return false;
  }

  return true;
}
