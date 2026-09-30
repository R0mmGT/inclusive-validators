function validate(code) {
  // Accept only strings
  if (typeof code !== 'string') return false;

  // Trim leading/trailing whitespace and collapse internal whitespace
  const normalized = code.trim().replace(/\s+/g, ' ');

  // Must not be empty after trimming
  if (normalized.length === 0) return false;

  // Reasonable length bounds to allow international formats but block massively long input
  // (most postal codes are short; 1-20 characters covers known variations)
  if (normalized.length < 2 || normalized.length > 20) return false;

  // Allow Unicode letters, Unicode digits, whitespace, dot and hyphen (common in many countries).
  // The Unicode property escapes (\p{L}, \p{N}) ensure non-Latin scripts are accepted.
  const allowed = /^[\p{L}\p{N}\s.-]+$/u;
  if (!allowed.test(normalized)) return false;

  // Ensure there's at least one letter or digit (not just punctuation/space)
  const hasAlnum = /[\p{L}\p{N}]/u;
  return hasAlnum.test(normalized);
}
