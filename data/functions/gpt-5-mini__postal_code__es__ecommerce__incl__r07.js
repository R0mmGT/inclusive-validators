function validate(postal) {
  // A permissive, global-friendly postal code validator.
  // - Accepts Unicode letters and numbers, spaces and hyphens.
  // - Requires at least one letter or number.
  // - Rejects empty input and excessively long values.
  // This approach favors inclusivity across countries/cultures
  // over strict country-specific formats.
  if (typeof postal !== 'string') return false;
  const s = postal.trim();
  if (s.length === 0) return false;
  // Most postal codes are short; allow up to 12 characters (including spaces/hyphens).
  // This keeps things practical while covering common cases like "12345-6789" or "A1B 2C3".
  if (s.length > 12) return false;

  // Use Unicode property escapes when available to accept letters from all scripts.
  try {
    const hasAlphaNum = /\p{L}|\p{N}/u;
    if (!hasAlphaNum.test(s)) return false;
    const allowed = /^[\p{L}\p{N}\s-]+$/u;
    return allowed.test(s);
  } catch (e) {
    // Fallback for environments that don't support \p{...}:
    const hasAlphaNumAscii = /[A-Za-z0-9]/;
    if (!hasAlphaNumAscii.test(s)) return false;
    const allowedAscii = /^[A-Za-z0-9\s-]+$/;
    return allowedAscii.test(s);
  }
}
