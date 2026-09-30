function validate(phone) {
  if (typeof phone !== 'string') return false;

  const trimmed = phone.trim();

  // Pattern allowing optional leading '+' and valid formatting with digits, spaces, hyphens, dots, and balanced parentheses
  const phoneRegex = /^(?:\+\d{1,3}[-.\s]*)?(?:\(\d{1,4}\)[-.\s]*|\d{1,4}[-.\s]*){1,4}\d{1,4}$/;

  if (!phoneRegex.test(trimmed)) {
    return false;
  }

  // Count total digits (E.164 standard recommends between 7 and 15 digits)
  const digits = trimmed.replace(/\D/g, '');
  return digits.length >= 7 && digits.length <= 15;
}
