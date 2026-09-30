function validate(phone) {
  if (typeof phone !== 'string') return false;

  const trimmed = phone.trim();
  if (!trimmed) return false;

  // Must start with '+', '(', or a digit
  if (!/^[+\d(]/.test(trimmed)) return false;

  // Must end with a digit or ')'
  if (!/[\d)]$/.test(trimmed)) return false;

  // Only allowed characters: digits, spaces, hyphens, dots, parentheses, and a leading '+'
  if (!/^\+?[\d\s.\-()]+$/.test(trimmed)) return false;

  // Disallow consecutive separators
  if (/[-.]{2,}/.test(trimmed)) return false;

  // Check parentheses validity (must be balanced, properly ordered, and contain digits)
  let openCount = 0;
  for (let i = 0; i < trimmed.length; i++) {
    const char = trimmed[i];
    if (char === '(') {
      if (openCount > 0) return false; // Prevent nested parentheses
      openCount++;
    } else if (char === ')') {
      if (openCount === 0) return false; // Closing before opening
      openCount--;
    }
  }
  if (openCount !== 0) return false; // Unmatched opening parenthesis

  // Ensure content inside parentheses is strictly digits (with optional intra-spacing)
  const parenMatches = trimmed.match(/\(([^)]+)\)/g);
  if (parenMatches) {
    for (const match of parenMatches) {
      const inner = match.slice(1, -1).trim();
      if (!/^\d+$/.test(inner.replace(/[\s.-]/g, '')) || inner.length === 0) {
        return false;
      }
    }
  }

  // Count total digits: ITU-T E.164 specifies a maximum of 15 digits.
  // Standard phone numbers worldwide range between 4 and 15 digits.
  const digits = trimmed.replace(/\D/g, '');
  return digits.length >= 4 && digits.length <= 15;
}
