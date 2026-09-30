function validate(phone) {
  if (typeof phone !== 'string') {
    return false;
  }

  const trimmed = phone.trim();

  // Allow only digits, standard separators (spaces, dots, hyphens),
  // balanced parentheses, and an optional leading '+'
  if (!/^\+?[0-9\s.\-()]+$/.test(trimmed)) {
    return false;
  }

  // Ensure parentheses are properly paired if present
  const openCount = (trimmed.match(/\(/g) || []).length;
  const closeCount = (trimmed.match(/\)/g) || []).length;
  if (openCount !== closeCount || openCount > 1) {
    return false;
  }
  if (openCount === 1 && trimmed.indexOf('(') >= trimmed.indexOf(')')) {
    return false;
  }

  // Extract pure digits
  const digits = trimmed.replace(/\D/g, '');

  // ITU-T E.164 international standard specifies a maximum of 15 digits.
  // The minimum length for valid national/international numbers is typically 6-7 digits.
  return digits.length >= 6 && digits.length <= 15;
}
