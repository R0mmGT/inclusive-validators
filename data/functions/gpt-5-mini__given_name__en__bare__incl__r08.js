function validate(name) {
  // Accept only strings
  if (typeof name !== 'string') return false;

  // Normalize and trim
  const s = name.normalize ? name.normalize('NFC').trim() : name.trim();
  if (s.length === 0) return false;

  // Reasonable length limits for a given name (allow single-character names)
  if (s.length > 100) return false;

  // Must contain at least one letter from any Unicode script
  if (!/\p{L}/u.test(s)) return false;

  // Allowed characters:
  // - Unicode letters (\p{L})
  // - Combining marks (\p{M}) (to allow accents written separately)
  // - Unicode dash punctuation (\p{Pd})
  // - Unicode space separators (\p{Zs}) (NBSP, thin space, etc.)
  // - Common name punctuation: apostrophes, modifier apostrophe, right single quote,
  //   middle dot, period, zero-width-joiner
  // Ensure name starts and ends with a letter (not punctuation or space).
  const namePattern = /^[\p{L}](?:[\p{L}\p{M}\p{Pd}\p{Zs}'\u02BC\u2019\u00B7\.\u200D]*[\p{L}])?$/u;
  if (!namePattern.test(s)) return false;

  // Disallow consecutive separators/punctuation (e.g., "--", "  ", ".'", etc.)
  const consecutiveSeparators = /[\p{Pd}\p{Zs}'\u02BC\u2019\u00B7\.\u200D]{2,}/u;
  if (consecutiveSeparators.test(s)) return false;

  // Prevent purely alphabetic but suspiciously short strings of punctuation-only after normalization
  // (already guarded by start/end letter and presence of letters, so this is extra safety)
  return true;
}
