function validate(phoneNumber) {
  if (typeof phoneNumber !== 'string') {
    return false;
  }

  const trimmed = phoneNumber.trim();

  // Allow only valid phone characters: digits, spaces, hyphens, dots, parentheses, and leading '+'
  if (!/^\+?[0-9\s\-().]+$/.test(trimmed)) {
    return false;
  }

  // Ensure balanced parentheses (at most one pair, correctly ordered, containing only digits)
  const openCount = (trimmed.match(/\(/g) || []).length;
  const closeCount = (trimmed.match(/\)/g) || []).length;

  if (openCount !== closeCount || openCount > 1) {
    return false;
  }

  if (openCount === 1) {
    const openIdx = trimmed.indexOf('(');
    const closeIdx = trimmed.indexOf(')');
    if (openIdx >= closeIdx || !/^\(\d+\)$/.test(trimmed.slice(openIdx, closeIdx + 1))) {
      return false;
    }
  }

  // Extract all digit characters
  const digits = trimmed.replace(/\D/g, '');

  // In accordance with ITU-T E.164, valid phone numbers have between 6 and 15 digits
  return digits.length >= 6 && digits.length <= 15;
}
