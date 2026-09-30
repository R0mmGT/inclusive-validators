function validate(code) {
  if (typeof code !== 'string') {
    return false;
  }

  // Matches standard US ZIP codes (12345 or 12345-6789)
  const usZipRegex = /^\d{5}(-\d{4})?$/;

  // Matches standard Canadian postal codes (e.g., A1A 1A1, A1A1A1, A1A-1A1)
  const caPostalRegex = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;

  return usZipRegex.test(code.trim()) || caPostalRegex.test(code.trim());
}
