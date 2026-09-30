function validate(input) {
  if (typeof input !== 'string') return false;
  let s = input.trim();
  if (!s) return false;

  // Strip common extension markers and following digits (they are optional)
  s = s.replace(/\s*(?:ext|ext\.|extension|x|#)\s*:?\s*\d+$/i, '');

  // Accept international dialing prefixes by normalising them to '+'
  s = s.replace(/^\s*00/, '+').replace(/^\s*011/, '+');

  // Allow only digits, space and common separators, and an optional leading +
  if (!/^\+?[0-9\s\-\.\(\)\/]+$/.test(s)) return false;

  // Parentheses must be balanced
  const open = (s.match(/\(/g) || []).length;
  const close = (s.match(/\)/g) || []).length;
  if (open !== close) return false;

  // Ensure parentheses (if any) only contain digits and allowed separators
  const parenGroups = s.match(/\([^()]*\)/g) || [];
  for (const grp of parenGroups) {
    if (!/^\(\s*[0-9\s\-\.\\/]*\s*\)$/.test(grp)) return false;
  }

  // Extract digits only for length checks (E.164 max is 15 digits)
  const digits = s.replace(/\D/g, '');
  if (digits.length < 4 || digits.length > 15) return false;

  // If it uses a + international prefix, the first digit after + must not be 0 (E.164)
  if (/^\+/.test(s) && digits.charAt(0) === '0') return false;

  return true;
}
