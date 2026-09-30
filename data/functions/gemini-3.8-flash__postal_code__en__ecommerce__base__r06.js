function validate(postalCode) {
  if (typeof postalCode !== 'string') {
    return false;
  }

  const trimmed = postalCode.trim();

  // Validates common postal code formats:
  // 1. US ZIP code: 5 digits, or 5+4 digits (e.g., "12345", "12345-6789", "12345 6789")
  // 2. Canadian postal code: A1A 1A1 or A1A1A1
  // 3. UK postcode: e.g., "SW1A 1AA", "W1A 0AX", "M1 1AE", "B33 8TH"
  // 4. Standard international numeric postal codes: 3 to 6 digits (e.g., France, Germany, Australia, Japan)
  //    including common hyphenated formats (e.g., "123-4567", "12-345")
  const patterns = [
    /^\d{5}(?:[-\s]\d{4})?$/,                             // US ZIP / ZIP+4
    /^[A-CEGHJ-NPR-TVXY]\d[A-CEGHJ-NPR-TV-Z][-\s]?\d[A-CEGHJ-NPR-TV-Z]\d$/i, // Canada
    /^[A-Z]{1,2}\d[A-Z\d]?[\s-]?\d[A-Z]{2}$/i,            // UK
    /^\d{4}[\s-]?[A-Z]{2}$/i,                             // Netherlands
    /^\d{2,4}[-\s]\d{3,4}$/,                              // Hyphenated numeric (e.g., JP, PL, PT)
    /^\d{3,6}$/                                           // Standard numeric (3-6 digits)
  ];

  return patterns.some((pattern) => pattern.test(trimmed));
}
