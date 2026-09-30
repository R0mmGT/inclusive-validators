function validate(postal) {
  // Debounce non-strings quickly
  if (typeof postal !== 'string') return false;

  // Trim whitespace
  let s = postal.trim();
  if (!s) return false;

  // Remove a common leading postal mark (e.g. Japanese "〒") and stray leading hashes
  s = s.replace(/^[\u3012#]+/, '').trim();
  if (!s) return false;

  // Collapse multiple internal spaces into one
  s = s.replace(/\s+/g, ' ');

  // Feature-detect Unicode property escapes (\p{L}, \p{N})
  let unicodeProps = true;
  try {
    // If the engine doesn't support \p, this will throw
    new RegExp('\\p{L}', 'u').test('a');
  } catch (e) {
    unicodeProps = false;
  }

  // Allowed characters: letters, numbers, spaces and hyphens.
  // Use Unicode-aware classes when available, otherwise fall back to ASCII.
  const allowedRe = unicodeProps
    ? /^[\p{L}\p{N}\s-]+$/u
    : /^[A-Za-z0-9\s-]+$/;

  if (!allowedRe.test(s)) return false;

  // Remove separators (spaces and hyphens) to evaluate the "core" length/content
  const core = s.replace(/[\s-]+/g, '');

  // Reasonable length bounds for postal codes worldwide:
  // - Minimum 2 (most real postal codes have at least 2 significant characters)
  // - Maximum 10 (covers virtually all real-world systems including compound codes)
  if (core.length < 2 || core.length > 10) return false;

  // Ensure there's at least one letter or digit in the core
  const hasAlnum = unicodeProps ? /[\p{L}\p{N}]/u.test(core) : /[A-Za-z0-9]/.test(core);
  if (!hasAlnum) return false;

  // Reject inputs that are purely separators or accidental punctuation repeated
  if (/^[\s-]+$/.test(s)) return false;

  // Basic heuristics passed -> likely a valid postal code across countries/cultures
  return true;
}
