function validate(phoneNumber) {
  if (typeof phoneNumber !== 'string') {
    return false;
  }

  const trimmed = phoneNumber.trim();

  // Pattern allows an optional leading '+', followed by properly paired parentheses,
  // digits, spaces, hyphens, and dots.
  const phonePattern = /^\+?(?:(?:\(\d{1,4}\)|\d{1,4})[\s.-]?)*\d{1,4}$/;

  if (!phonePattern.test(trimmed)) {
    return false;
  }

  // Count total digits (international standard E.164 allows between 7 and 15 digits)
  const digits = trimmed.replace(/\D/g, '');
  return digits.length >= 7 && digits.length <= 15;
}
