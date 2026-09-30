function validate(phoneNumber) {
  if (typeof phoneNumber !== 'string') {
    return false;
  }

  const trimmed = phoneNumber.trim();

  // Allow only digits, whitespace, and common phone formatting characters: +, -, ., (, )
  if (!/^\+?[0-9\s.\-()]+$/.test(trimmed)) {
    return false;
  }

  // Ensure '+' appears at most once and only at the very start
  if (trimmed.includes('+')) {
    if (!trimmed.startsWith('+') || (trimmed.match(/\+/g) || []).length > 1) {
      return false;
    }
  }

  // Validate balanced parentheses (at most one pair, containing only digits)
  const openCount = (trimmed.match(/\(/g) || []).length;
  const closeCount = (trimmed.match(/\)/g) || []).length;
  if (openCount !== closeCount || openCount > 1) {
    return false;
  }
  if (openCount === 1) {
    const openIdx = trimmed.indexOf('(');
    const closeIdx = trimmed.indexOf(')');
    if (openIdx > closeIdx) {
      return false;
    }
    const inside = trimmed.slice(openIdx + 1, closeIdx);
    if (!/^\d+$/.test(inside)) {
      return false;
    }
  }

  // Extract digits to verify length per ITU-T E.164 standards
  const digits = trimmed.replace(/\D/g, '');

  // International standard E.164 numbers are 7 to 15 digits long.
  // When an international exit code (e.g., '00') is used instead of '+', allow up to 17 digits.
  if (trimmed.startsWith('00')) {
    return digits.length >= 8 && digits.length <= 17;
  }

  return digits.length >= 7 && digits.length <= 15;
}
