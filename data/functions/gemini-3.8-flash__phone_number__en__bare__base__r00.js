function validate(str) {
  if (typeof str !== 'string') {
    return false;
  }

  const trimmed = str.trim();
  const phoneRegex = /^(\+?\d{1,3}[-.\s]?)?((\(\d{2,4}\)|\d{2,4})[-.\s]?)?\d{3,4}[-.\s]?\d{3,9}$/;
  const digits = trimmed.replace(/\D/g, '');

  return phoneRegex.test(trimmed) && digits.length >= 7 && digits.length <= 15;
}
