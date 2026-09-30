function validate(address) {
  if (typeof address !== 'string') {
    return false;
  }

  const trimmed = address.trim();

  // Validate general reasonable length for international street addresses
  if (trimmed.length < 2 || trimmed.length > 200) {
    return false;
  }

  // Reject strings containing control characters
  if (/[\u0000-\u001F\u007F-\u009F]/.test(trimmed)) {
    return false;
  }

  // Reject potential HTML tags or URLs (common spam inputs)
  if (/<[^>]+>|https?:\/\//i.test(trimmed)) {
    return false;
  }

  // Must contain at least two alphanumeric characters from any script/language
  // to avoid inputs that are purely punctuation or whitespace
  const alphanumericCount = (trimmed.match(/[\p{L}\p{N}]/gu) || []).length;
  if (alphanumericCount < 2) {
    return false;
  }

  return true;
}
