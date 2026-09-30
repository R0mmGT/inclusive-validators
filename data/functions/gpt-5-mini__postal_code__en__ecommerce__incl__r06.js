function validate(postal) {
  // Accept only strings
  if (typeof postal !== 'string') return false;

  // Trim surrounding whitespace
  const s = postal.trim();

  // Reasonable length bounds for international postal codes.
  // Most postal codes fall between 2 and 12 characters (including separators like space or hyphen).
  if (s.length < 2 || s.length > 12) return false;

  // Reject control characters
  if (/[\u0000-\u001F\u007F]/.test(s)) return false;

  // Reject angle brackets to avoid simple injection-like values
  if (/[<>]/.test(s)) return false;

  // Allow Unicode letters, Unicode digits, whitespace, hyphen and slash.
  // This keeps validation permissive for different scripts and formats (e.g. "SW1A 1AA", "K1A 0B1", "12345-6789", "〒150-0001").
  // Uses Unicode property escapes (ES2018+) to support letters/digits from all scripts.
  const allowed = /^[\p{L}\p{N}\s\-\/]{2,12}$/u;
  if (!allowed.test(s)) return false;

  // Ensure there is at least one letter or digit (not only spaces or separators)
  if (!/[\p{L}\p{N}]/u.test(s)) return false;

  return true;
}
