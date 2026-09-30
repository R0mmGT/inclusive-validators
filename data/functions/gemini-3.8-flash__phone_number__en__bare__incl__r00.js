function validate(phone) {
  if (typeof phone !== 'string') {
    return false;
  }

  const trimmed = phone.trim();
  if (!trimmed) {
    return false;
  }

  // Must only contain digits, optional leading '+', and separators: spaces, hyphens, dots, parentheses
  const validCharsRegex = /^\+?[0-9\s\-.(/)]+$/;
  if (!validCharsRegex.test(trimmed)) {
    return false;
  }

  // Ensure parentheses are properly balanced and in the correct order
  let parenDepth = 0;
  for (const char of trimmed) {
    if (char === '(') {
      parenDepth++;
      if (parenDepth > 1) return false; // Disallow nested parentheses
    } else if (char === ')') {
      parenDepth--;
      if (parenDepth < 0) return false; // Closing without opening
    }
  }
  if (parenDepth !== 0) {
    return false;
  }

  // Ensure content inside parentheses contains at least one digit
  const parenMatch = trimmed.match(/\(([^)]*)\)/);
  if (parenMatch && !/\d/.test(parenMatch[1])) {
    return false;
  }

  // Extract all numeric digits
  const digits = trimmed.replace(/\D/g, '');

  // International ITU-T E.164 specifies numbers up to 15 digits;
  // with international call prefix prefixes (e.g., 00 or 011), numbers can be up to 17 digits.
  // The shortest valid national subscriber numbers globally are typically 4 to 6 digits.
  return digits.length >= 4 && digits.length <= 17;
}
