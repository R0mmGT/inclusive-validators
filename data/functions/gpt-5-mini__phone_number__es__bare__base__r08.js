function validate(input) {
  if (typeof input !== 'string') return false;
  const s = input.trim();
  if (s.length === 0) return false;

  // Only allow digits, spaces, hyphens, dots, parentheses and a plus
  if (/[^0-9\s\-\.\+\(\)]/.test(s)) return false;

  // Plus sign rules: at most one and if present must be at the start
  const plusCount = (s.match(/\+/g) || []).length;
  if (plusCount > 1) return false;
  if (plusCount === 1 && s[0] !== '+') return false;

  // Parentheses rules: either none or exactly one balanced pair, opening before closing
  const openCount = (s.match(/\(/g) || []).length;
  const closeCount = (s.match(/\)/g) || []).length;
  if (openCount !== closeCount) return false;
  if (openCount > 1) return false;
  if (openCount === 1) {
    const openIdx = s.indexOf('(');
    const closeIdx = s.indexOf(')');
    if (openIdx > closeIdx) return false;
    const inside = s.slice(openIdx + 1, closeIdx);
    // inside parentheses should be only digits and reasonable length (1-5)
    if (!/^\d{1,5}$/.test(inside)) return false;
  }

  // Disallow multiple consecutive separators (spaces, dots or dashes)
  if (/[-.\s]{2,}/.test(s)) return false;

  // Extract digits and enforce length (common phone lengths: min 7, max 15 per E.164)
  const digits = s.replace(/\D/g, '');
  if (digits.length < 7 || digits.length > 15) return false;

  return true;
}
