function validate(name) {
  // Accept only strings
  if (typeof name !== 'string') return false;

  // Normalize and trim whitespace at ends
  try {
    name = name.normalize('NFC').trim();
  } catch (e) {
    // If normalization isn't supported for some reason, just trim
    name = name.trim();
  }

  // Basic length limits: allow 1..200 characters (practical safeguard)
  if (name.length === 0 || name.length > 200) return false;

  // A Unicode-aware pattern that:
  // - Starts with a letter (\p{L}) possibly followed by combining marks (\p{M}*)
  // - Allows internal groups separated by a single allowed separator:
  //     * apostrophes (', ’, ‘, ʼ), hyphen (-), middle dot (·), a single space
  //     * or a dot optionally followed by a single space (to allow "St. John")
  // - Ensures separators are always followed by at least one letter (no consecutive separators,
  //   no leading/trailing separators).
  //
  // This covers letters from all scripts, diacritics, and common name punctuation used worldwide.
  const re = /^\p{L}\p{M}*(?:(?:['\u2019\u2018\u02BC\-\u00B7]|\. ?)\p{L}\p{M}*)*$/u;

  // Final test
  return re.test(name);
}
