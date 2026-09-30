function validate(str) {
  if (typeof str !== 'string') return false;

  const trimmed = str.trim();
  const digits = trimmed.replace(/\D/g, '');

  if (digits.length < 7 || digits.length > 15) {
    return false;
  }

  const phoneRegex = /^\+?(?:(?:\(\d{1,5}\)|\d{1,5})[-.\s]?)*\d{1,5}$/;
  return phoneRegex.test(trimmed);
}
