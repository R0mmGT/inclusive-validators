function validate(phoneNumber) {
  if (typeof phoneNumber !== 'string') {
    return false;
  }

  const trimmed = phoneNumber.trim();
  if (!trimmed) {
    return false;
  }

  // Only permit digits, spaces, hyphens, dots, parentheses, and an optional leading '+'
  if (!/^\+?[0-9\s\-().]+$/.test(trimmed)) {
    return false;
  }

  // Must begin with '+', a digit, or '('
  if (!/^[+\d(]/.test(trimmed)) {
    return false;
  }

  // Must end with a digit or ')'
  if (!/[\d)]$/.test(trimmed)) {
    return false;
  }

  // Validate balanced parentheses (allows at most one pair, e.g., area code or trunk prefix)
  const openCount = (trimmed.match(/\(/g) || []).length;
  const closeCount = (trimmed.match(/\)/g) || []).length;
  if (openCount !== closeCount || openCount > 1) {
    return false;
  }
  if (openCount === 1) {
    const openIndex = trimmed.indexOf('(');
    const closeIndex = trimmed.indexOf(')');
    if (openIndex > closeIndex || !/\d/.test(trimmed.slice(openIndex + 1, closeIndex))) {
      return false;
    }
  }

  // Prevent consecutive hyphens or dots
  if (/[-.]{2,}/.test(trimmed)) {
    return false;
  }

  // Check digit count according to international telecommunication standards (ITU-T E.164):
  // E.164 numbers have up to 15 digits; national dialing prefixes / exit codes can bring this up to 17.
  // The shortest valid subscriber numbers worldwide contain at least 5 digits.
  const digitsOnly = trimmed.replace(/\D/g, '');
  if (digitsOnly.length < 5 || digitsOnly.length > 17) {
    return false;
  }

  return true;
}
