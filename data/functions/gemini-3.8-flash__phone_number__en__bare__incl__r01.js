function validate(phoneNumber) {
  if (typeof phoneNumber !== 'string') {
    return false;
  }

  const trimmed = phoneNumber.trim();

  // Allow optional leading '+' followed only by digits, spaces, dots, dashes, and parentheses
  if (!/^\+?[0-9\s.\-()]+$/.test(trimmed)) {
    return false;
  }

  // Validate balanced parentheses (at most one pair, standard for area codes/prefixes)
  const openCount = (trimmed.match(/\(/g) || []).length;
  const closeCount = (trimmed.match(/\)/g) || []).length;

  if (openCount !== closeCount || openCount > 1) {
    return false;
  }

  if (openCount === 1) {
    const match = trimmed.match(/\(([^)]*)\)/);
    // Ensure '(' comes before ')' and contains at least one digit
    if (!match || !/\d/.test(match[1])) {
      return false;
    }
  }

  // Extract only the numerical digits
  const digits = trimmed.replace(/\D/g, '');

  // ITU-T E.164 recommends international phone numbers have up to 15 digits.
  // Standard subscriber numbers globally (with or without country code) typically contain 5 to 15 digits.
  if (digits.length < 5 || digits.length > 15) {
    return false;
  }

  return true;
}
