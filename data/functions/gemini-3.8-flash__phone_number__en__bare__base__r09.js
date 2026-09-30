function validate(phoneNumber) {
  if (typeof phoneNumber !== 'string') {
    return false;
  }

  const trimmed = phoneNumber.trim();
  // Validates standard international and national phone formats (with optional country code, parentheses, hyphens, spaces, dots)
  const phoneRegex = /^(?:\+?[1-9]\d{0,2}[\s.-]?)?(?:\(\d{1,4}\)|\d{1,4})[\s.-]?\d{1,4}[\s.-]?\d{1,9}$/;
  const digits = trimmed.replace(/\D/g, '');

  return phoneRegex.test(trimmed) && digits.length >= 7 && digits.length <= 15;
}
