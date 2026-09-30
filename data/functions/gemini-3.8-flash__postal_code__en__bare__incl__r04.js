function validate(code) {
  if (typeof code !== 'string') {
    return false;
  }

  const trimmed = code.trim().toUpperCase();
  if (!trimmed) {
    return false;
  }

  const patterns = [
    // Standard numeric codes from 3 to 10 digits (US, Germany, France, India, Russia, China, Australia, etc.)
    /^\d{3,10}$/,

    // Numeric formats with standard delimiters (space or hyphen)
    /^\d{2}[- ]\d{3}$/,        // Poland (e.g., 00-950)
    /^\d{3}[- ]\d{2}$/,        // Czechia, Slovakia, Sweden, Greece (e.g., 110 00, 111 22)
    /^\d{3}[- ]\d{3}$/,        // Various 6-digit split systems
    /^\d{3}[- ]\d{4}$/,        // Japan (e.g., 100-0001)
    /^\d{4}[- ]\d{3}$/,        // Portugal (e.g., 1000-001)
    /^\d{5}[- ]\d{3}$/,        // Brazil (e.g., 01000-000)
    /^\d{5}[- ]\d{4}$/,        // USA ZIP+4 (e.g., 12345-6789)

    // United Kingdom (e.g., SW1A 1AA, M1 1AA, CR2 6XH, DN55 1PT, W1A 0AX)
    /^[A-Z]{1,2}\d[A-Z\d]?[- ]?\d[A-Z]{2}$/,

    // Canada (e.g., K1A 0B1, A1A 1A1)
    /^[A-CEGHJ-NPR-TVXY]\d[A-CEGHJ-NPR-TV-Z][- ]?\d[A-CEGHJ-NPR-TV-Z]\d$/,

    // Netherlands (e.g., 1234 AB)
    /^\d{4}[- ]?[A-Z]{2}$/,

    // Ireland Eircode (e.g., D02 X285, D6W 2845)
    /^(?:[A-Z]\d[\dW]|[A-Z]\d{2})[- ]?[A-Z\d]{4}$/,

    // Malta (e.g., VLT 1115)
    /^[A-Z]{3}[- ]?\d{2,4}$/,

    // Argentina (e.g., C1024CWN)
    /^[A-Z]\d{4}[A-Z]{3}$/,

    // Brunei (e.g., BT2328), Eswatini (e.g., H100)
    /^[A-Z]{2}\d{4}$/,
    /^[A-Z]\d{3}$/,

    // International country-code prefixes (e.g., LV-1050, FI-00100, SE-111 22)
    /^[A-Z]{1,2}[- ]\d{3,6}$/,
    /^[A-Z]{1,2}[- ]\d{3}[- ]\d{2}$/
  ];

  return patterns.some((pattern) => pattern.test(trimmed));
}
