function validate(phoneNumber) {
  if (typeof phoneNumber !== 'string') {
    return false;
  }

  const trimmed = phoneNumber.trim();
  if (!trimmed) {
    return false;
  }

  // Ensure only valid phone characters are used, with an optional leading '+'
  if (!/^\+?[0-9\s().-]+$/.test(trimmed)) {
    return false;
  }

  // Disallow consecutive punctuation marks
  if (/[-.]{2,}/.test(trimmed)) {
    return false;
  }

  // Validate balanced parentheses (e.g., area codes like (123) or trunk prefixes like (0))
  const openParens = (trimmed.match(/\(/g) || []).length;
  const closeParens = (trimmed.match(/\)/g) || []).length;
  if (openParens !== closeParens || openParens > 1) {
    return false;
  }
  if (openParens === 1) {
    const parenContent = trimmed.match(/\(([^)]*)\)/);
    // Must contain between 1 and 6 digits only
    if (!parenContent || !/^[0-9]{1,6}$/.test(parenContent[1])) {
      return false;
    }
  }

  // Extract all numeric digits
  const digits = trimmed.replace(/\D/g, '');

  // International standard (ITU-T E.164) permits up to 15 digits; valid global numbers have at least 6 digits
  return digits.length >= 6 && digits.length <= 15;
}
