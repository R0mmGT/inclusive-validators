function validate(str) {
  if (typeof str !== 'string') return false;

  const trimmed = str.trim();
  if (!trimmed) return false;

  // Allow only digits, an optional leading '+', and separators: spaces, hyphens, dots, slashes, parentheses
  if (!/^\+?[0-9\s\-./()]+$/.test(trimmed)) return false;

  // A '+' sign may only appear once at the very beginning
  if (trimmed.includes('+') && !trimmed.startsWith('+')) return false;

  // Must end with a digit or closing parenthesis
  if (!/[0-9)]$/.test(trimmed)) return false;

  // Disallow consecutive punctuation marks (e.g., '--', '..')
  if (/[-./]{2,}/.test(trimmed)) return false;

  // Parentheses must be balanced, at most one pair, and enclose only digits
  const openCount = (trimmed.match(/\(/g) || []).length;
  const closeCount = (trimmed.match(/\)/g) || []).length;
  if (openCount !== closeCount || openCount > 1) return false;
  if (openCount === 1) {
    const parenMatch = trimmed.match(/\((.*?)\)/);
    if (!parenMatch || !/^\d+$/.test(parenMatch[1])) return false;
  }

  // Extract digits and validate length against ITU-T E.164 (4 to 15 digits, accounting for '00' exit code)
  const digits = trimmed.replace(/\D/g, '');
  let digitCount = digits.length;
  if (trimmed.startsWith('00')) {
    digitCount -= 2;
  }

  return digitCount >= 4 && digitCount <= 15;
}
