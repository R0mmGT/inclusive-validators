function validate(phoneNumber) {
  if (typeof phoneNumber !== 'string') {
    return false;
  }

  const trimmed = phoneNumber.trim();
  if (!trimmed) {
    return false;
  }

  // Allow an optional leading '+', digits, and common separators: spaces, hyphens, dots, and parentheses
  const validCharacters = /^\+?[0-9\s().-]+$/;
  if (!validCharacters.test(trimmed)) {
    return false;
  }

  // Ensure balanced and valid parentheses (at most one pair, correctly ordered, non-empty)
  const openParenCount = (trimmed.match(/\(/g) || []).length;
  const closeParenCount = (trimmed.match(/\)/g) || []).length;

  if (openParenCount !== closeParenCount || openParenCount > 1) {
    return false;
  }

  if (openParenCount === 1) {
    const openIdx = trimmed.indexOf('(');
    const closeIdx = trimmed.indexOf(')');
    if (closeIdx <= openIdx + 1) {
      return false; // Parentheses are empty or reversed
    }
  }

  // Extract all digits
  let digits = trimmed.replace(/\D/g, '');

  // If the number uses the '00' international call prefix instead of '+', normalize it
  if (trimmed.startsWith('00')) {
    digits = digits.slice(2);
  }

  // According to ITU-T recommendation E.164, international phone numbers
  // contain a maximum of 15 digits. Valid numbers worldwide generally have between 7 and 15 digits.
  return digits.length >= 7 && digits.length <= 15;
}
