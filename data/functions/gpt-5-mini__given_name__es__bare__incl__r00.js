function validate(name) {
  // Must be a string
  if (typeof name !== 'string') return false;

  // Normalize surrounding whitespace
  const s = name.trim();

  // Reject empty or excessively long names (protect against abuse while keeping cultural variety)
  if (s.length === 0 || s.length > 100) return false;

  // This regex aims to be inclusive for global names:
  // - Uses Unicode property escapes (\p{L} letters, \p{M} marks) to accept letters from any script and their combining marks.
  // - Allows separators commonly found inside given names: spaces, any dash (Unicode Pd), common apostrophes/okina characters and the middle dot.
  // - Disallows leading/trailing separators and consecutive separators because each separator must be followed by at least one letter.
  // - Does not allow digits, punctuation (other than the allowed separators), symbols or emoji.
  //
  // Pattern:
  //  ^\p{L}[\p{L}\p{M}]*(?:[ <sep> ][\p{L}\p{M}]*)*$
  // where <sep> includes space, \p{Pd} (dash punctuation), ' and several Unicode apostrophe/okina variants, and the middle dot.
  const nameRegex = /^[\p{L}][\p{L}\p{M}]*(?:[ \p{Pd}'\u2019\u02BC\u02BB\u02BF\u00B7·][\p{L}\p{M}]*)*$/u;

  return nameRegex.test(s);
}
