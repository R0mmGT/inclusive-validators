function validate(postal) {
  // Accept only strings
  if (typeof postal !== 'string') return false;

  // Trim surrounding whitespace
  const s = postal.trim();

  // Must not be empty
  if (s.length === 0) return false;

  // Reasonable length bounds to cover international postal codes (e.g. "12345-6789", "SW1A 1AA", "A1A 1A1", "123-4567")
  // Allow up to 12 characters (letters/digits plus spaces and common separators). Adjust if you need looser/tighter bounds.
  if (s.length > 12) return false;

  // Must contain at least one letter or number (supports Unicode letters and numbers)
  if (!/[\p{L}\p{N}]/u.test(s)) return false;

  // Allow Unicode letters, Unicode numbers, spaces, hyphens, slashes, dots, commas and hashes (common in postal codes)
  // Disallow control characters, punctuation like @!$%*() etc., and emoji.
  const allowed = /^[\p{L}\p{N}\s\-\/\.,#]+$/u;
  return allowed.test(s);
}
