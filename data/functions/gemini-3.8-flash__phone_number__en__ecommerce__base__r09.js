function validate(phone) {
  if (typeof phone !== 'string') {
    return false;
  }

  const trimmed = phone.trim();

  // Allow only digits, spaces, hyphens, dots, parentheses, and an optional leading '+'
  if (!/^\+?[\d\s().-]+$/.test(trimmed)) {
    return false;
  }

  // Extract digits only
  const digits = trimmed.replace(/\D/g, '');

  // International standard (ITU-T E.164) requires between 7 and 15 digits
  if (digits.length < 7 || digits.length > 15) {
    return false;
  }

  // Validate balanced parentheses wrapping digits only
  const openParens = (trimmed.match(/\(/g) || []).length;
  const closeParens = (trimmed.match(/\)/g) || []).length;
  if (openParens !== closeParens || openParens > 1) {
    return false;
  }
  if (openParens === 1 && !/\(\d+\)/.test(trimmed)) {
    return false;
  }

  // Reject consecutive punctuation marks and ensure it ends with a digit
  if (/[-.]{2,}/.test(trimmed) || !/\d$/.test(trimmed)) {
    return false;
  }

  return true;
}
