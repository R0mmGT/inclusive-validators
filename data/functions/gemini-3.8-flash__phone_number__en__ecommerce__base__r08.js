function validate(phone) {
  if (typeof phone !== 'string') {
    return false;
  }

  const trimmed = phone.trim();

  // Basic pattern: optional leading '+', only digits, spaces, dots, hyphens, and parentheses allowed
  if (!/^\+?[0-9\s().-]{7,25}$/.test(trimmed)) {
    return false;
  }

  // Count digits according to international standards (E.164 specifies between 7 and 15 digits)
  const digits = trimmed.replace(/\D/g, '');
  if (digits.length < 7 || digits.length > 15) {
    return false;
  }

  // Ensure balanced and well-formed parentheses if present
  const openParens = (trimmed.match(/\(/g) || []).length;
  const closeParens = (trimmed.match(/\)/g) || []).length;

  if (openParens !== closeParens || openParens > 1) {
    return false;
  }

  if (openParens === 1 && trimmed.indexOf('(') >= trimmed.indexOf(')')) {
    return false;
  }

  return true;
}
