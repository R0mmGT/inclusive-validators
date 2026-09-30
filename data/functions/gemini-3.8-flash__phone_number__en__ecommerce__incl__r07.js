function validate(phoneNumber) {
  if (typeof phoneNumber !== 'string') {
    return false;
  }

  const trimmed = phoneNumber.trim();

  // Basic sanity check: must contain only digits, common separators, and an optional leading '+'
  if (!/^\+?[0-9\s.\-()]+$/.test(trimmed)) {
    return false;
  }

  // Ensure parentheses are balanced and there is at most one pair
  const openCount = (trimmed.match(/\(/g) || []).length;
  const closeCount = (trimmed.match(/\)/g) || []).length;
  if (openCount !== closeCount || openCount > 1) {
    return false;
  }
  if (openCount === 1 && trimmed.indexOf('(') > trimmed.indexOf(')')) {
    return false;
  }

  // Extract all digits
  const digits = trimmed.replace(/\D/g, '');

  // According to ITU-T recommendation E.164, international phone numbers
  // can contain a maximum of 15 digits. Valid national numbers globally
  // almost universally contain between 7 and 15 digits.
  return digits.length >= 7 && digits.length <= 15;
}
