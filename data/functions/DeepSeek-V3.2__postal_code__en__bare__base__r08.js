function validate(postalCode) {
  // Remove any leading/trailing whitespace
  postalCode = postalCode.trim();
  
  // Check basic length (standard US ZIP codes are 5 digits or 5+4 format)
  // Also handle Canadian postal codes (A1A 1A1 format)
  
  // US ZIP code patterns
  const usZipPattern = /^\d{5}(-\d{4})?$/;
  
  // Canadian postal code pattern (letter-digit-letter digit-letter-digit)
  const canadianPattern = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
  
  // Additional common patterns for other countries:
  // UK: AAA A[A]A, A[A]A AAA, etc. (more complex)
  // Australia: 4 digits
  // For this function, we'll focus on US and Canada
  
  return usZipPattern.test(postalCode) || canadianPattern.test(postalCode);
}
