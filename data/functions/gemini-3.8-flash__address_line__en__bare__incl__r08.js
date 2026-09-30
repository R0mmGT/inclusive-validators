function validate(addressLine) {
  if (typeof addressLine !== 'string') {
    return false;
  }

  const trimmed = addressLine.trim();

  // Enforce reasonable length constraints for an international address line
  if (trimmed.length < 2 || trimmed.length > 255) {
    return false;
  }

  // Reject strings containing control characters or common code/markup delimiters
  if (/[\u0000-\u001F\u007F-\u009F<>{}\\]/.test(trimmed)) {
    return false;
  }

  // Must contain at least two alphanumeric characters (supports any Unicode script/language)
  const alphanumericCount = (trimmed.match(/[\p{L}\p{N}]/gu) || []).length;
  if (alphanumericCount < 2) {
    return false;
  }

  return true;
}
