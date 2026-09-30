function validate(postalCode) {
  if (typeof postalCode !== 'string') {
    return false;
  }

  const code = postalCode.trim();

  const patterns = [
    // Standard numeric codes: 3 to 10 digits (e.g., USA, France, Germany, Japan, India, etc.)
    /^\d{3,10}$/,

    // Numeric codes with a separator (e.g., USA ZIP+4 "12345-6789", Japan "123-4567", Poland "12-345", Sweden "123 45", Portugal "1234-567")
    /^\d{2,5}[-\s]\d{2,5}$/,

    // United Kingdom (e.g., "SW1A 1AA", "EC1A 1BB", "M1 1AE", "B33 8TH")
    /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i,

    // Canada (e.g., "K1A 0B1")
    /^[A-CEGHJ-NPR-TV-Z]\d[A-CEGHJ-NPR-TV-Z]\s*\d[A-CEGHJ-NPR-TV-Z]\d$/i,

    // Netherlands (e.g., "1234 AB")
    /^[1-9]\d{3}\s*[A-Z]{2}$/i,

    // Ireland / Eircode (e.g., "D02 X285")
    /^(?:[AC-FHKNPRTV-Y]\d{2}|D6W)\s*[0-9AC-FHKNPRTV-Y]{4}$/i,

    // Argentina (e.g., "C1024CWN")
    /^[A-Z]\d{4}[A-Z]{3}$/i,

    // Malta (e.g., "VLT 1115")
    /^[A-Z]{3}\s*\d{2,4}$/i,

    // Country-code prefixed codes (e.g., Latvia "LV-1050", Andorra "AD500", Azerbaijan "AZ1000", Moldova "MD-2001")
    /^[A-Z]{2}[-\s]?\d{3,5}$/i,

    // British Overseas Territories & Cayman Islands (e.g., "TKCA 1ZZ", "KY1-1100")
    /^[A-Z]{4}\s*1ZZ$/i,
    /^[A-Z]{2}\d[-\s]?\d{4}$/i,

    // Kazakhstan (new alphanumeric standard, e.g., "Z05H0F3")
    /^[A-Z]\d{2}[A-Z\d]{4}$/i,

    // Eswatini / Swaziland (e.g., "H100")
    /^[A-Z]\d{3}$/i
  ];

  return patterns.some((pattern) => pattern.test(code));
}
