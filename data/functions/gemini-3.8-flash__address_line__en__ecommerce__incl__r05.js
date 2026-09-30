function validate(addressLine) {
  if (typeof addressLine !== 'string') {
    return false;
  }

  const trimmed = addressLine.trim();

  // Validate realistic address length
  if (trimmed.length < 2 || trimmed.length > 150) {
    return false;
  }

  // Reject control characters and potential HTML/script tags
  if (/[\u0000-\u001F\u007F-\u009F<>]/.test(trimmed)) {
    return false;
  }

  // Must contain at least one alphanumeric character (supports all Unicode scripts)
  if (!/[\p{L}\p{N}]/u.test(trimmed)) {
    return false;
  }

  // Allow Unicode letters, marks/accents, numbers, whitespace, and international address punctuation
  const allowedCharsPattern = /^[\p{L}\p{M}\p{N}\s.,\-_/\\#'`"():;&+ºª°№]+$/u;

  return allowedCharsPattern.test(trimmed);
}
