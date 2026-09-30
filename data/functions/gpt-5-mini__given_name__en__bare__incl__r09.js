function validate(name) {
  // Basic type & trimming
  if (typeof name !== 'string') return false;
  let s = name.trim();
  if (!s) return false;

  // Normalize consecutive Unicode space separators to a single ASCII space
  // (helps tolerate accidental extra spaces while remaining strict about other punctuation)
  s = s.replace(/\p{Zs}+/gu, ' ');

  // Reasonable length bounds for a given name (adjustable)
  if (s.length > 100) return false;

  // Allow sequences of Unicode letters and combining marks, optionally separated
  // by a single connector character (space, any dash, apostrophes, middle-dot or period).
  // - \p{L} = any kind of letter from any language
  // - \p{M} = combining marks (accents, etc.)
  // - \p{Zs} = space separators (we already collapsed them)
  // - \p{Pd} = any dash punctuation
  // This ensures the name:
  //  - starts and ends with a letter (no leading/trailing punctuation)
  //  - does not contain digits or most symbols
  //  - does not have consecutive connectors
  const nameRegex = /^[\p{L}\p{M}]+(?:[\p{Zs}\p{Pd}'\u2019·\.][\p{L}\p{M}]+)*$/u;

  return nameRegex.test(s);
}
