function validate(phone) {
  if (typeof phone !== 'string') {
    return false;
  }

  const trimmed = phone.trim();
  if (!trimmed) {
    return false;
  }

  // Allowed characters: digits, spaces, parentheses, hyphens, dots, forward slashes, and leading '+'
  if (!/^[0-9+\s\-()./]+$/.test(trimmed)) {
    return false;
  }

  // A '+' international prefix is optional, but if present must be at the beginning
  const plusCount = (trimmed.match(/\+/g) || []).length;
  if (plusCount > 1) {
    return false;
  }
  if (plusCount === 1 && !trimmed.startsWith('+') && !trimmed.startsWith('(+')) {
    return false;
  }

  // Validate balanced and non-nested parentheses
  let parenDepth = 0;
  for (let i = 0; i < trimmed.length; i++) {
    if (trimmed[i] === '(') {
      parenDepth++;
      if (parenDepth > 1) return false;
    } else if (trimmed[i] === ')') {
      parenDepth--;
      if (parenDepth < 0) return false;
    }
  }
  if (parenDepth !== 0 || /\(\s*\)/.test(trimmed)) {
    return false;
  }

  // Disallow consecutive separator characters
  if (/[\-./]{2,}/.test(trimmed)) {
    return false;
  }

  // Must end with a digit or a closing parenthesis
  if (!/[0-9)]$/.test(trimmed)) {
    return false;
  }

  // ITU-T E.164 allows up to 15 digits; global valid subscriber numbers require at least 4 digits
  const digits = trimmed.replace(/\D/g, '');
  return digits.length >= 4 && digits.length <= 15;
}
