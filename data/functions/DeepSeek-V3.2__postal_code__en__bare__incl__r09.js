function validate(postalCode) {
  if (typeof postalCode !== 'string') {
    return false;
  }
  
  const trimmedCode = postalCode.trim();
  
  if (trimmedCode.length === 0) {
    return false;
  }

  const countryPatterns = {
    // United States: 5 digits, optional dash with 4 more digits
    US: /^\d{5}(-\d{4})?$/,
    // Canada: A#A #A# or A#A#A# (A=letter, #=digit, space optional)
    CA: /^[A-Z]\d[A-Z]\s?\d[A-Z]\d$/i,
    // United Kingdom: Various formats with outward/inward codes
    UK: /^(GIR\s?0AA|[A-PR-UWYZ]([0-9]{1,2}|([A-HK-Y][0-9]|[A-HK-Y][0-9]([0-9]|[ABEHMNPRV-Y]))|[0-9][A-HJKS-UW])\s?[0-9][ABD-HJLNP-UW-Z]{2})$/i,
    // Australia: 4 digits
    AU: /^\d{4}$/,
    // Germany: 5 digits
    DE: /^\d{5}$/,
    // France: 5 digits
    FR: /^\d{5}$/,
    // Japan: 3 digits dash 4 digits
    JP: /^\d{3}-\d{4}$/,
    // Brazil: 5 digits optional dash 3 digits
    BR: /^\d{5}(-\d{3})?$/,
    // India: 6 digits
    IN: /^\d{6}$/,
    // China: 6 digits
    CN: /^\d{6}$/,
    // Italy: 5 digits
    IT: /^\d{5}$/,
    // Spain: 5 digits
    ES: /^\d{5}$/,
    // Netherlands: 4 digits, 2 letters (space optional)
    NL: /^\d{4}\s?[A-Z]{2}$/i,
    // South Korea: 5 digits or 3 digits dash 3 digits
    KR: /^\d{5}$|^\d{3}-\d{3}$/,
    // Mexico: 5 digits
    MX: /^\d{5}$/,
    // Russia: 6 digits
    RU: /^\d{6}$/,
    // Generic patterns for other countries
    GENERIC_5_DIGIT: /^\d{5}$/,
    GENERIC_4_DIGIT: /^\d{4}$/,
    GENERIC_6_DIGIT: /^\d{6}$/,
    GENERIC_ALPHANUMERIC: /^[A-Z0-9\s-]{3,10}$/i
  };

  for (const pattern of Object.values(countryPatterns)) {
    if (pattern.test(trimmedCode)) {
      return true;
    }
  }

  return false;
}
