function validate(input) {
  // Accept only strings
  if (typeof input !== 'string') return false;

  // Trim surrounding whitespace
  const s = input.trim();

  // Reasonable length bounds: most postal codes worldwide are short.
  // Allow 2..20 characters to be permissive for international formats.
  if (s.length < 2 || s.length > 20) return false;

  // Allowed characters:
  // - any letter from any script (\p{L})
  // - any numeric character from any script (\p{N})
  // - whitespace (\s)
  // - dash punctuation (\p{Pd}) to cover hyphen, en-dash, em-dash, etc.
  // - a few common separators used in postal codes: slash, dot, comma
  // Use Unicode property escapes (the 'u' flag) so non-Latin scripts are handled.
  const allowedRe = /^[\p{L}\p{N}\s\p{Pd}\/\.,]+$/u;
  if (!allowedRe.test(s)) return false;

  // Must contain at least one letter or number (reject strings made only of separators)
  const hasAlnum = /[\p{L}\p{N}]/u.test(s);
  if (!hasAlnum) return false;

  return true;
}
