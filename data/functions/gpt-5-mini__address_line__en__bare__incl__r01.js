function validate(input) {
  // Basic type check
  if (typeof input !== 'string') return false;

  // Trim surrounding whitespace
  const s = input.trim();

  // Must be non-empty and reasonably bounded in length
  if (s.length === 0 || s.length > 200) return false;

  // Must be a single line (address line should not contain newlines)
  if (/[\r\n]/.test(s)) return false;

  // Disallow control characters (C category in Unicode)
  if (/\p{C}/u.test(s)) return false;

  // Require at least one letter or number from any script (keeps it inclusive)
  // This rejects strings that are only punctuation or symbols like "!!!" or "— — —"
  if (!/[\p{L}\p{N}]/u.test(s)) return false;

  // Reject extremely repetitive garbage like "!!!!!!!!" or "------"
  // If the same character repeats 6 or more times in a row it's probably not a real address
  if (/(.)\1{5,}/u.test(s)) return false;

  // Allow most printable characters commonly used in addresses across cultures:
  // letters, numbers, punctuation, symbols (like #, /, -, °), marks (accents), and spaces.
  // But disallow strings composed solely of separators/symbols/punctuation (already guarded by letter/number test).
  // Additionally, disallow angle-bracket tags which are unlikely to be valid addresses and often indicate HTML:
  if (/[<>]/.test(s)) return false;

  // Basic sanity: there should not be extremely long runs of whitespace (like 50+ spaces)
  if (/\s{50,}/u.test(s)) return false;

  // Heuristic: require at least 1 non-digit or at least 2 digits if the whole string is numeric.
  // This keeps single-digit accidental inputs but still accepts pure numeric house numbers or PO boxes.
  if (/^\d+$/u.test(s) && s.length < 1) return false; // trivial, kept for clarity

  // Passed all checks - treat as a valid street address line
  return true;
}
