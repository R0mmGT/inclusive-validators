function validate(phoneNumber) {
  if (typeof phoneNumber !== 'string') {
    return false;
  }

  const trimmed = phoneNumber.trim();

  // Allow an optional leading '+', followed only by digits, spaces, hyphens, dots, and parentheses
  if (!/^\+?[0-9\s.\-()]+$/.test(trimmed)) {
    return false;
  }

  // Ensure parentheses are balanced and properly ordered, if present
  const openParenCount = (trimmed.match(/\(/g) || []).length;
  const closeParenCount = (trimmed.match(/\)/g) || []).length;

  if (openParenCount !== closeParenCount || openParenCount > 1) {
    return false;
  }

  if (openParenCount === 1) {
    const openIndex = trimmed.indexOf('(');
    const closeIndex = trimmed.indexOf(')');
    // Closing parenthesis must come after opening, containing at least one digit inside
    if (openIndex > closeIndex || !/\d/.test(trimmed.slice(openIndex + 1, closeIndex))) {
      return false;
    }
  }

  // Extract digits only
  const digits = trimmed.replace(/\D/g, '');

  // International standard (ITU-T E.164) permits up to 15 digits; minimum global phone length is 7 digits
  return digits.length >= 7 && digits.length <= 15;
}
