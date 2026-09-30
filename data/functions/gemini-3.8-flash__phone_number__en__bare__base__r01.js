function validate(phoneNumber) {
  if (typeof phoneNumber !== 'string') {
    return false;
  }

  const trimmed = phoneNumber.trim();
  const phoneRegex = /^(\+?\d{1,3}[-.\s]?)?(\(\d{1,4}\)|\d{1,4})[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
  const digitsOnly = trimmed.replace(/\D/g, '');

  return phoneRegex.test(trimmed) && digitsOnly.length >= 7 && digitsOnly.length <= 15;
}
