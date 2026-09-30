function validate(input) {
  // Accept only strings
  if (typeof input !== 'string') return false;

  // Trim surrounding whitespace
  const s = input.trim();

  // Reasonable length bounds for worldwide postal codes (be permissive)
  if (s.length < 2 || s.length > 20) return false;

  // Must contain at least one letter or number from any script
  // (Unicode property escapes require the 'u' flag)
  if (!/[\p{L}\p{N}]/u.test(s)) return false;

  // Allow letters, numbers, space and a small set of commonly used separators
  // (hyphen, underscore, dot, slash, hash)
  if (!/^[\p{L}\p{N}\s\-_\.\/#]+$/u.test(s)) return false;

  // Disallow consecutive separators (e.g. "--", "  ", "__", "//", "..", "##")
  if (/[\s\-_\.\/#]{2,}/u.test(s)) return false;

  // Disallow starting or ending with a separator (space already trimmed)
  if (/^[\-_\.\/#]|[\-_\.\/#]$/u.test(s)) return false;

  // Passed all checks - treat as a plausible postal code
  return true;
}
