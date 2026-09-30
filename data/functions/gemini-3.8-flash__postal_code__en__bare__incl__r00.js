function validate(code) {
  if (typeof code !== 'string') {
    return false;
  }

  const trimmed = code.trim();
  if (!trimmed) {
    return false;
  }

  // Regex patterns covering postal code formats worldwide
  const patterns = [
    // Standard pure numeric postal codes (3 to 8 digits, or 10 digits)
    // Covers: US, DE, FR, IT, ES, AU, NZ, IN, CN, RU, SG, ZA, BR, etc.
    /^\d{3,8}$/,
    /^\d{10}$/,

    // Numeric with hyphen separator:
    // US ZIP+4 (12345-6789), Japan (123-4567), Brazil (12345-678), Portugal (1234-567),
    // Poland (12-345), South Korea legacy (123-456), Taiwan (123-45), Iran (12345-12345)
    /^\d{2,5}-\d{2,5}$/,

    // Numeric with space separator:
    // Czech Republic, Slovakia, Sweden, Greece (e.g., 123 45)
    /^\d{2,4}\s\d{2,4}$/,

    // Country code prefix followed by numeric:
    // e.g., D-10115, CH-8000, LV-1050, LT-01100
    /^[A-Z]{1,2}[-\s]?\d{3,6}$/i,

    // United Kingdom: e.g., SW1A 1AA, W1A 0AX, EC1A 1BB, M1 1AE, B33 8TH, CR2 6XH
    /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i,

    // Canada: A1A 1A1 (excludes letters D, F, I, O, Q, U)
    /^[A-CEGHJ-NPR-TVXY]\d[A-CEGHJ-NPR-TV-Z]\s*\d[A-CEGHJ-NPR-TV-Z]\d$/i,

    // Netherlands: 1234 AB
    /^\d{4}\s*[A-Z]{2}$/i,

    // Ireland (Eircode): e.g., D02 X285, D6W 285P
    /^(?:[A-Z]\d[A-Z\d]|D6W)\s*[A-Z\d]{4}$/i,

    // Argentina: A1234BCD
    /^[A-Z]\d{4}[A-Z]{3}$/i,

    // Malta: ABC 1234
    /^[A-Z]{3}\s*\d{2,4}$/i,

    // Brunei, Eswatini: e.g., BB1234, H123
    /^[A-Z]{1,2}\d{3,4}$/i
  ];

  return patterns.some((regex) => regex.test(trimmed));
}
