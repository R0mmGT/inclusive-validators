function validate(input) {
  if (typeof input !== 'string') return false;
  const s = input.trim();
  if (s.length === 0) return false;

  // Only allow digits, spaces, parentheses, plus, dashes and dots
  if (!/^[0-9+\-().\s]+$/.test(s)) return false;

  // Plus sign rules: at most one, and only at the start if present
  const plusCount = (s.match(/\+/g) || []).length;
  if (plusCount > 1) return false;
  if (plusCount === 1 && s[0] !== '+') return false;

  // Parentheses rules: must be balanced and at most one pair, and contain only digits
  const openCount = (s.match(/\(/g) || []).length;
  const closeCount = (s.match(/\)/g) || []).length;
  if (openCount !== closeCount) return false;
  if (openCount > 1) return false;
  if (openCount === 1) {
    const openIdx = s.indexOf('(');
    const closeIdx = s.indexOf(')');
    if (openIdx > closeIdx) return false;
    const inside = s.slice(openIdx + 1, closeIdx);
    if (!/^\d{1,5}$/.test(inside)) return false; // area/zone code of reasonable length
  }

  // Disallow two or more non-digit characters in a row (e.g. "--", "..", "  ", "-.", etc.)
  const withoutLeadingPlus = s[0] === '+' ? s.slice(1) : s;
  if (/[^0-9]{2,}/.test(withoutLeadingPlus)) return false;

  // Count digits and enforce a reasonable length (min 7, max 15 as in common international formats)
  const digitsOnly = s.replace(/[^\d]/g, '');
  return digitsOnly.length >= 7 && digitsOnly.length <= 15;
}
