function validate(phone) {
  if (typeof phone !== 'string') return false;

  const trimmed = phone.trim();

  // Basic sanity check on length (E.164 allows up to 15 digits plus formatting)
  if (!trimmed || trimmed.length > 25) return false;

  // Allow only digits, whitespace, hyphens, periods, parentheses, and an optional leading '+'
  if (!/^\+?[\d\s\-().]+$/.test(trimmed)) return false;

  // Disallow leading separators (other than '+') or trailing separators
  if (/^\+?[\s\-.]/.test(trimmed) || /[\s\-.]\s*$/.test(trimmed)) return false;

  // Disallow repeated consecutive punctuation marks (e.g., '--', '..')
  if (/[-.]{2,}/.test(trimmed)) return false;

  // Validate balanced parentheses (at most one pair, containing valid digits/content)
  const openCount = (trimmed.match(/\(/g) || []).length;
  const closeCount = (trimmed.match(/\)/g) || []).length;

  if (openCount !== closeCount || openCount > 1) return false;

  if (openCount === 1) {
    const openIdx = trimmed.indexOf('(');
    const closeIdx = trimmed.indexOf(')');
    if (openIdx >= closeIdx) return false;

    const inside = trimmed.slice(openIdx + 1, closeIdx);
    if (!/^\+?[\d\s-]+$/.test(inside) || !/\d/.test(inside)) return false;
  }

  // Extract digits and check ITU-T E.164 length limits:
  // Standard phone numbers globally have between 6 and 15 digits
  const digits = trimmed.replace(/\D/g, '');
  return digits.length >= 6 && digits.length <= 15;
}
