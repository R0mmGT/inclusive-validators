function validate(input) {
  // Accept only string input
  if (typeof input !== 'string') return false;

  // Trim surrounding whitespace
  const s = input.trim();
  if (s.length === 0) return false;

  // Decide whether the environment supports Unicode property escapes
  let unicodeSupported = true;
  try {
    // This will throw if \p{} is not supported
    new RegExp('\\p{L}', 'u');
  } catch (e) {
    unicodeSupported = false;
  }

  // Allowed characters: letters, numbers, spaces and common separators (- _ /)
  const allowedRe = unicodeSupported
    ? /^[\p{L}\p{N}\s\-_/]+$/u
    : /^[A-Za-z0-9\s\-_/]+$/;

  if (!allowedRe.test(s)) return false;

  // Remove common separators to measure the "core" length
  const compact = s.replace(/[\s\-_/]+/g, '');

  // Basic length bounds: postal codes are typically at least 2 chars and rarely longer than 10
  if (compact.length < 2 || compact.length > 10) return false;

  // Ensure there's at least one letter or number (defensive)
  const alnumRe = unicodeSupported ? /[\p{L}\p{N}]/u : /[A-Za-z0-9]/;
  if (!alnumRe.test(compact)) return false;

  // Passed all checks — accept as a plausible international postal code
  return true;
}
