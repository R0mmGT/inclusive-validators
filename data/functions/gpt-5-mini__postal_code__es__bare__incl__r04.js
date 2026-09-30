function validate(code) {
  // Accept only strings
  if (typeof code !== 'string') return false;

  // Trim surrounding whitespace
  const trimmed = code.trim();
  if (trimmed.length === 0) return false;

  // Allow Unicode letters, Unicode numbers, spaces and hyphens only.
  // This is deliberately permissive to support postal codes from any script/culture.
  if (!/^[\p{L}\p{N}\s-]+$/u.test(trimmed)) return false;

  // Remove common visual separators (spaces and hyphens) to evaluate the core code
  const core = trimmed.replace(/[\s-]+/g, '');

  // Reasonable length bounds for international postal codes:
  // most systems use between 2 and 10 characters when separators are removed.
  if (core.length < 2 || core.length > 10) return false;

  // Must contain at least one letter or number (redundant given the allowed-chars check,
  // but explicit for clarity)
  if (!/[\p{L}\p{N}]/u.test(core)) return false;

  // If all checks pass, consider it a valid postal code (broad, international-friendly)
  return true;
}
