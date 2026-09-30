function validate(name) {
  // Must be a string
  if (typeof name !== 'string') return false;

  // Normalize whitespace
  name = name.trim().replace(/\s+/g, ' ');

  // Basic length limits (reasonable for form input)
  if (name.length < 2 || name.length > 100) return false;

  // Allowed characters for the whole string:
  // - Unicode letters and combining marks (\p{L}\p{M})
  // - spaces
  // - common name punctuation: apostrophes (ASCII and U+2019), hyphen, middle dot, dot (for initials/abbrev)
  // The u flag enables Unicode property escapes.
  const allowedWhole = /^[\p{L}\p{M}\s\-'’·\.]+$/u;
  if (!allowedWhole.test(name)) return false;

  // Count letters overall (must have at least one letter)
  const letterCount = (name.match(/\p{L}/gu) || []).length;
  if (letterCount === 0) return false;

  // Split into parts by spaces and validate each token individually.
  // Valid token forms we accept:
  // 1) A sequence of letters (with combining marks) possibly separated internally by
  //    single allowed punctuation (apostrophe, right single quote, hyphen, middle dot),
  //    e.g. O'Connor, Jean-Luc, Ana·María. Optional trailing period allowed for abbreviations like "St."
  // 2) Initials like "J." or clustered initials like "J.R.R." (one-letter segments followed by dots)
  // 3) Single letter without dot (rare but allowed as a token inside a full name)
  const wordPattern = /^[\p{L}\p{M}]+(?:[\'\u2019\-\u2013·][\p{L}\p{M}]+)*(?:\.)?$/u;
  const singleLetterOrInitial = /^[\p{L}\p{M}]\.?$/u;
  const initialsCluster = /^(?:[\p{L}\p{M}]\.)+$/u;

  const tokens = name.split(' ');
  for (let tok of tokens) {
    if (tok.length === 0) return false; // shouldn't happen after collapse, but safe

    // Reject tokens that start or end with punctuation other than a single trailing dot for abbreviations/initials
    // (This is mostly redundant with the more specific checks below, but keeps things strict.)
    const startsWithBad = /^[\-\'’·\.]/u.test(tok);
    const endsWithBad = /[\-\'’·]/u.test(tok.slice(-1));
    if (startsWithBad) {
      // allow starting with a letter followed by dot in initials handled below, so only fail if token starts with punctuation
      return false;
    }
    if (endsWithBad && !/^\w.*\.$/u.test(tok)) {
      // if it ends with hyphen/apostrophe/middle-dot it's invalid; allow a trailing dot only for abbreviations
      return false;
    }

    // Accept one of the valid token patterns
    if (wordPattern.test(tok) || singleLetterOrInitial.test(tok) || initialsCluster.test(tok)) {
      // Also disallow sequences of two punctuation characters inside a token like "--" or "''" or ".."
      if (/(?:['\u2019\-\u2013·\.]){2,}/u.test(tok)) return false;
      // Ensure there's at least one letter in the token
      if (!/[\p{L}]/u.test(tok)) return false;
      continue;
    }

    // If none matched, token is invalid
    return false;
  }

  // Additional logical checks (optional but practical):
  // - Avoid obviously non-name inputs like strings that look like emails or URLs.
  //   If an '@' or '://' appears we already rejected it by allowedWhole, but also check for common separators like commas used in lists.
  if (/[,@\/\\<>]/.test(name)) return false;

  // Passed all checks
  return true;
}
