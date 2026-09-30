function validate(input) {
  // Basic type check
  if (typeof input !== 'string') return false;
  let s = input.trim();
  if (!s) return false;

  // Remove common extension suffixes like "ext 123", "x123", "extension: 123", "#123"
  // This removes the extension marker and any trailing digits after it.
  s = s.replace(/\s*(?:ext\.?|extension|x|#)[\s:\.\-]*\d*$/i, '');

  // Normalize fullwidth plus sign to ASCII plus
  s = s.replace(/\uFF0B/g, '+');

  // Remove common separators: spaces (including NBSP), hyphens, dots, slashes and parentheses/brackets
  s = s.replace(/[\s\-\.\u00A0\u2007\u202F()\/\[\]]+/g, '');

  // Allow international prefixes written as "+" or "00"
  if (s.startsWith('+')) {
    s = s.slice(1);
  } else if (s.startsWith('00')) {
    s = s.slice(2);
  }

  // After stripping, the remaining characters should be only Unicode decimal digits.
  // Use Unicode property escapes to allow digits from all scripts (e.g. Arabic-Indic).
  // If the environment doesn't support Unicode property escapes, this will throw; most modern engines support it.
  if (!/^\p{Nd}+$/u.test(s)) return false;

  // Count the number of decimal-digit characters (Unicode-aware)
  const digits = s.match(/\p{Nd}/gu) || [];
  const len = digits.length;

  // Use a sensible global range for phone number digits:
  // Minimum 7 digits (covers local short numbers in many places) up to 15 digits (maximum per E.164).
  if (len < 7 || len > 15) return false;

  return true;
}
