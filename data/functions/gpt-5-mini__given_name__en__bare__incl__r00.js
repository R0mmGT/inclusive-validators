function validate(name) {
  // Accept only strings
  if (typeof name !== 'string') return false;

  // Trim surrounding whitespace (users commonly enter accidental spaces)
  name = name.trim();

  // Require at least one character and cap length to avoid pathological inputs
  if (name.length === 0 || name.length > 100) return false;

  // Unicode-aware rules:
  // - Must start and end with a Unicode letter (letters from any script)
  // - Allow combining marks immediately after letters
  // - Allow single separators between letter groups: spaces, various apostrophes/okina,
  //   middle dot, and any Unicode dash (Pd)
  // - Disallow digits, symbols, punctuation (other than the allowed separators),
  //   and consecutive separators because each separator must be followed by a letter
  //
  // This keeps the validation inclusive across cultures while rejecting obvious junk.
  const nameRegex = /^\p{L}\p{M}*(?:[ \u00B7'\u2019\u02BC\u02BB\p{Pd}]\p{L}\p{M}*)*$/u;

  return nameRegex.test(name);
}
