function validate(phoneNumber) {
  if (typeof phoneNumber !== 'string') return false;

  const trimmed = phoneNumber.trim();

  // Pattern supporting standard international and local formats:
  // - Optional leading '+'
  // - Optional country/area code in parentheses or separated by space/dash/dot
  // - Separators: spaces, hyphens, dots
  const phoneRegex = /^\+?(?:[0-9]{1,4}[ -.]?)?(?:\([0-9]{1,4}\)[ -.]?|[0-9]{1,4}[ -.]?)[0-9]{1,4}[ -.]?[0-9]{1,9}$/;

  // Check digit count according to E.164 standards (minimum 7, maximum 15 digits)
  const digits = trimmed.replace(/\D/g, '');

  return phoneRegex.test(trimmed) && digits.length >= 7 && digits.length <= 15;
}
