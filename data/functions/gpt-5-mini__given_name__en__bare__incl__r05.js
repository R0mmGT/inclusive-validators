function validate(name) {
  // Accept only strings
  if (typeof name !== 'string') return false;

  // Normalize and trim surrounding whitespace
  // NFC keeps characters in composed form which works well with \p{M}
  name = name.normalize ? name.normalize('NFC').trim() : name.trim();

  // Empty or excessively long names are not valid
  if (name.length === 0 || name.length > 100) return false;

  // This regex allows:
  // - Unicode letters (\p{L}) possibly followed by combining marks (\p{M})
  // - Groups of such letters/marks separated by a single connector:
  //   any dash punctuation (\p{Pd}), common apostrophe variants, middle dot, or space characters (\p{Zs})
  // - No digits, control chars, or other punctuation are allowed
  //
  // Examples matched: "Élodie", "Mary-Jane", "O'Connor", "Jean Luc", "李", "أحمد", "D’Angelo"
  const re = /^[\p{L}\p{M}]+(?:[\p{Pd}'\u2019\u02BC\u2018\u00B7\p{Zs}][\p{L}\p{M}]+)*$/u;

  return re.test(name);
}
