function validate(phone) {
  if (typeof phone !== 'string') return false;

  const trimmed = phone.trim();
  const digits = trimmed.replace(/\D/g, '');

  if (digits.length < 7 || digits.length > 15) {
    return false;
  }

  const phoneRegex = /^(?:\+?\d{1,3}[-.\s]?)?(?:\(\d{1,4}\)|\d{1,4})?[-.\s]?\d{3,4}[-.\s]?\d{3,4}$/;

  return phoneRegex.test(trimmed);
}
