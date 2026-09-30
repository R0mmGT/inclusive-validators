function validate(phone) {
  if (typeof phone !== 'string') {
    return false;
  }

  const trimmed = phone.trim();

  // Allow only valid phone characters: leading '+', digits, spaces, hyphens, dots, and parentheses
  if (!/^\+?[0-9\s\-().]{7,25}$/.test(trimmed)) {
    return false;
  }

  // Prevent consecutive separators
  if (/[-.]{2,}/.test(trimmed)) {
    return false;
  }

  // Validate balanced and properly placed parentheses if present
  const openCount = (trimmed.match(/\(/g) || []).length;
  const closeCount = (trimmed.match(/\)/g) || []).length;

  if (openCount !== closeCount || openCount > 1) {
    return false;
  }

  if (openCount === 1 && !/\(\d{1,6}\)/.test(trimmed)) {
    return false;
  }

  // Must end with a digit or closing parenthesis
  if (!/[\d)]$/.test(trimmed)) {
    return false;
  }

  // Standard E.164 phone numbers contain between 7 and 15 digits
  const digits = trimmed.replace(/\D/g, '');
  return digits.length >= 7 && digits.length <= 15;
}
