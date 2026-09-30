function validate(input) {
  if (typeof input !== 'string') return false;
  let s = input.trim();
  if (!s) return false;

  // Remove common extension markers and trailing extension digits (e.g. "ext 123", "x123", "#123")
  s = s.replace(/\s*(?:ext\.?|extension|x|#)\s*:?\s*\d+$/i, '').trim();

  // Allowed characters in the remaining string: digits, spaces, parentheses, dots, dashes and an optional leading plus
  if (!/^\+?[0-9()\s.\-]+$/.test(s)) return false;

  // Parentheses must be balanced
  const open = (s.match(/\(/g) || []).length;
  const close = (s.match(/\)/g) || []).length;
  if (open !== close) return false;

  // Remove all non-digit characters to count digits
  const digits = s.replace(/\D/g, '');

  // E.164 specifies a maximum of 15 digits for international numbers.
  // Many local numbers are shorter; require a reasonable minimum (7) for typical phone numbers used in registrations.
  // This strikes a balance between accepting international formats and rejecting obviously invalid inputs.
  if (digits.length < 7 || digits.length > 15) return false;

  // Reject strings with more than one leading plus or a plus not at the start
  if ((s.match(/\+/g) || []).length > 1) return false;
  if (s.indexOf('+') > 0) return false;

  return true;
}
