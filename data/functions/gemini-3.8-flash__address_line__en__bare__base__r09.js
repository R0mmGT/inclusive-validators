function validate(address) {
  if (typeof address !== 'string') {
    return false;
  }

  const trimmed = address.trim();

  // Basic length validation
  if (trimmed.length < 3 || trimmed.length > 100) {
    return false;
  }

  // Ensure only valid address characters are present (letters, numbers, spaces, and common punctuation)
  const validCharPattern = /^[\p{L}\p{N}\s.,'#\/-]+$/u;
  if (!validCharPattern.test(trimmed)) {
    return false;
  }

  // Must contain both letters and numbers (e.g., "123 Main St"), or match a P.O. Box format
  const hasLetter = /\p{L}/u.test(trimmed);
  const hasNumber = /\p{N}/u.test(trimmed);
  const isPoBox = /^(?:p\.?\s*o\.?\s*box|post\s+office\s+box)\b/iu.test(trimmed);

  return (hasLetter && hasNumber) || isPoBox;
}
