function validate(phoneNumber) {
  if (typeof phoneNumber !== 'string') {
    return false;
  }

  const trimmed = phoneNumber.trim();
  // Matches common phone number formats (with optional country code, spaces, dashes, dots, and parentheses)
  const phoneRegex = /^\+?(?:(?:\(\d{1,4}\)|\d{1,4})[-.\s]?){1,5}\d{1,4}$/;
  const digits = trimmed.replace(/\D/g, '');

  // Validates structure and ensures total digit count conforms to ITU-T standards (7 to 15 digits)
  return phoneRegex.test(trimmed) && digits.length >= 7 && digits.length <= 15;
}
