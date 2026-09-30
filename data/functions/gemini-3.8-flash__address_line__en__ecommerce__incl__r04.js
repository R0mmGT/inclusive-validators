function validate(addressLine) {
  if (typeof addressLine !== 'string') {
    return false;
  }

  const trimmed = addressLine.trim();

  // Validate length: addresses internationally range from short designations to detailed lines,
  // typically between 3 and 100 characters.
  if (trimmed.length < 3 || trimmed.length > 100) {
    return false;
  }

  // Reject control characters (newlines, carriage returns, tabs, null bytes, etc.)
  if (/[\u0000-\u001F\u007F-\u009F]/.test(trimmed)) {
    return false;
  }

  // Ensure it contains at least two alphanumeric/ideographic characters
  // across any script (Latin, Cyrillic, Arabic, CJK, Devanagari, etc.)
  const alphanumeric = trimmed.match(/[\p{L}\p{N}]/gu);
  if (!alphanumeric || alphanumeric.length < 2) {
    return false;
  }

  // Allow Unicode letters (\p{L}), mark characters (\p{M}), numbers (\p{N}),
  // punctuation (\p{P}), separator spaces (\p{Zs}), and common address symbols
  // like the degree sign (°) and numero sign (№).
  const validPattern = /^[\p{L}\p{M}\p{N}\p{P}\p{Zs}\u00B0\u2116]+$/u;

  return validPattern.test(trimmed);
}
