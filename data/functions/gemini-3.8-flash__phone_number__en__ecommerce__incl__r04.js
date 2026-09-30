function validate(phoneNumber) {
  if (typeof phoneNumber !== 'string') {
    return false;
  }

  const trimmed = phoneNumber.trim();

  // Ensure only valid phone characters are present: digits, spaces, hyphens, dots, parentheses, and leading plus
  if (!/^\+?[0-9\s.\-()]+$/.test(trimmed)) {
    return false;
  }

  // Validate balanced parentheses (maximum of one pair, standard for area codes)
  const openParens = (trimmed.match(/\(/g) || []).length;
  const closeParens = (trimmed.match(/\)/g) || []).length;
  if (openParens !== closeParens || openParens > 1) {
    return false;
  }
  if (openParens === 1 && !/\([0-9\s.\-]+\)/.test(trimmed)) {
    return false;
  }

  // Extract pure digits
  const digits = trimmed.replace(/\D/g, '');

  // International standard (ITU-T E.164) permits numbers up to 15 digits.
  // Standard subscriber numbers globally range from 7 to 15 digits.
  if (digits.length < 7 || digits.length > 15) {
    return false;
  }

  return true;
}
