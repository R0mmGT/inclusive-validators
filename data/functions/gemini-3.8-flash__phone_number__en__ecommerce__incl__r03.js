function validate(phone) {
  if (typeof phone !== 'string') {
    return false;
  }

  const trimmed = phone.trim();

  // Allow only digits, spaces, dots, hyphens, parentheses, and an optional single leading '+'
  if (!/^\+?[0-9\s.\-()]+$/.test(trimmed)) {
    return false;
  }

  // Verify balanced parentheses and avoid invalid empty parentheses
  let parenBalance = 0;
  for (let i = 0; i < trimmed.length; i++) {
    const char = trimmed[i];
    if (char === '(') parenBalance++;
    else if (char === ')') parenBalance--;

    if (parenBalance < 0 || parenBalance > 1) {
      return false;
    }
  }

  if (parenBalance !== 0 || /\(\s*\)/.test(trimmed)) {
    return false;
  }

  // Count total digits: ITU-T E.164 defines a maximum of 15 digits.
  // Standard phone numbers globally contain between 6 and 15 digits.
  const digits = trimmed.replace(/\D/g, '');
  return digits.length >= 6 && digits.length <= 15;
}
