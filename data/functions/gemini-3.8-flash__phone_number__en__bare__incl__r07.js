function validate(phoneNumber) {
  if (typeof phoneNumber !== 'string') {
    return false;
  }

  const trimmed = phoneNumber.trim();

  // Must not be empty, must start with '+', '(', or a digit, and end with a digit or ')'
  if (!trimmed || !/^[+(\d]/.test(trimmed) || !/[\d)]$/.test(trimmed)) {
    return false;
  }

  // Allow only valid phone formatting characters: digits, spaces, hyphens, periods, parentheses, leading '+'
  if (!/^\+?[0-9\s.\-()]+$/.test(trimmed)) {
    return false;
  }

  // Reject consecutive separators
  if (/[-.]{2,}/.test(trimmed)) {
    return false;
  }

  // Validate balanced parentheses (at most one pair allowed)
  const openParens = (trimmed.match(/\(/g) || []).length;
  const closeParens = (trimmed.match(/\)/g) || []).length;
  if (openParens !== closeParens || openParens > 1) {
    return false;
  }

  if (openParens === 1) {
    const openIdx = trimmed.indexOf('(');
    const closeIdx = trimmed.indexOf(')');
    if (closeIdx <= openIdx + 1) {
      return false;
    }
    const inside = trimmed.slice(openIdx + 1, closeIdx);
    if (!/\d/.test(inside)) {
      return false;
    }
  }

  // Extract digits only and validate digit count
  // ITU-T E.164 sets max at 15 digits; allow up to 17 if international exit code '00' is used
  const digits = trimmed.replace(/\D/g, '');
  const minDigits = 6;
  const maxDigits = trimmed.startsWith('00') ? 17 : 15;

  return digits.length >= minDigits && digits.length <= maxDigits;
}
