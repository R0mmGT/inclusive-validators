/**
 * Validate a postal code in a liberal, international-friendly way.
 *
 * This function is intentionally permissive to accommodate the wide variety
 * of postal code systems around the world (different scripts, digits,
 * letter/number mixes, and a few common separators). It:
 *  - accepts Unicode letters and digits (including non-Latin scripts and digits)
 *  - accepts combining marks (accents), spaces and a few common separators
 *  - disallows control characters and unusual punctuation
 *  - requires the code to begin and end with a letter or digit
 *  - disallows consecutive separator characters
 *  - requires at least 2 alphanumeric characters and limits them to a reasonable maximum
 *
 * Note: No validation can perfectly detect every country's postal code format
 * without a country-specific list/pattern. This function aims to be broadly
 * correct and inclusive without relying on external libraries.
 *
 * @param {string} input
 * @returns {boolean}
 */
function validate(input) {
  if (typeof input !== 'string') return false;

  // Normalize to a stable form and trim surrounding whitespace
  if (typeof input.normalize === 'function') {
    input = input.normalize('NFKC');
  }
  input = input.trim();

  if (input.length === 0) return false;

  // Allowed characters:
  // \p{L} = any kind of letter from any language
  // \p{N} = any kind of numeric character in any script
  // \p{M} = combining marks (accents)
  // space and a few common separators: hyphen, slash, dot, comma, hash
  const allowedRe = /^[\p{L}\p{N}\p{M} \-\/\.,#]+$/u;
  if (!allowedRe.test(input)) return false;

  // Must start and end with an alphanumeric character (letter or number)
  const startsWithAlnum = /^[\p{L}\p{N}]/u.test(input);
  const endsWithAlnum = /[\p{L}\p{N}]$/u.test(input);
  if (!startsWithAlnum || !endsWithAlnum) return false;

  // No consecutive separators (spaces, hyphens, slashes, dots, commas, hashes)
  if (/[ \-\/\.,#]{2,}/u.test(input)) return false;

  // Count letters+numbers (ignore separators). Require a minimum and cap a maximum
  const alnumMatches = input.match(/\p{L}|\p{N}/gu) || [];
  const alnumCount = alnumMatches.length;

  // Minimum 2 alphanumeric characters (most postal codes have at least 2 meaningful characters)
  if (alnumCount < 2) return false;

  // Allow reasonably long codes but reject absurdly long strings
  // Many postal codes are short; allowing up to 12 alnum characters covers complex cases
  if (alnumCount > 12) return false;

  return true;
}
