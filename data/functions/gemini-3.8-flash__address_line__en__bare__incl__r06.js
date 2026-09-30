function validate(address) {
  if (typeof address !== 'string') {
    return false;
  }

  const trimmed = address.trim();

  // A single address line typically ranges between 2 and 150 characters
  if (trimmed.length < 2 || trimmed.length > 150) {
    return false;
  }

  // Reject newlines and unprintable/control characters
  if (/[\u0000-\u001F\u007F-\u009F]/.test(trimmed)) {
    return false;
  }

  // Must contain at least one Unicode letter or number (supports any language/culture)
  if (!/\p{L}|\p{N}/u.test(trimmed)) {
    return false;
  }

  return true;
}
