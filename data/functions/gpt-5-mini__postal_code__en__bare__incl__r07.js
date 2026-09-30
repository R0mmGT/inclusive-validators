function validate(code) {
  // Accept only strings
  if (typeof code !== 'string') return false;

  // Trim common surrounding whitespace
  const s = code.trim();
  if (!s) return false;

  // Allow Unicode letters, Unicode numbers, spaces, hyphens, slashes and underscores.
  // This keeps the check inclusive of non-Latin scripts while rejecting most punctuation and symbols (emojis, @, #, etc.)
  // Uses Unicode property escapes (ES2018+).
  const allowed = /^[\p{L}\p{N}\s\-\/_]+$/u;
  if (!allowed.test(s)) return false;

  // Collapse allowed separators to compute the "core" length (actual letters/digits)
  const core = s.replace(/[\s\-\/_]+/g, '');

  // Reasonable length bounds for global postal codes:
  // - Minimum 2 characters (single-character postal codes are extremely rare)
  // - Maximum 12 characters after removing separators (covers virtually all country formats)
  if (core.length < 2 || core.length > 12) return false;

  // Ensure there's at least one letter or number (should be true given allowed regex, but double-check)
  if (!/[\p{L}\p{N}]/u.test(core)) return false;

  // Reject strings that are obviously not postal codes: e.g., mostly punctuation (already covered),
  // or extremely repetitive single-character codes like "111111" or "AAAAAA" (likely invalid).
  // We allow some repetition (postal codes like "00000" exist), but reject if more than 80% of characters are the same.
  const mostCommonCharCount = core.split('').reduce((acc, ch) => {
    acc[ch] = (acc[ch] || 0) + 1;
    return acc;
  }, {});
  const maxCount = Math.max(...Object.values(mostCommonCharCount));
  if (maxCount / core.length > 0.8 && core.length > 4) return false;

  // Passed all checks — treat as a valid (plausible) international postal code.
  return true;
}
