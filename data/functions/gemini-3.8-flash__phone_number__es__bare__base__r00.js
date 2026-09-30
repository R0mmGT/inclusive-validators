function validate(phone) {
  if (typeof phone !== 'string') return false;
  
  const trimmed = phone.trim();
  const phoneRegex = /^(\+?\d{1,4}[-.\s]?)?(\(?\d{1,4}\)?[-.\s]?)?(\d{1,4}[-.\s]?){1,3}\d{1,4}$/;
  const digits = trimmed.replace(/\D/g, '');

  return phoneRegex.test(trimmed) && digits.length >= 7 && digits.length <= 15;
}
