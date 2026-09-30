function validate(postalCode) {
  // Handle null, undefined, non-string types
  if (typeof postalCode !== 'string') {
    return false;
  }

  // Trim whitespace and remove common separators (space, dash)
  const cleaned = postalCode.trim().replace(/[\s-]/g, '');

  // Empty string after cleaning is invalid
  if (cleaned.length === 0) {
    return false;
  }

  // Check for characters that are never valid in postal codes worldwide
  // Postal codes should only contain alphanumeric characters
  // Some countries allow letters, some only digits
  if (!/^[A-Za-z0-9]+$/.test(cleaned)) {
    return false;
  }

  // Length validation for worldwide postal codes
  // Shortest: Bermuda (2 chars), Longest: Iran (10 digits)
  if (cleaned.length < 2 || cleaned.length > 10) {
    return false;
  }

  // Country-specific format validation patterns
  const patterns = {
    // United States (5 digits or 5+4)
    US: /^\d{5}(?:\d{4})?$/,
    // Canada (A#A #A#)
    CA: /^[A-Z]\d[A-Z]\s?\d[A-Z]\d$/i,
    // United Kingdom (complex pattern covering various formats)
    UK: /^(?:[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}|GIR ?0AA)$/i,
    // Australia (4 digits)
    AU: /^\d{4}$/,
    // Germany (5 digits)
    DE: /^\d{5}$/,
    // France (5 digits)
    FR: /^\d{5}$/,
    // Italy (5 digits)
    IT: /^\d{5}$/,
    // Spain (5 digits)
    ES: /^\d{5}$/,
    // Netherlands (4 digits + 2 letters)
    NL: /^\d{4}\s?[A-Z]{2}$/i,
    // Brazil (8 digits with optional separator)
    BR: /^\d{5}-?\d{3}$/,
    // Japan (3 digits + 4 digits)
    JP: /^\d{3}-?\d{4}$/,
    // India (6 digits)
    IN: /^\d{6}$/,
    // China (6 digits)
    CN: /^\d{6}$/,
    // South Korea (5 or 6 digits)
    KR: /^\d{5}(?:\d{1})?$/,
    // Russia (6 digits)
    RU: /^\d{6}$/,
    // Mexico (5 digits)
    MX: /^\d{5}$/,
    // Argentina (4 digits with optional letter)
    AR: /^[A-Z]?\d{4}[A-Z]{0,3}$/i,
    // Sweden (5 digits)
    SE: /^\d{5}$/,
    // Norway (4 digits)
    NO: /^\d{4}$/,
    // Denmark (4 digits)
    DK: /^\d{4}$/,
    // Finland (5 digits)
    FI: /^\d{5}$/,
    // Poland (5 digits with optional dash)
    PL: /^\d{2}-?\d{3}$/,
    // Switzerland (4 digits)
    CH: /^\d{4}$/,
    // Austria (4 digits)
    AT: /^\d{4}$/,
    // Belgium (4 digits)
    BE: /^\d{4}$/,
    // Portugal (7 digits with optional dash)
    PT: /^\d{4}-?\d{3}$/,
    // Ireland (complex format)
    IE: /^(?:[A-Z]\d{2}|[A-Z]{3}|[A-Z]\d[A-Z])\s?\d[A-Z]{2}$/i,
    // Singapore (6 digits)
    SG: /^\d{6}$/,
    // Malaysia (5 digits)
    MY: /^\d{5}$/,
    // Philippines (4 digits)
    PH: /^\d{4}$/,
    // New Zealand (4 digits)
    NZ: /^\d{4}$/,
    // South Africa (4 digits)
    ZA: /^\d{4}$/,
    // Turkey (5 digits)
    TR: /^\d{5}$/,
    // Israel (7 digits)
    IL: /^\d{7}$/,
    // Egypt (5 digits)
    EG: /^\d{5}$/,
    // Saudi Arabia (5 digits)
    SA: /^\d{5}$/,
    // UAE (no postal code system)
    AE: /^$/,
    // Hong Kong (no postal code system)
    HK: /^$/,
  };

  // Test against all country patterns
  for (const country in patterns) {
    const pattern = patterns[country];
    // For countries without postal codes (like UAE, Hong Kong), 
    // empty string is valid, otherwise check pattern
    if (pattern.source === /^$/.source) {
      if (cleaned === '') {
        return true;
      }
    } else if (pattern.test(cleaned)) {
      return true;
    }
  }

  // If no country pattern matched, fallback to general alphanumeric validation
  // This catches countries not explicitly listed but with reasonable postal codes
  return /^[A-Z0-9]{2,10}$/i.test(cleaned);
}
