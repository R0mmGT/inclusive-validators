/**
 * Validate a single-line street address suitable for international use.
 * - Accepts Unicode letters, numbers, marks, punctuation, symbols and spaces.
 * - Disallows control characters and newlines.
 * - Requires at least one letter or number.
 * - Enforces a reasonable length and blocks obvious garbage (long repeated characters).
 *
 * Note: This is a pragmatic, permissive validator intended for UX (client-side).
 * It won't guarantee a deliverable address but helps catch empty/obvious-invalid input.
 *
 * @param {string} input
 * @returns {boolean}
 */
function validate(input) {
  if (typeof input !== 'string') return false;

  const s = input.trim();

  // Basic length constraints (adjustable). Must be at least 3 printable chars and not absurdly long.
  if (s.length < 3 || s.length > 200) return false;

  // Disallow any newline or other control characters
  if (/[\p{C}\r\n]/u.test(s)) return false;

  // Must contain at least one letter or digit (covers many scripts via Unicode properties)
  if (!/[\p{L}\p{N}]/u.test(s)) return false;

  // Allow only letters, numbers, marks, punctuation, symbols and space separators
  // This keeps out control characters while permitting most characters used in addresses worldwide.
  if (!/^[\p{L}\p{N}\p{M}\p{P}\p{S}\p{Zs}]+$/u.test(s)) return false;

  // Reject strings that are clearly noise: e.g. excessive repetition of a single non-space char.
  // Remove spaces for this check so "----- -----" is caught as noise.
  const noSpaces = s.replace(/\s+/g, '');
  if (/(.)\1{4,}/u.test(noSpaces)) return false;

  // Reject strings composed only of punctuation/symbols (must already include letter/number so this is redundant,
  // but keep a safeguard for very unusual Unicode where \p{L}\p{N} detection might be missing).
  if (!/[\p{L}\p{N}]/u.test(s)) return false;

  return true;
}
