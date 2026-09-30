function validate(postalCode) {
  if (typeof postalCode !== 'string') {
    return false;
  }

  const code = postalCode.trim();

  // Validates common postal code formats across various countries:
  // - US ZIP and ZIP+4 (e.g., 12345, 12345-6789)
  // - Canada (e.g., A1A 1A1, A1A1A1)
  // - UK (e.g., SW1A 1AA, M1 1AE, CR2 6XH)
  // - Netherlands (e.g., 1234 AB)
  // - Japan (e.g., 123-4567)
  // - Ireland / Eircode (e.g., D02 X285)
  // - Generic numeric formats (3 to 10 digits, covering Germany, France, Australia, India, etc.)
  const patterns = [
    /^\d{5}(-\d{4})?$/,                                                      // US
    /^[A-CEGHJ-NPR-TVXY]\d[A-CEGHJ-NPR-TV-Z][ -]?\d[A-CEGHJ-NPR-TV-Z]\d$/i,  // Canada
    /^[A-Z]{1,2}\d[A-Z\d]?\s*\d[A-Z]{2}$/i,                                  // UK
    /^\d{4}\s?[A-Z]{2}$/i,                                                    // Netherlands
    /^[A-Z]\d{2}\s?[A-Z\d]{4}$/i,                                            // Ireland
    /^\d{3}-\d{4}$/,                                                         // Japan
    /^\d{3,10}$/                                                             // General numeric (3-10 digits)
  ];

  return patterns.some((pattern) => pattern.test(code));
}
