function validate(postal) {
  // Accept only strings
  if (typeof postal !== 'string') return false;

  // Trim whitespace (including Unicode whitespace)
  const s = postal.trim();
  if (s.length === 0) return false;

  // Use Unicode-aware length (counts code points, safe for non-BMP)
  const length = [...s].length;
  // Be permissive about length to support varied world formats:
  // allow 1..12 code points (covers common formats like "12345", "SW1A 1AA", "H0H 0H0", "〒150-0001", etc.)
  if (length > 12) return false;

  // Allow letters (any script), numbers (any script), spaces and a small set of punctuation
  // commonly used in postal codes: hyphens, en/em dashes, slashes, dots and hash.
  // Reject other symbols (e.g. @, $, %, &, emojis).
  const allowed = /^[\p{L}\p{N}\s\-–—\/\.#]+$/u;
  if (!allowed.test(s)) return false;

  // Require at least one letter or number (reject strings that are only punctuation/space)
  const containsAlnum = /[\p{L}\p{N}]/u;
  return containsAlnum.test(s);
}
