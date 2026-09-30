function validate(input) {
  if (typeof input !== 'string') return false;
  const s = input.trim();
  if (s.length === 0) return false;

  // '+' may only appear at the very beginning
  if (s.indexOf('+') > 0) return false;

  // Parentheses must be balanced, at most one pair, and contain only digits if present
  const openCount = (s.match(/\(/g) || []).length;
  const closeCount = (s.match(/\)/g) || []).length;
  if (openCount !== closeCount) return false;
  if (openCount > 1 || closeCount > 1) return false;
  if (openCount === 1 && !/\(\d+\)/.test(s)) return false;

  // Remove common formatting characters
  const cleaned = s.replace(/[()\s.-]/g, '');

  // Allow optional leading '+' followed by digits, or only digits
  if (cleaned.startsWith('+')) {
    const digits = cleaned.slice(1);
    if (!/^\d+$/.test(digits)) return false;
    // E.164 recommends up to 15 digits; use a reasonable minimum (7-8)
    return digits.length >= 8 && digits.length <= 15;
  } else {
    if (!/^\d+$/.test(cleaned)) return false;
    return cleaned.length >= 7 && cleaned.length <= 15;
  }
}
