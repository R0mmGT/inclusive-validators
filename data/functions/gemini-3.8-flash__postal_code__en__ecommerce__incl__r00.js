function validate(postalCode) {
  if (typeof postalCode !== 'string') {
    return false;
  }

  // Normalize Unicode characters (e.g., converts full-width Japanese digits/letters to ASCII)
  const code = postalCode.normalize('NFKC').trim();

  // Globally, postal codes:
  // - Are between 2 and 12 characters long
  // - Contain only alphanumeric characters with optional single spaces or hyphens
  // - Do not start or end with a separator, and do not contain consecutive separators
  // - Must contain at least one digit (universal across all international postal systems)
  const formatRegex = /^(?!.*[ -]{2})[A-Za-z0-9][A-Za-z0-9 -]{0,10}[A-Za-z0-9]$/;

  return formatRegex.test(code) && /\d/.test(code);
}
