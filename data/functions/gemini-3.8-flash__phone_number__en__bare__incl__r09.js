function validate(phone) {
  if (typeof phone !== 'string') {
    return false;
  }

  const trimmed = phone.trim();

  // Allow only valid phone characters: digits, spaces, dots, dashes, parentheses, and leading '+'
  if (!/^\+?[0-9\s.\-()]+$/.test(trimmed)) {
    return false;
  }

  // Ensure '+' appears only once at the beginning, if present
  if (trimmed.indexOf('+') > 0 || (trimmed.match(/\+/g) || []).length > 1) {
    return false;
  }

  // Verify parentheses: either none or a single balanced pair containing digits
  const openCount = (trimmed.match(/\(/g) || []).length;
  const closeCount = (trimmed.match(/\)/g) || []).length;
  if (openCount !== closeCount || openCount > 1) {
    return false;
  }
  if (openCount === 1 && !/\([0-9\s.\-]+\)/.test(trimmed)) {
    return false;
  }

  // Check digit count according to ITU-T E.164 standards (typically 4–15 digits)
  const digits = trimmed.replace(/\D/g, '');
  return digits.length >= 4 && digits.length <= 15;
}
