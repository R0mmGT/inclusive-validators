function validate(addr) {
  // Accept only strings
  if (typeof addr !== 'string') return false;

  // Trim only ends; interior whitespace is allowed
  const s = addr.trim();

  // Must be non-empty and not ridiculously long (adjustable)
  if (s.length === 0 || s.length > 200) return false;

  // Single-line requirement: disallow newlines or CRs
  if (/[\r\n]/.test(s)) return false;

  // Reject control characters (C0/C1 and unpaired surrogates)
  // \p{C} matches other, control, unassigned; requires Unicode flag
  if (/\p{C}/u.test(s)) return false;

  // Require at least one letter or number from any script to avoid
  // strings that are only punctuation or separators.
  if (!/[\p{L}\p{N}]/u.test(s)) return false;

  // Passed basic, inclusive checks — treat as a valid street address line
  return true;
}
