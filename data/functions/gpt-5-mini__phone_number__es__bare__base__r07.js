function validate(input) {
  if (typeof input !== 'string') return false;
  let s = input.trim();
  if (s === '') return false;

  // Treat international prefix "00" as "+"
  if (/^00/.test(s)) s = '+' + s.slice(2);

  // Only one optional leading '+' allowed
  const plusMatches = (s.match(/\+/g) || []).length;
  if (plusMatches > 1) return false;
  if (plusMatches === 1 && s[0] !== '+') return false;

  // Allow only digits, spaces, parentheses, dots, hyphens and an optional leading +
  if (!/^[+\d\s().-]+$/.test(s)) return false;

  // Parentheses rules: either none or exactly one pair, properly ordered, containing only 1-6 digits
  const openCount = (s.match(/\(/g) || []).length;
  const closeCount = (s.match(/\)/g) || []).length;
  if (openCount !== closeCount) return false;
  if (openCount > 1 || closeCount > 1) return false;
  if (openCount === 1) {
    const openIdx = s.indexOf('(');
    const closeIdx = s.indexOf(')');
    if (openIdx > closeIdx) return false;
    const inside = s.slice(openIdx + 1, closeIdx);
    if (!/^\d{1,6}$/.test(inside)) return false;
  }

  // Remove common separators
  const normalized = s.replace(/[\s().-]/g, '');

  // Must be only digits with optional leading +
  if (!/^\+?\d+$/.test(normalized)) return false;

  // Validation based on presence of international +:
  if (normalized[0] === '+') {
    const digits = normalized.slice(1);
    // E.164-like rule: country code can't start with 0, total digits between 8 and 15
    if (!/^[1-9]\d{7,14}$/.test(digits)) return false;
  } else {
    // Local numbers: accept 7 to 15 digits
    if (!/^\d{7,15}$/.test(normalized)) return false;
  }

  return true;
}
