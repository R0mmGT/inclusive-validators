function validate(postal) {
  // Accept only strings
  if (typeof postal !== 'string') return false;
  const v = postal.trim();
  if (!v) return false;

  // Common country-specific postal code patterns
  const patterns = [
    // United States: 12345 or 12345-6789
    /^\d{5}(-\d{4})?$/,
    // Canada: A1A 1A1
    /^[A-Za-z]\d[A-Za-z] ?\d[A-Za-z]\d$/i,
    // United Kingdom (simplified, covers valid formats including 'GIR 0AA')
    /^([A-Z]{1,2}\d[A-Z\d]?\s*\d[ABD-HJLNP-UW-Z]{2}|GIR\s?0AA)$/i,
    // Australia: 4 digits
    /^\d{4}$/,
    // Netherlands: 1234 AB
    /^\d{4}\s?[A-Za-z]{2}$/,
    // Germany / France / Spain / Italy: 5 digits
    /^\d{5}$/,
    // Japan: 123-4567
    /^\d{3}-\d{4}$/,
    // India: 6 digits
    /^\d{6}$/,
    // Switzerland: 4 digits
    /^\d{4}$/,
    // Brazil: 12345-678
    /^\d{5}-?\d{3}$/,
    // Poland: 12-345
    /^\d{2}-\d{3}$/
  ];

  if (patterns.some(re => re.test(v))) return true;

  // Fallback generic pattern:
  // - 3 to 12 characters
  // - letters, digits, spaces and hyphens allowed
  // - cannot be all spaces/hyphens and must start/end with alphanumeric
  const fallback = /^[A-Za-z0-9](?:[A-Za-z0-9\s-]{1,10})[A-Za-z0-9]$/;
  return fallback.test(v);
}
