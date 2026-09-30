function validate(code) {
  if (typeof code !== 'string') {
    return false;
  }

  // Normalize full-width characters (e.g. Japanese IME) and canonical equivalents
  let cleaned = code.trim().normalize('NFKC');

  // Convert Arabic-Indic and Eastern Arabic-Indic numerals to standard ASCII digits
  cleaned = cleaned
    .replace(/[\u0660-\u0669]/g, (d) => String.fromCharCode(d.charCodeAt(0) - 0x0660 + 48))
    .replace(/[\u06F0-\u06F9]/g, (d) => String.fromCharCode(d.charCodeAt(0) - 0x06F0 + 48));

  // Normalize Unicode dashes and spaces
  cleaned = cleaned
    .replace(/[\u2010-\u2015]/g, '-')
    .replace(/\s+/g, ' ');

  if (!cleaned) {
    return false;
  }

  // Comprehensive international postal code formats
  const patterns = [
    // Standard purely numeric formats (3 to 10 digits): e.g., US (5-digit), France, Germany, India, China, Iceland (3-digit)
    /^\d{3,10}$/,

    // Numeric with separator: e.g., US ZIP+4 (12345-6789), Japan (123-4567), Brazil (12345-678), Poland (12-345), Sweden (123 45)
    /^\d{2,5}[- ]\d{2,5}$/,

    // United Kingdom and British Overseas Territories: e.g., SW1A 1AA, EC1A 1BB, W1A 0AX, FIQQ 1ZZ
    /^[A-Z]{1,4}\d[A-Z\d]?[- ]?\d[A-Z]{2}$/i,

    // Canada: e.g., K1A 0B1
    /^[A-Z]\d[A-Z][- ]?\d[A-Z]\d$/i,

    // Netherlands: e.g., 1012 AB
    /^\d{4}[- ]?[A-Z]{2}$/i,

    // Ireland (Eircode): e.g., D02 X285
    /^[A-Z]\d[\dW][- ]?[A-Z\d]{4}$/i,

    // Argentina: e.g., C1024CWN
    /^[A-Z]\d{4}[A-Z]{3}$/i,

    // Malta: e.g., VLT 1115
    /^[A-Z]{3}[- ]?\d{2,4}$/i,

    // Brunei, Eswatini, Bermuda: e.g., BB3577, H100, HM 12
    /^[A-Z]{1,2}\d{3,4}$/i,
    /^[A-Z]{2}[- ]?[A-Z\d]{2}$/i,

    // Country prefix followed by postal code: e.g., D-10115, LV-1050, AZ 1000, MC-98000
    /^[A-Z]{1,3}[- ]\d{3,10}$/i,
    /^[A-Z]{1,3}[- ]\d{2,5}[- ]\d{2,5}$/i
  ];

  return patterns.some((pattern) => pattern.test(cleaned));
}
