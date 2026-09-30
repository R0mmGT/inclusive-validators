function validate(name) {
  // Accept only strings
  if (typeof name !== 'string') return false;

  // Normalize and trim common stray whitespace
  const s = (name.normalize ? name.normalize('NFC') : name).trim();

  // Reject empty or unreasonably long values
  if (s.length === 0 || s.length > 100) return false;

  // This regexp aims to be permissive for global family names while preventing
  // purely punctuation inputs and disallowing leading/trailing punctuation.
  // - \p{L} = any kind of letter from any language
  // - \p{M} = combining marks (accents, etc.)
  // Allowed internal punctuation: ASCII apostrophe ('),
  // right single quotation mark (’), hyphens/dashes, periods, middle dot and a few interpuncts,
  // regular and non-breaking spaces. Punctuation must be followed by a letter.
  const re = /^(?=.{1,100}$)(?=.*\p{L})[\p{L}\p{M}](?:[\p{L}\p{M}]|['\u2019\u00A0\u0020\u00B7\u0387\u2027\.\u2010-\u2014\-](?=[\p{L}\p{M}]))*$/u;

  return re.test(s);
}
