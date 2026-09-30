function validate(phoneNumber) {
  if (typeof phoneNumber !== 'string') {
    return false;
  }

  const trimmed = phoneNumber.trim();

  // Matches common international and national formats:
  // - Optional leading '+' followed by country code
  // - Optional area code in parentheses or separated by spaces/hyphens/dots
  // - Valid groupings of digits with standard separators
  const phoneRegex = /^\+?(?:[0-9]{1,4}[-.\s]?)?(?:\([0-9]{1,4}\)[-.\s]?|[0-9]{1,4}[-.\s]?)[0-9]{1,4}[-.\s]?[0-9]{1,9}$/;

  // Check digit count according to ITU-T E.164 standards (between 7 and 15 digits)
  const digits = trimmed.replace(/\D/g, '');

  return phoneRegex.test(trimmed) && digits.length >= 7 && digits.length <= 15;
}
