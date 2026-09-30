function validate(code) {
  // Accept only strings
  if (typeof code !== 'string') return false;

  // Trim and normalize to handle composed/decomposed characters consistently
  const s = code.trim();
  if (s.length === 0) return false;
  const norm = s.normalize('NFC');

  // Reasonable length bounds for postal codes worldwide (inclusive but bounded)
  // Most postal codes fall between 2 and 12 characters (including separators).
  if (Array.from(norm).length < 2 || Array.from(norm).length > 12) return false;

  // Allow Unicode letters, numbers, combining marks, spaces and common separators
  // \p{L} = any kind of letter from any language
  // \p{N} = any kind of numeric character in any script
  // \p{M} = combining marks (to allow accented characters composed of base+mark)
  // Also allow space, hyphen, slash, en-dash and em-dash
  // The 'u' flag enables Unicode property escapes
  const allowedRe = /^[\p{L}\p{N}\p{M}\s\-\/\u2013\u2014]+$/u;
  if (!allowedRe.test(norm)) return false;

  // Require at least one letter or number (to avoid strings that are only punctuation/whitespace)
  const alnumRe = /[\p{L}\p{N}]/u;
  if (!alnumRe.test(norm)) return false;

  // Avoid inputs that are obviously not postal codes (e.g., a single repeated punctuation)
  // Reject if the input consists of a single repeating non-alphanumeric character
  if (/^(.)\1+$/u.test(norm) && !alnumRe.test(norm)) return false;

  return true;
}
