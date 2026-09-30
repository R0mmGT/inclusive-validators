function validate(phoneNumber) {
  if (typeof phoneNumber !== 'string') {
    return false;
  }

  const trimmed = phoneNumber.trim();

  // Must start with '+' or a digit or an opening parenthesis, and end with a digit or closing parenthesis
  if (!/^[+\d(]/.test(trimmed) || !/[\d)]$/.test(trimmed)) {
    return false;
  }

  // Check for allowed characters: digits, spaces, hyphens, periods, parentheses, and leading '+'
  if (!/^\+?[\d\s\-().]+$/.test(trimmed)) {
    return false;
  }

  // Prevent consecutive punctuation marks
  if (/[-.]{2,}/.test(trimmed)) {
    return false;
  }

  // Validate balanced parentheses (maximum one pair allowed for area/trunk codes, e.g., (0) or (123))
  const openCount = (trimmed.match(/\(/g) || []).length;
  const closeCount = (trimmed.match(/\)/g) || []).length;
  if (openCount !== closeCount || openCount > 1) {
    return false;
  }
  if (openCount === 1 && !/\(\d{1,6}\)/.test(trimmed)) {
    return false;
  }

  // Extract all digit characters
  const digits = trimmed.replace(/\D/g, '');

  // ITU-T E.164 allows up to 15 digits; national formats generally have at least 6 digits
  return digits.length >= 6 && digits.length <= 15;
}
