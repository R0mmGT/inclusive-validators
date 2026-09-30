function validate(address) {
  // Basic type and trimming
  if (typeof address !== 'string') return false;
  const s = address.trim();

  // Reasonable length limits for a street address line
  if (s.length < 5 || s.length > 100) return false;

  // Disallow control characters/newlines
  if (/[\r\n\t]/.test(s)) return false;

  // Allowed characters: letters, numbers, spaces and common punctuation used in addresses.
  // Using Unicode property escapes for letters and numbers.
  const allowed = /^[\p{L}\p{N}\s,.\-\/'#&()@:;]+$/u;
  if (!allowed.test(s)) return false;

  // Must start and end with a letter or digit (prevents leading/trailing stray punctuation)
  if (!/^[\p{L}\p{N}]/u.test(s)) return false;
  if (!/[\p{L}\p{N}]$/u.test(s)) return false;

  // Must contain at least one letter
  if (!/\p{L}/u.test(s)) return false;

  // Detect if this is a PO Box-like address (must also include a number)
  const poBoxPattern = /\b(?:P\.?O\.?\s*Box|Post(?:al\s+Office)?\s+Box|Box)\b/i;
  const containsDigit = /\d/.test(s);
  const isPoBox = poBoxPattern.test(s) && containsDigit;

  // Require either a numeric street number or a PO Box with a number
  if (!containsDigit && !isPoBox) return false;

  // Reject obvious garbage: long runs of identical characters or many punctuations in a row
  if (/(.)\1{4,}/u.test(s)) return false; // same char repeated 5+ times
  if (/[^ \p{L}\p{N}]{3,}/u.test(s)) return false; // 3+ consecutive non-alnum non-space chars

  // Prevent HTML-like or angle-bracket usage
  if (/[<>]/.test(s)) return false;

  return true;
}
