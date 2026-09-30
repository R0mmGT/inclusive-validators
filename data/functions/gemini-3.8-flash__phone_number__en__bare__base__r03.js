function validate(str) {
  if (typeof str !== 'string') return false;

  const trimmed = str.trim();
  // Validates standard international and national phone number formats:
  // e.g., +1 (123) 456-7890, 123-456-7890, (123) 456-7890, 1234567890, +44 20 7946 0958
  const phoneRegex = /^\+?(?:[0-9]{1,4}[-.\s]?)?(?:\([0-9]{1,4}\)|[0-9]{1,4})?[-.\s]?[0-9]{1,4}[-.\s]?[0-9]{1,9}$/;
  
  if (!phoneRegex.test(trimmed)) return false;

  // E.164 standard recommends between 7 and 15 digits
  const digits = trimmed.replace(/\D/g, '');
  return digits.length >= 7 && digits.length <= 15;
}
