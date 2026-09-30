function validate(input) {
  // Basic type check
  if (typeof input !== 'string') return false;

  // Trim whitespace
  let s = input.trim();
  if (s.length === 0) return false;

  // Remove common extension patterns (e.g. "ext 123", "x123", "extension:123")
  s = s.replace(/\s*(?:ext|x|extension)\.?:?\s*\d+$/i, '').trim();

  // Reject if there are letters remaining (we allow only digits and a few punctuation characters)
  // This prevents things like "callme123" being accepted.
  if (/[A-Za-z]/.test(s)) return false;

  // Normalize international prefix: replace leading "00" with "+"
  s = s.replace(/^00(?=\d)/, '+');

  // Remove common formatting characters (spaces, dashes, dots, parentheses)
  const normalized = s.replace(/[()\s.\-]/g, '');

  // Must be either digits or a leading + followed by digits
  if (!/^\+?\d+$/.test(normalized)) return false;

  // Count digits (exclude leading +)
  const digits = normalized.replace(/^\+/, '');
  const len = digits.length;

  // E.164 defines a maximum of 15 digits; set a practical minimum of 4 digits.
  // This balances global variety while preventing obviously invalid strings.
  if (len < 4 || len > 15) return false;

  // If number is in international form (starts with + or originally with 00),
  // the country code must not start with 0 (per ITU-T E.164)
  if (normalized[0] === '+' && digits[0] === '0') return false;

  // Passed basic international-friendly validation
  return true;
}
