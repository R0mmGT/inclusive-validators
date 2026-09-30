function validate(phoneNumber) {
  if (typeof phoneNumber !== 'string') {
    return false;
  }

  const trimmed = phoneNumber.trim();

  // Ensure it only contains valid characters and an optional leading '+'
  const validFormat = /^\+?[0-9\s().-]+$/;
  if (!validFormat.test(trimmed)) {
    return false;
  }

  // Ensure parentheses, if present, are correctly paired and ordered
  const openParens = (trimmed.match(/\(/g) || []).length;
  const closeParens = (trimmed.match(/\)/g) || []).length;
  if (openParens !== closeParens || openParens > 1) {
    return false;
  }
  if (openParens === 1 && trimmed.indexOf('(') >= trimmed.indexOf(')')) {
    return false;
  }

  // Check that the digit count complies with international E.164 standards (7 to 15 digits)
  const digitsOnly = trimmed.replace(/\D/g, '');
  return digitsOnly.length >= 7 && digitsOnly.length <= 15;
}
