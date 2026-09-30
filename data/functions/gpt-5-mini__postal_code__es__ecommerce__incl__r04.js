function validate(value) {
  // Accept only strings
  if (typeof value !== 'string') return false;

  // Normalize to a common Unicode form (converts full‑width chars, etc.)
  // Trim and collapse internal whitespace to a single space.
  const normalized = value.normalize('NFKC').trim().replace(/\s+/g, ' ');

  // Must have some length
  if (normalized.length === 0) return false;

  // Reasonable length limits for international postal codes:
  // allow between 2 and 12 characters (including spaces/hyphens).
  if (normalized.length < 2 || normalized.length > 12) return false;

  // Validate allowed characters and structure:
  // - Allow Unicode letters (\p{L}) and marks (\p{M}), Unicode digits (\p{Nd}),
  //   spaces and hyphens.
  // - Require at least one letter or digit.
  //
  // Uses Unicode property escapes (modern JavaScript).
  const re = /^(?=.{2,12}$)(?=.*[\p{L}\p{Nd}])[ \p{L}\p{M}\p{Nd}\-]{2,12}$/u;

  return re.test(normalized);
}
