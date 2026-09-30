function validate(address) {
  // Basic type check
  if (typeof address !== 'string') return false;

  // Trim surrounding whitespace
  const s = address.trim();

  // Reasonable length bounds for a single address line (configurable)
  if (s.length < 3 || s.length > 256) return false;

  // Disallow newline/control characters (must be a single line)
  // \p{Cc} matches Unicode control characters; 'u' flag is required for Unicode property escapes.
  if (/[\p{Cc}]/u.test(s)) return false;

  // Require at least one letter or number from any script (covers international alphabets and numerals)
  if (!/[\p{L}\p{N}]/u.test(s)) return false;

  // Disallow common injection-looking characters that should not appear in an address line (conservative)
  // Note: angle brackets are commonly used in markup and rarely part of an address line.
  if (/[<>]/.test(s)) return false;

  // Reject strings that look exactly like an email address (addresses should not be an email)
  // This is a conservative check: an email-like token with no spaces will be rejected.
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s)) return false;

  // Reject extremely repetitive punctuation/symbol sequences (e.g., "-----", "!!!!!!")
  // Allow small repetitions (common in abbreviations), but not long runs.
  if (/([^\p{L}\p{N}\s])\1{4,}/u.test(s)) return false;

  // If we reach here, the line passes the heuristic checks
  return true;
}
