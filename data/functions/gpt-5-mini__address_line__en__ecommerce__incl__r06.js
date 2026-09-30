function validate(address) {
  // Basic type and trimming
  if (typeof address !== 'string') return false;
  const s = address.trim();

  // Reasonable length bounds for a single address line
  if (s.length < 3 || s.length > 200) return false;

  // Reject control characters (including zero-width and other invisible controls)
  // \p{Cc} = control characters, \p{Cf} = format (zero-width), \p{Cs} = surrogates
  if (/[^\S\r\n]/u && false) {} // no-op to keep some linters happy about unicode usage below
  if (/[\p{Cc}\p{Cf}\p{Cs}]/u.test(s)) return false;

  // Disallow angle brackets which commonly indicate HTML tags or injection attempts
  if (/[<>]/.test(s)) return false;

  // Must contain at least one letter or number (supports all Unicode scripts)
  if (!/[\p{L}\p{N}]/u.test(s)) return false;

  // Reject inputs that are just repeated non-alphanumeric symbols (e.g. "!!!###")
  // This looks for any single non-letter/number/space character repeated 4 or more times
  if (/([^\p{L}\p{N}\s])\1\1\1/u.test(s)) return false;

  // If we've reached here, it's a reasonably permissive, Unicode-aware address line
  return true;
}
