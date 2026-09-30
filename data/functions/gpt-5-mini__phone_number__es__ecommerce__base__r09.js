function validate(phone) {
  if (typeof phone !== 'string') return false;
  const s = phone.trim();
  if (s.length === 0) return false;

  // Allowed characters: digits, spaces, parentheses, hyphen, dot and optional leading '+'
  if (!/^[+\d\s().-]+$/.test(s)) return false;

  // '+' only allowed at the start and at most once
  const plusMatches = (s.match(/\+/g) || []).length;
  if (plusMatches > 1) return false;
  if (plusMatches === 1 && s[0] !== '+') return false;

  // Parentheses must be balanced and correctly ordered
  let balance = 0;
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (ch === '(') balance++;
    else if (ch === ')') {
      balance--;
      if (balance < 0) return false; // closing before opening
    }
  }
  if (balance !== 0) return false;

  // Strip everything except digits and count them
  const digits = s.replace(/\D/g, '');
  // Basic sensible limits: at least 7 digits (local) and at most 15 digits (E.164 max)
  if (digits.length < 7 || digits.length > 15) return false;

  // If there's a leading '+', enforce E.164 max (already covered) and that first digit isn't 0
  if (s[0] === '+' && digits[0] === '0') return false;

  return true;
}
