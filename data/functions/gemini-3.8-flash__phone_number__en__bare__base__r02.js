function validate(phoneNumber) {
  if (typeof phoneNumber !== 'string') return false;

  const trimmed = phoneNumber.trim();
  // Validates common formats (e.g., E.164, national/international with spaces, dashes, dots, or balanced parentheses)
  const phoneRegex = /^\+?(?:\d{1,3}[-.\s]?)?(?:\(\d{1,4}\)|\d{1,4})[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
  const digits = trimmed.replace(/\D/g, '');

  return digits.length >= 7 && digits.length <= 15 && phoneRegex.test(trimmed);
}
