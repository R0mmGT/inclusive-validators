function validate(phoneNumber) {
  if (typeof phoneNumber !== 'string') {
    return false;
  }

  const trimmed = phoneNumber.trim();

  // Validates common formats: optional leading '+', optional area code in parentheses, 
  // separated by spaces, dots, or hyphens, and ending with digits.
  const phoneRegex = /^\+?(?:[0-9]{1,4}[-.\s]?)?(?:\([0-9]{1,4}\)[-.\s]?)?[0-9]{1,4}(?:[-.\s]?[0-9]{1,4}){1,6}$/;

  if (!phoneRegex.test(trimmed)) {
    return false;
  }

  // Ensures total digit count complies with international E.164 standards (7–15 digits)
  const digitsOnly = trimmed.replace(/\D/g, '');
  return digitsOnly.length >= 7 && digitsOnly.length <= 15;
}
