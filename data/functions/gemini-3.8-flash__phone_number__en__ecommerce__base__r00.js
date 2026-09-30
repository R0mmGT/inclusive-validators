function validate(phone) {
  if (typeof phone !== 'string') {
    return false;
  }

  const trimmed = phone.trim();

  // Validates standard international and domestic formats:
  // - Optional leading '+'
  // - Optional balanced parentheses for area code
  // - Common separators: space, dot, hyphen
  const phoneRegex = /^(?:\+?\d{1,3}[-.\s]?)?(?:\(\d{1,4}\)|\d{1,4})?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;

  if (!phoneRegex.test(trimmed)) {
    return false;
  }

  // Ensures digit count adheres to ITU E.164 standards (between 7 and 15 digits)
  const digits = trimmed.replace(/\D/g, '');
  return digits.length >= 7 && digits.length <= 15;
}
