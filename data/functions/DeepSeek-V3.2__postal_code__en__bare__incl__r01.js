function validate(code) {
  if (typeof code !== 'string') return false;
  
  // Common global patterns
  const patterns = [
    // US: 5 digits or 5+4 format
    /^\d{5}(-\d{4})?$/,
    // Canada: A1A 1A1 format
    /^[A-Z]\d[A-Z]\s?\d[A-Z]\d$/,
    // UK: Various formats like SW1W 0NY, PO16 7GZ, GU16 7HF
    /^([A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}|GIR\s?0AA)$/,
    // Australia: 4 digits
    /^\d{4}$/,
    // Germany: 5 digits
    /^\d{5}$/,
    // France: 5 digits
    /^\d{5}$/,
    // Japan: 3 digits dash 4 digits
    /^\d{3}-\d{4}$/,
    // Brazil: 5 digits dash 3 digits
    /^\d{5}-\d{3}$/,
    // India: 6 digits
    /^\d{6}$/,
    // China: 6 digits
    /^\d{6}$/,
    // Mexico: 5 digits
    /^\d{5}$/,
    // Italy: 5 digits
    /^\d{5}$/,
    // Spain: 5 digits
    /^\d{5}$/,
    // Netherlands: 4 digits 2 letters (1111 AB)
    /^\d{4}\s?[A-Z]{2}$/,
    // South Korea: 5 digits or 3 digits dash 3 digits
    /^(\d{5}|\d{3}-\d{3})$/,
    // Russia: 6 digits
    /^\d{6}$/,
    // Sweden: 3 digits space 2 digits
    /^\d{3}\s?\d{2}$/,
    // Norway: 4 digits
    /^\d{4}$/,
    // Denmark: 4 digits
    /^\d{4}$/,
    // Finland: 5 digits
    /^\d{5}$/,
    // Poland: 2 digits dash 3 digits
    /^\d{2}-\d{3}$/,
    // Czech Republic: 3 digits space 2 digits
    /^\d{3}\s?\d{2}$/,
    // Switzerland: 4 digits
    /^\d{4}$/,
    // Austria: 4 digits
    /^\d{4}$/,
    // Belgium: 4 digits
    /^\d{4}$/,
    // Portugal: 4 digits dash 3 digits
    /^\d{4}-\d{3}$/,
    // Ireland: Various formats like A65 F4E2
    /^[A-Z]\d{1,2}\s?\d[A-Z]{2}$/,
    // New Zealand: 4 digits
    /^\d{4}$/,
    // South Africa: 4 digits
    /^\d{4}$/,
    // Turkey: 5 digits
    /^\d{5}$/,
    // Argentina: 4 digits or 4 digits dash 3 letters/numbers
    /^\d{4}(-[A-Z0-9]{3})?$/,
    // Chile: 7 digits
    /^\d{7}$/
  ];

  const normalizedCode = code.toUpperCase().trim();
  
  // Check against all patterns
  return patterns.some(pattern => pattern.test(normalizedCode));
}
