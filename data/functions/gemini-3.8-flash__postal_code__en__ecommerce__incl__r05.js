function validate(postalCode) {
  if (typeof postalCode !== 'string') {
    return false;
  }

  const code = postalCode.trim().toUpperCase();

  // Basic length and structure check:
  // Must be between 3 and 12 characters and contain at least one digit
  if (code.length < 3 || code.length > 12 || !/\d/.test(code)) {
    return false;
  }

  // Comprehensive regular expressions covering postal code formats worldwide
  const patterns = [
    // Standard numeric postal codes (3 to 10 digits)
    // Examples: USA (5-digit), France, Germany, China, India, Russia, Australia
    /^\d{3,10}$/,

    // Numeric postal codes split by a single hyphen or space
    // Examples: USA ZIP+4 (12345-6789), Japan (123-4567), Brazil (12345-678), Poland (12-345), Sweden (123 45)
    /^\d{2,5}[- ]\d{2,5}$/,

    // United Kingdom (e.g., SW1A 1AA, W1A 0AX, EC1A 1BB, M1 1AE, B33 8TH)
    /^[A-Z]{1,2}\d[A-Z\d]?[- ]?\d[A-Z]{2}$/,

    // Canada (e.g., K1A 0B1, M5V 2T6)
    /^[A-CEGHJ-NPR-TV-Z]\d[A-CEGHJ-NPR-TV-Z][- ]?\d[A-CEGHJ-NPR-TV-Z]\d$/,

    // Netherlands (e.g., 1012 AB)
    /^\d{4}[- ]?[A-Z]{2}$/,

    // Ireland (Eircode, e.g., D02 X285)
    /^[A-Z\d]{3}[- ]?[A-Z\d]{4}$/,

    // Argentina (e.g., C1024CWN)
    /^[A-Z]\d{4}[A-Z]{3}$/,

    // Country prefixes and alphanumeric codes (e.g., Andorra AD100, Malta VLT 1115, Brunei BB3713, Cayman KY1-1100)
    /^[A-Z]{1,3}[- ]?\d{2,6}$/,
    /^[A-Z]{1,3}[- ]?\d{1,4}[- ]?[A-Z\d]{1,4}$/,
    /^\d{4}[- ][A-Z]{3}$/
  ];

  return patterns.some((pattern) => pattern.test(code));
}
