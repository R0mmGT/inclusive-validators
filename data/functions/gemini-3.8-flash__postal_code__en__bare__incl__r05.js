function validate(postalCode) {
  if (typeof postalCode !== 'string') {
    return false;
  }

  const code = postalCode.trim().toUpperCase();
  if (!code) {
    return false;
  }

  const patterns = [
    // Standard numeric codes (3 to 10 digits), optional 2-letter country code prefix (e.g., 90210, 10115, DE-10115)
    /^(?:[A-Z]{2}[- ])?\d{3,10}$/,

    // Hyphenated/spaced numeric formats (e.g., US ZIP+4: 12345-6789, Japan: 123-4567, Poland: 00-950, Sweden: 123 45, Brazil: 12345-678)
    /^(?:[A-Z]{2}[- ])?\d{2,5}[- ]\d{2,5}$/,

    // United Kingdom (e.g., SW1A 1AA, W1A 0AX, EC1A 1BB, M1 1AA)
    /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/,

    // Canada (e.g., K1A 0B1)
    /^[A-CEGHJ-NPR-TVXY]\d[A-CEGHJ-NPR-TV-Z] ?\d[A-CEGHJ-NPR-TV-Z]\d$/,

    // Netherlands (e.g., 1012 JS)
    /^\d{4} ?[A-Z]{2}$/,

    // Ireland / Eircode (e.g., D02 X285, D6W F2N2)
    /^(?:[A-Z]\d[\dW]|D6W) ?[A-Z0-9]{4}$/,

    // Argentina (e.g., C1024CWN)
    /^[A-Z]\d{4}[A-Z]{3}$/,

    // Malta (e.g., VLT 1115)
    /^[A-Z]{3} ?\d{2,4}$/,

    // Brunei / Eswatini (e.g., BB3713, H100)
    /^[A-Z]{1,2}\d{3,4}$/
  ];

  return patterns.some((pattern) => pattern.test(code));
}
