function validate(postalCode) {
  if (typeof postalCode !== 'string') {
    return false;
  }

  const trimmed = postalCode.trim();
  if (!trimmed) {
    return false;
  }

  const patterns = [
    // Pure numeric postal codes: 3 to 10 digits (e.g., US, FR, DE, IT, ES, AU, IN, CN, RU)
    /^\d{3,10}$/,

    // Numeric postal codes with a hyphen or space separator (e.g., US ZIP+4, JP, BR, PL, PT, SE, CZ, SK, KR)
    /^\d{2,5}[-\s]\d{2,5}$/,

    // United Kingdom (e.g., SW1A 1AA, EC1A 1BB, W1A 0AX, M1 1AE, B33 8TH)
    /^[A-Z]{1,2}\d[A-Z\d]?[\s-]?\d[A-Z]{2}$/i,

    // Canada (e.g., K1A 0B1, alternating alphanumeric, excludes certain letters)
    /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][\s-]?\d[ABCEGHJ-NPRSTV-Z]\d$/i,

    // Ireland (Eircode: e.g., D02 X285)
    /^(?:[AC-FHKNPRTV-Y]\d{2}|D6W)[\s-]?[0-9AC-FHKNPRTV-Y]{4}$/i,

    // Netherlands (4 digits followed by 2 letters, e.g., 1012 AB)
    /^[1-9]\d{3}[\s-]?[A-Z]{2}$/i,

    // Argentina (e.g., C1024CWN)
    /^[A-Z]\d{4}[A-Z]{3}$/i,

    // Malta (e.g., VLT 1115)
    /^[A-Z]{3}[\s-]?\d{2,4}$/i,

    // Country-prefixed codes (e.g., D-70173, CH-8001, LT-01100, AD100)
    /^[A-Z]{1,3}[-\s]?\d{2,6}$/i,

    // Islands, territories, and minor formats (e.g., Bermuda HM BX, Brunei BT2328)
    /^[A-Z]{2}[\s-]?[A-Z0-9]{2,4}$/i
  ];

  return patterns.some((pattern) => pattern.test(trimmed));
}
