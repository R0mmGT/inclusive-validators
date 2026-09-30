function validate(name) {
  // Basic type and trimming
  if (typeof name !== 'string') return false;
  const s = name.trim();
  if (s.length === 0) return false;

  // Reasonable length limits for a full name (in code units)
  if (s.length > 100) return false;

  // Normalize to a canonical form so combining marks behave consistently
  const normalized = s.normalize('NFC');

  // Unicode-aware pattern:
  // - Require at least one Unicode letter anywhere (?=.*\p{L})
  // - Must start and end with a letter (\p{L} ... \p{L})
  // - Allow internal letters, combining marks, spaces, dashes, apostrophes and dots
  //   \p{L}  : any kind of letter from any language
  //   \p{M}  : combining marks (accents etc.)
  //   \p{Zs} : space separators (space, non-breaking space, etc.)
  //   \p{Pd} : dash punctuation (hyphen, en-dash, em-dash, etc.)
  //   \u0027 : ASCII apostrophe (')
  //   \u2019 : right single quotation mark (’) commonly used as apostrophe
  //   \u00B7 : middle dot (·) used in some names
  //
  // This approach is intentionally permissive to work across cultures while ensuring
  // names start/end with a letter and contain at least one letter.
  const pattern = /^(?=.{1,100}$)(?=.*\p{L})\p{L}[\p{L}\p{M}\p{Zs}\p{Pd}\u0027\u2019\u00B7.]*\p{L}$/u;

  return pattern.test(normalized);
}
