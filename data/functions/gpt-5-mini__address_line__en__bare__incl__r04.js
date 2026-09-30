function validate(address) {
  // Basic sanity checks
  if (typeof address !== 'string') return false;
  const s = address.trim();
  if (s.length === 0) return false;
  if (s.length > 200) return false; // keep a reasonable upper bound
  if (/\r|\n/.test(s)) return false; // single-line only

  // Disallow control/invisible characters (Unicode category C)
  // and angle brackets to avoid tag-like strings
  if (/[\p{C}<>]/u.test(s)) return false;

  // Reject obvious non-addresses: URLs and email-like strings
  if (/\bhttps?:\/\//i.test(s) || /\bwww\./i.test(s)) return false;
  if (/@/.test(s) && /@.*\./.test(s)) return false; // simple email detection

  // Reject pure coordinate pairs like "12.34, -56.78"
  if (/^\s*-?\d+(\.\d+)?\s*,\s*-?\d+(\.\d+)?\s*$/.test(s)) return false;

  // Must contain at least one letter or number (supports all Unicode letters/numbers)
  if (!/[\p{L}\p{N}]/u.test(s)) return false;

  // Reject strings made up almost entirely of punctuation/symbols
  // Require at least one letter/number and at least one non-punctuation among the first 100 chars
  const punctuationLike = s.replace(/[\p{L}\p{N}\s]/gu, '');
  if (punctuationLike.length > s.length * 0.7 && s.length < 40) return false;

  // Reject runaway repeated special characters (e.g. "!!!!", "----")
  if (/([^\p{L}\p{N}\s])\1\1\1/u.test(s)) return false;

  // Many valid addresses use commas, periods, hashes, slashes, dashes, apostrophes, unicode letters.
  // We're intentionally permissive to support global formats while blocking obvious invalid values.
  return true;
}
