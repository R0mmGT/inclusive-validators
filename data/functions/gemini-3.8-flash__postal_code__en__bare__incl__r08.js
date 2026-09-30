function validate(postalCode) {
  if (typeof postalCode !== 'string') {
    return false;
  }

  const code = postalCode.trim();
  if (!code) {
    return false;
  }

  const patterns = [
    // Standard numeric formats: 3 to 10 digits (e.g., US, France, Germany, China, India)
    /^\d{3,10}$/,
    // Separated numeric formats (e.g., US ZIP+4, Japan, Brazil, Poland, Portugal, Sweden, Czechia)
    /^\d{2,5}[-\s]\d{2,5}$/,
    // UK & British Territories (e.g., SW1A 1AA, W1A 0AX, EC1A 1BB, TKCA 1ZZ, GIR 0AA)
    /^[A-Z]{1,4}\d[A-Z\d]?\s?\d[A-Z]{2}$/i,
    // Canada (e.g., K1A 0B1)
    /^[A-CEGHJ-NPR-TV-Z]\d[A-CEGHJ-NPR-TV-Z]\s?\d[A-CEGHJ-NPR-TV-Z]\d$/i,
    // Netherlands (e.g., 1012 AB)
    /^\d{4}\s?[A-Z]{2}$/i,
    // Ireland & Kazakhstan (e.g., D02 X285, D6W 284A, Z05K4F8)
    /^[A-Z][A-Z\d]{2}\s?[A-Z\d]{4}$/i,
    // Malta (e.g., VLT 1115)
    /^[A-Z]{3}\s?\d{2,4}$/i,
    // Argentina (e.g., C1024CWN, C1024 CWN)
    /^[A-Z]\d{4}\s?[A-Z]{3}$/i,
    // Prefixed alphanumeric/numeric formats (e.g., AD100, MC-98000, AZ 1000, BB3713, KY1-1100)
    /^[A-Z]{1,3}\d{0,2}[-\s]?\d{3,6}$/i,
    // Bermuda (e.g., HM 01, HM BX)
    /^[A-Z]{2}\s?([A-Z]{2}|\d{2})$/i
  ];

  const isValid = (str) => patterns.some((pattern) => pattern.test(str));

  // Validate directly or with optional ISO country-code prefix (e.g., "FR-75001", "DE 10115")
  return isValid(code) || isValid(code.replace(/^[A-Z]{2}[-\s]/i, ''));
}
