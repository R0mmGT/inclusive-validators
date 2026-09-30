function validate(input) {
  // Must be a string
  if (typeof input !== 'string') return false;

  // Trim surrounding whitespace
  const s = input.trim();

  // Reasonable length limits for a single street/address line
  if (s.length < 3 || s.length > 200) return false;

  // Single line only (no newlines)
  if (/[\r\n]/.test(s)) return false;

  // Reject obvious HTML/markup attempts
  if (/[<>]/.test(s)) return false;

  // Reject extremely repetitive garbage (same code unit repeated many times)
  if (/(.)\1{7,}/u.test(s)) return false;

  // Must contain at least one Unicode letter or number (covers all scripts)
  const alnumMatches = s.match(/[\p{L}\p{N}]/gu);
  if (!alnumMatches || alnumMatches.length === 0) return false;

  // Reject strings made only of punctuation/symbols and whitespace
  if (/^[\p{P}\p{S}\s]+$/u.test(s)) return false;

  // Ensure the proportion of letters/numbers is not vanishingly small
  // (prevents emoji-only or symbol-heavy inputs)
  const codePointCount = [...s].length; // counts Unicode code points
  if (alnumMatches.length / Math.max(1, codePointCount) < 0.20) return false;

  // All checks passed — accept. This is intentionally permissive to work globally.
  return true;
}
