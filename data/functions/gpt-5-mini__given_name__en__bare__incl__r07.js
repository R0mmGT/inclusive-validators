function validate(name) {
  // Accept only strings
  if (typeof name !== 'string') return false;

  // Trim surrounding whitespace (but internal spaces between parts are allowed)
  name = name.trim();
  if (name.length === 0) return false;

  // Reasonable maximum length in Unicode code points to avoid pathological input.
  // Adjust if you need to allow longer names.
  const maxCodePoints = 100;
  if ([...name].length > maxCodePoints) return false;

  // This regular expression aims to be permissive for international names while
  // rejecting digits, most punctuation and symbols.
  //
  // - \p{L} matches any kind of letter from any language.
  // - \p{M} matches combining marks (so letters with decomposed diacritics are allowed).
  // - Allowed single separators between letter-groups: space, hyphen, ASCII apostrophe,
  //   RIGHT SINGLE QUOTATION MARK (’), middle dot (·), and katakana middle dot (・).
  // - Segments must start with a letter and can contain letters and marks; separators
  //   cannot appear at the start or end, nor consecutively.
  //
  // Examples allowed: "Álvaro", "Jean-Luc", "Mary Anne", "D'Artagnan", "李", "Ольга"
  const re = /^\p{L}[\p{L}\p{M}]*(?:[ \-'\u2019\u00B7\u30FB]\p{L}[\p{L}\p{M}]*)*$/u;

  return re.test(name);
}
