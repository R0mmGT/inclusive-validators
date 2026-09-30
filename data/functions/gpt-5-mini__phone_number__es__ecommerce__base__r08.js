function validate(phone) {
  if (typeof phone !== 'string') return false;
  const s = phone.trim();
  if (s.length === 0) return false;

  // Only one '+' allowed and if present must be at the start
  const plusCount = (s.match(/\+/g) || []).length;
  if (plusCount > 1) return false;
  if (plusCount === 1 && s[0] !== '+') return false;

  // Allowed characters: digits, space, parentheses, dot, hyphen, plus
  if (!/^[\d+\s().-]+$/.test(s)) return false;

  // Parentheses must be balanced, non-empty and contain only digits, spaces or hyphens
  const stack = [];
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (ch === '(') {
      stack.push(i);
    } else if (ch === ')') {
      if (stack.length === 0) return false;
      const openIndex = stack.pop();
      const inside = s.slice(openIndex + 1, i);
      if (inside.length === 0) return false; // no empty "()"
      if (!/^[\d\s-]+$/.test(inside)) return false;
    }
  }
  if (stack.length !== 0) return false; // unmatched '('

  // Count digits (E.164 max length is 15). Accept common local numbers down to 7 digits.
  const digitCount = (s.match(/\d/g) || []).length;
  if (digitCount < 7 || digitCount > 15) return false;

  return true;
}
