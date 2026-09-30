function validate(phone) {
  if (typeof phone !== 'string') return false;

  const trimmed = phone.trim();
  const phoneRegex = /^\+?(?:\d{1,3}[-.\s]*)?(?:\(\d{1,4}\)|\d{1,4})[-.\s]*\d{1,4}(?:[-.\s]*\d{1,9})*$/;

  if (!phoneRegex.test(trimmed)) return false;

  const digits = trimmed.replace(/\D/g, '');
  return digits.length >= 7 && digits.length <= 15;
}
