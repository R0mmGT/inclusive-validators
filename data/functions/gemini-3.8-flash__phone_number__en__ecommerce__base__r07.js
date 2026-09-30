function validate(phoneNumber) {
  if (typeof phoneNumber !== 'string') {
    return false;
  }

  const trimmed = phoneNumber.trim();

  // Validates structure: allows optional leading '+', digits, and common separators
  // (spaces, hyphens, dots, and correctly matched parentheses for area codes).
  const phoneRegex = /^\+?(?:(?:\(\d{1,4}\)|\d{1,4})[-.\s]*){1,5}\d{1,4}$/;

  if (!phoneRegex.test(trimmed)) {
    return false;
  }

  // Ensures digit count adheres to international telecommunication standards (ITU E.164: 7–15 digits)
  const digits = trimmed.replace(/\D/g, '');
  return digits.length >= 7 && digits.length <= 15;
}
