function validate(phoneNumber) {
  if (typeof phoneNumber !== 'string') {
    return false;
  }

  const trimmed = phoneNumber.trim();

  // Allowed characters: optional leading '+', digits, spaces, dashes, dots, and parentheses
  const validCharsPattern = /^\+?[0-9\s\-().]{7,25}$/;
  if (!validCharsPattern.test(trimmed)) {
    return false;
  }

  // Ensure parentheses are correctly matched and wrap only digits (e.g., area code)
  const openParens = (trimmed.match(/\(/g) || []).length;
  const closeParens = (trimmed.match(/\)/g) || []).length;
  if (openParens !== closeParens || openParens > 1) {
    return false;
  }
  if (openParens === 1 && !/\(\d{1,6}\)/.test(trimmed)) {
    return false;
  }

  // Disallow consecutive special separator characters
  if (/[-.]{2,}|\s{2,}/.test(trimmed)) {
    return false;
  }

  // Check total digit count according to international standard (ITU-T E.164: 7 to 15 digits)
  const digits = trimmed.replace(/\D/g, '');
  return digits.length >= 7 && digits.length <= 15;
}
