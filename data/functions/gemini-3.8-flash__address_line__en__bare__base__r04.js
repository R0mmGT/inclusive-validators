function validate(address) {
  if (typeof address !== 'string') {
    return false;
  }

  const trimmed = address.trim();

  // Typical address lines are between 3 and 100 characters
  if (trimmed.length < 3 || trimmed.length > 100) {
    return false;
  }

  // Allow unicode letters, numbers, spaces, and common address punctuation (.,'#/-)
  if (!/^[\p{L}\p{N}\s.,'#\/-]+$/u.test(trimmed)) {
    return false;
  }

  // Must contain at least one letter
  if (!/\p{L}/u.test(trimmed)) {
    return false;
  }

  // Must contain at least one digit (street/building/unit number) or be a PO Box
  const hasNumber = /\p{N}/u.test(trimmed);
  const isPOBox = /^(post\s+office\s+box|p\.?\s*o\.?\s*box)\b/iu.test(trimmed);

  if (!hasNumber && !isPOBox) {
    return false;
  }

  // Must consist of at least two separated components (e.g., number and street name)
  const tokens = trimmed.split(/\s+/);
  if (tokens.length < 2) {
    return false;
  }

  return true;
}
