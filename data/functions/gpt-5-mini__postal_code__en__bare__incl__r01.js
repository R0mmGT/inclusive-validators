function validate(code) {
  // Accept only strings
  if (typeof code !== 'string') return false;

  // Trim surrounding whitespace (users may paste with accidental spaces)
  const s = code.trim();
  if (s.length === 0) return false;

  // Reasonable length bounds to avoid accidental garbage while remaining permissive
  // Most postal codes worldwide fit well within 1..20 characters (including separators)
  if (s.length > 20) return false;

  // Must contain at least one letter or number (prevents strings of only punctuation/space)
  if (!/[\p{L}\p{N}]/u.test(s)) return false;

  // Allow Unicode letters, Unicode digits, space separators, and common separators (hyphen, en-dash, em-dash)
  // This keeps the validator inclusive of non-Latin scripts and fullwidth digits while blocking odd symbols.
  if (!/^[\p{L}\p{N}\p{Zs}\-\u2013\u2014]+$/u.test(s)) return false;

  // Disallow consecutive separator characters (two or more spaces/dashes), which are atypical in postal codes
  if (/[\p{Zs}\-\u2013\u2014]{2,}/u.test(s)) return false;

  // Disallow a separator at the start or end (after trim there won't be spaces, but check for dashes)
  if (/^[\-\u2013\u2014]/u.test(s) || /[\-\u2013\u2014]$/u.test(s)) return false;

  // If all checks pass, consider it a valid postal code format (broad, cross-cultural)
  return true;
}
