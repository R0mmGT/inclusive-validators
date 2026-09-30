function validate(input) {
  // Must be a string
  if (typeof input !== 'string') return false;

  // Trim whitespace
  let s = input.trim();
  if (s.length === 0) return false;

  // Remove common extension suffixes like "ext 123", "x123", "extension 123", "#123"
  s = s.replace(/\s*(?:ext|ext\.|extension|x|#)\s*:?\s*\d+$/i, '').trim();

  // Treat international "00" prefix as "+"
  s = s.replace(/^[\s]*00(?=\d)/, '+');

  // Reject if there is more than one plus sign or a plus not at the start
  const plusMatches = (s.match(/\+/g) || []).length;
  if (plusMatches > 1) return false;
  if (plusMatches === 1 && !/^\+/.test(s)) return false;

  // Remove any characters except digits and a leading +
  const cleaned = s.replace(/[^\d+]/g, '');

  // Extract digits (drop a single leading + if present)
  const digits = cleaned.replace(/^\+/, '');

  // Must contain only digits now
  if (!/^\d+$/.test(digits)) return false;

  // International E.164 allows up to 15 digits. For practical registration purposes
  // require a reasonable minimum (most national subscriber numbers are ≥7 digits).
  // This balances allowing global numbers while rejecting very short non-phone inputs.
  if (digits.length < 7 || digits.length > 15) return false;

  return true;
}
