function validate(phone) {
  if (typeof phone !== 'string') {
    return false;
  }

  const trimmed = phone.trim();

  // Ensure input contains only permitted phone characters and an optional leading '+'
  if (!/^\+?[0-9\s.\-()]+$/.test(trimmed)) {
    return false;
  }

  // Ensure '+' only appears at the very beginning
  if (trimmed.lastIndexOf('+') > 0) {
    return false;
  }

  // Validate parentheses: must be balanced, properly ordered, and at most one pair
  const openCount = (trimmed.match(/\(/g) || []).length;
  const closeCount = (trimmed.match(/\)/g) || []).length;

  if (openCount !== closeCount || openCount > 1) {
    return false;
  }
  if (openCount === 1 && trimmed.indexOf('(') > trimmed.indexOf(')')) {
    return false;
  }

  // Extract digits and validate against ITU-T E.164 standards (typically 6-15 digits globally)
  const digits = trimmed.replace(/\D/g, '');
  return digits.length >= 6 && digits.length <= 15;
}
