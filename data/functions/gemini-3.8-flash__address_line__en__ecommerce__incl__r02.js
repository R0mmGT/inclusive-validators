function validate(address) {
  if (typeof address !== 'string') {
    return false;
  }

  const trimmed = address.trim();

  // Basic length boundary: addresses globally range from short (e.g., "Q 2") to descriptive
  if (trimmed.length < 2 || trimmed.length > 255) {
    return false;
  }

  // Reject control characters and potential HTML/script injection characters
  if (/[\x00-\x1F\x7F<>]/.test(trimmed)) {
    return false;
  }

  // Must contain at least two alphanumeric characters across any language/script
  // to avoid inputs consisting solely of punctuation, symbols, or single characters
  const alphanumericCount = (trimmed.match(/[\p{L}\p{N}]/gu) || []).length;
  if (alphanumericCount < 2) {
    return false;
  }

  // Allow Unicode letters (\p{L}), marks/accents (\p{M}), numbers (\p{N}),
  // punctuation (\p{P}), horizontal spaces (\p{Zs}), and '+' (for Plus Codes)
  const validAddressPattern = /^[\p{L}\p{M}\p{N}\p{P}\p{Zs}+]+$/u;

  return validAddressPattern.test(trimmed);
}
