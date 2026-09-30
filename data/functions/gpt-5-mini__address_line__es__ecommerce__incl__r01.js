function validate(address) {
  // Must be a string
  if (typeof address !== 'string') return false;

  const s = address.trim();

  // Reasonable length limits for a street address line
  if (s.length < 3 || s.length > 200) return false;

  // Reject control chars and some dangerous punctuation commonly used in injections
  // \p{C} covers control/unassigned chars; also disallow angle/brace/pipe characters
  if ( /[\p{C}<>{}|]/u.test(s) ) return false;

  // Reject obvious URLs or URIs
  if ( /(https?:\/\/|www\.|:\/\/)/i.test(s) ) return false;

  // Allow letters (all scripts), combining marks, numbers, punctuation and whitespace.
  // This is permissive so it works for many writing systems.
  if ( !/^[\p{L}\p{M}\p{N}\p{P}\s]+$/u.test(s) ) return false;

  // Require at least one letter (so the line is not purely numeric/punctuation)
  if ( !/\p{L}/u.test(s) ) return false;

  // Start and end should be sensible: start with a letter/number or common address symbol,
  // end with a letter/number or a few allowed trailing symbols (like '.' for abbreviations).
  if ( !/^[\p{L}\p{N}#№º°].*[\p{L}\p{N}º°\.]$/u.test(s) ) return false;

  // Disallow long runs of the same punctuation/symbol character (e.g. "////" or "----")
  // that are unlikely in a real postal address.
  if ( /([^\p{L}\p{N}\s])\1\1/u.test(s) ) return false;

  return true;
}
