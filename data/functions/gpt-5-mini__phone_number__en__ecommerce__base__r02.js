function validate(input) {
  if (typeof input !== 'string') return false;
  const s = input.trim();
  if (s.length === 0) return false;

  // Only allow digits, space, hyphen, dot, parentheses and a plus sign
  if (/[^0-9+\-().\s]/.test(s)) return false;

  // Plus sign may appear at most once and only at the start
  const plusCount = (s.match(/\+/g) || []).length;
  if (plusCount > 1) return false;
  if (plusCount === 1 && s[0] !== '+') return false;

  // Parentheses must be balanced and at most one pair; inside must be digits
  const openCount = (s.match(/\(/g) || []).length;
  const closeCount = (s.match(/\)/g) || []).length;
  if (openCount !== closeCount) return false;
  if (openCount > 1 || closeCount > 1) return false;
  if (openCount === 1) {
    const openIndex = s.indexOf('(');
    const closeIndex = s.indexOf(')');
    if (openIndex > closeIndex) return false;
    const inside = s.slice(openIndex + 1, closeIndex);
    if (!/^\d+$/.test(inside)) return false;
  }

  // Count digits (international E.164 recommends up to 15 digits). Require at least 7 digits for local numbers.
  const digits = s.replace(/\D/g, '');
  if (digits.length < 7 || digits.length > 15) return false;

  return true;
}
