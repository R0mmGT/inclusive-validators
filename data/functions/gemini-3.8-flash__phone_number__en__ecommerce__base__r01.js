function validate(phoneNumber) {
  if (typeof phoneNumber !== 'string') {
    return false;
  }

  const trimmed = phoneNumber.trim();

  // Validate formatting: allows optional leading '+', digits, and standard separators (spaces, dashes, dots, parentheses)
  const phonePattern = /^\+?(?:[0-9]{1,4}[\s.-]*)?(?:\([0-9]{1,4}\)[\s.-]*)?(?:[0-9]{1,4}[\s.-]*)*[0-9]{1,4}$/;

  if (!phonePattern.test(trimmed)) {
    return false;
  }

  // Ensure total number of digits adheres to international standards (E.164: 7 to 15 digits)
  const digits = trimmed.replace(/\D/g, '');
  return digits.length >= 7 && digits.length <= 15;
}
