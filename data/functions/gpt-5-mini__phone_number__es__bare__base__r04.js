function validate(input) {
  if (typeof input !== 'string') return false;
  const s = input.trim();
  if (s.length === 0) return false;

  // Only allow digits, spaces, parentheses, plus, dots and hyphens
  if (!/^[0-9()+\s.\-]+$/.test(s)) return false;

  // Plus sign, if present, must appear only once and at the start
  const plusMatches = (s.match(/\+/g) || []).length;
  if (plusMatches > 1) return false;
  if (plusMatches === 1 && s[0] !== '+') return false;

  // Parentheses must be balanced and, if present, only one pair enclosing 1-4 digits
  const openCount = (s.match(/\(/g) || []).length;
  const closeCount = (s.match(/\)/g) || []).length;
  if (openCount !== closeCount) return false;
  if (openCount > 1 || closeCount > 1) return false;
  if (openCount === 1) {
    const m = s.match(/\(([^)]+)\)/);
    if (!m) return false;
    if (!/^\d{1,4}$/.test(m[1])) return false;
  }

  // Count digits: require a reasonable phone length (commonly between 7 and 15 digits)
  const digitCount = (s.match(/\d/g) || []).length;
  if (digitCount < 7 || digitCount > 15) return false;

  // Reject strings that start or end with a separator (space, dot, hyphen)
  if (/^[\s.\-]/.test(s) || /[\s.\-]$/.test(s)) return false;

  return true;
}
