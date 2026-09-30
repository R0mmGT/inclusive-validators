function validate(postalCode) {
  if (typeof postalCode !== 'string') {
    return false;
  }

  const code = postalCode.trim();

  // Validates common postal code formats:
  // - US ZIP / ZIP+4 (e.g., "12345", "12345-6789")
  // - Canada (e.g., "A1A 1A1", "A1A-1A1", "A1A1A1")
  // - UK (e.g., "SW1A 1AA", "EC1A 1BB", "W1A 0AX")
  // - International numeric formats (3 to 6 digits, e.g., Germany, France, Australia, Japan)
  const patterns = [
    /^\d{5}(?:-\d{4})?$/,                             // US
    /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/,           // Canada
    /^[A-Za-z]{1,2}\d[A-Za-z\d]?\s*\d[A-Za-z]{2}$/,   // UK
    /^\d{3}-\d{4}$/,                                   // Japan
    /^\d{3,6}$/                                        // Generic 3-6 digit international
  ];

  return patterns.some((regex) => regex.test(code));
}
