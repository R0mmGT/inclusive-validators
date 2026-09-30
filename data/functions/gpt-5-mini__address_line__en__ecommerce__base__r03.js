function validate(input) {
  // Basic type and trimming
  if (typeof input !== 'string') return false;
  const s = input.trim();

  // Reasonable length limits for an address line
  if (s.length < 3 || s.length > 100) return false;

  // Reject obvious HTML / angle-bracket injection and control characters
  if (/[<>]/.test(s) || /[\x00-\x1F]/.test(s)) return false;

  // Must contain at least one letter (street name or PO Box)
  if (!/[A-Za-z\u00C0-\u017F]/.test(s)) return false;

  // PO Box formats: "P.O. Box 123", "PO Box 123", "Post Office Box 123"
  const poBoxRegex = /^\s*(?:P\.?O\.?|PO|Post\s+Office)\s+Box\s+\d+[A-Za-z0-9\-\/]*\s*$/i;

  // Typical street address: starts with a number (may have letter/suffix like "221B" or range "123-125"),
  // followed by a street name and optional unit/designator. Allows international letters, common punctuation.
  const streetRegex = /^\s*\d+[A-Za-z0-9\-\/]*\s+[A-Za-z0-9\u00C0-\u017F'.,#&()\/\-\s]+$/i;

  return poBoxRegex.test(s) || streetRegex.test(s);
}
