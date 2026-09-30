function validate(name) {
  // Accept only strings
  if (typeof name !== 'string') return false;

  // Trim and normalize to combine base letters and diacritics where possible
  name = name.trim();
  try { name = name.normalize('NFC'); } catch (e) {}

  // Reasonable length limits for a given name (adjust if your app needs different bounds)
  if (name.length < 1 || name.length > 100) return false;

  // Allowed characters:
  // \p{L} letters from any script
  // \p{M} combining marks (included to allow combining sequences)
  // \p{Pd} dash punctuation (hyphens and variants)
  // \p{Zs} space separators (regular space and other space separators)
  // A few common apostrophe-like characters and middle dots used in some names
  const allowed = /^[\p{L}\p{M}\p{Pd}\p{Zs}'\u2019\u02BC\u00B7\u0387\u30FB\uFF65]+$/u;
  if (!allowed.test(name)) return false;

  // Must start and end with a letter (prevents leading/trailing separators)
  if (!/^\p{L}/u.test(name) || !/\p{L}$/u.test(name)) return false;

  // Disallow consecutive separator characters (spaces, dashes, apostrophes, middle dots, etc.)
  const consecutiveSeparators = /(?:[\p{Zs}\p{Pd}'\u2019\u02BC\u00B7\u0387\u30FB\uFF65]){2,}/u;
  if (consecutiveSeparators.test(name)) return false;

  // Looks good for a wide variety of international given names
  return true;
}
