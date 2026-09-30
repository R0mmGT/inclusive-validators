function validate(postalCode) {
  if (typeof postalCode !== 'string') {
    return false;
  }

  const code = postalCode.trim().toUpperCase();
  if (!code) {
    return false;
  }

  const patterns = [
    // Standard numeric codes (3 to 8 digits): USA, Germany, France, Australia, China, etc.
    /^\d{3,8}$/,

    // Numeric codes separated by hyphen or space: USA ZIP+4, Japan, Poland, Portugal, Brazil, Sweden, etc.
    /^\d{2,5}[- ]\d{2,4}$/,

    // United Kingdom (e.g., SW1A 1AA, W1A 0AX, M1 1AE, CR2 6XH)
    /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/,

    // Canada (e.g., K1A 0B1, A1A 1A1)
    /^[A-CEGHJ-NPR-TVXY]\d[A-CEGHJ-NPR-TV-Z] ?\d[A-CEGHJ-NPR-TV-Z]\d$/,

    // Ireland / Eircode (e.g., D02 X285)
    /^[AC-FHKNPRTV-Y]\d[\dW] ?[0-9AC-FHKNPRTV-Y]{4}$/,

    // Netherlands (e.g., 1234 AB)
    /^[1-9]\d{3} ?[A-Z]{2}$/,

    // Argentina (e.g., C1024CWN)
    /^[A-Z]\d{4}[A-Z]{3}$/,

    // Malta (e.g., VLT 1115)
    /^[A-Z]{3} ?\d{4}$/,

    // Country-code prefixed numeric formats (e.g., CH-8000, LT-01100, LV-1050, D-80331)
    /^[A-Z]{1,3}[- ]\d{3,6}$/,

    // Bermuda (e.g., HM 01)
    /^[A-Z]{2} ?[A-Z0-9]{2}$/,

    // Cayman Islands (e.g., KY1-1100)
    /^[A-Z]{2}\d[- ]\d{4}$/,

    // Brunei, Eswatini, Andorra, etc. (e.g., BB1234, H100, AD100)
    /^[A-Z]{1,2}\d{3,4}$/
  ];

  return patterns.some((pattern) => pattern.test(code));
}
