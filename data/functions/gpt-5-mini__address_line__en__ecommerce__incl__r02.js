function validate(line) {
  // Basic type check
  if (typeof line !== 'string') return false;

  // Trim whitespace at ends (but keep internal spacing)
  const str = line.trim();

  // Reasonable length limits for an address line (adjustable)
  if (str.length < 2 || str.length > 200) return false;

  // Disallow newline characters (addresses should be a single line)
  if (/[\r\n]/.test(str)) return false;

  // Disallow invisible/control characters (Unicode "Other" categories)
  // \p{C} covers Unicode control and other unprintable characters
  if (/\p{C}/u.test(str)) return false;

  // Require at least one letter or number from any script (prevents strings like "!!!" or "@@@")
  if (!/[\p{L}\p{N}]/u.test(str)) return false;

  // Reject extremely long runs of the same non-alphanumeric character (e.g. "!!!!!!!")
  // This helps block obvious junk while allowing normal punctuation like "No. 5" or "Apt ###".
  if (/([^\p{L}\p{N}\s])\1{4,}/u.test(str)) return false;

  // Reject excessively long runs of whitespace (likely pasted garbage)
  if (/\s{5,}/u.test(str)) return false;

  // Common valid characters include letters, numbers, marks, punctuation, symbols and whitespace.
  // We keep this broad to support international address formats, but prohibit control characters above.
  // As a final sanity check, ensure the string contains at least one printable character besides punctuation/space:
  // (letters/numbers already checked above), so we're good.

  return true;
}
