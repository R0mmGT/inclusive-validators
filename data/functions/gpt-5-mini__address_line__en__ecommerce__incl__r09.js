function validate(address) {
  // Basic type/trim checks
  if (typeof address !== 'string') return false;
  const s = address.trim();

  // Reasonable length limits for a single address line (too short or absurdly long)
  if (s.length < 3 || s.length > 200) return false;

  // Reject control characters (newlines, nulls, etc.) and explicit angle brackets
  // Control characters could be used to break forms or inject new lines; < and > often indicate HTML.
  if (/[\p{C}]/u.test(s) || /[<>]/.test(s)) return false;

  // Require at least one visible letter or digit from any language/script
  if (!/[\p{L}\p{N}]/u.test(s)) return false;

  // Reject sequences of four or more identical punctuation/symbol characters (e.g. "!!!!" or "----")
  if (/([^\p{L}\p{N}\s])\1\1\1/u.test(s)) return false;

  // Reject addresses that are nothing but punctuation/whitespace (already covered by letter/number check)
  // Allow common address punctuation and symbols used internationally, including Unicode punctuation and symbols.
  // If all checks pass, consider the input a plausible international street address line.
  return true;
}
