/**
 * General-purpose international postal code validator.
 *
 * Notes:
 * - True full validation requires country-specific patterns (e.g. US ZIP vs UK postcode).
 *   Without a country context this function performs a permissive, culture-aware sanity check:
 *   allows Unicode letters and digits, spaces and hyphens, rejects control/punctuation characters,
 *   rejects leading/trailing or consecutive separators, and enforces a reasonable length.
 *
 * Returns true for strings that are likely valid postal codes across many countries,
 * and false for obviously invalid inputs.
 */
function validate(postal) {
  if (typeof postal !== 'string') return false;

  const s = postal.trim();

  // Reasonable limits for international postal codes:
  // - minimum 2 characters (avoid stray single characters)
  // - maximum 12 characters (covers common long formats with separators)
  if (s.length < 2 || s.length > 12) return false;

  // Allow Unicode letters (\p{L}), Unicode numbers (\p{N}), spaces and ASCII hyphen only.
  // The 'u' flag enables Unicode property escapes.
  if (!/^[\p{L}\p{N}\s-]+$/u.test(s)) return false;

  // No leading or trailing separators (space or hyphen).
  if (/^[-\s]|[-\s]$/.test(s)) return false;

  // No consecutive separators (e.g. "--" or "  ").
  if (/[-\s]{2,}/.test(s)) return false;

  // Require at least one letter or digit (defensive; rules vary by country).
  if (!/[\p{L}\p{N}]/u.test(s)) return false;

  return true;
}
