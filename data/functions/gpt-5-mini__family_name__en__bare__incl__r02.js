function validate(name) {
  // Accept only strings
  if (typeof name !== 'string') return false;

  // Trim surrounding whitespace
  const s = name.trim();
  if (s.length === 0) return false;

  // Reasonable max to avoid pathological input while allowing long multi‑part names
  if (s.length > 200) return false;

  // This regex aims to be permissive across cultures:
  // - \p{L} = any kind of letter from any language
  // - \p{M} = combining marks (diacritics)
  // - \p{Pd} = dash punctuation (various hyphens)
  // - \p{Zs} = space separators (includes normal and nbsp)
  // Allowed separators between letter groups: any dash, any space separator,
  // or common apostrophe-like characters and the middle dot.
  // Each separator must be followed by a letter, and the whole name must
  // start and end with a letter (no leading/trailing punctuation).
  const re = /^\p{L}[\p{L}\p{M}]*(?:[\p{Pd}\p{Zs}'\u2019\u02BC\u2018\u201B\u00B7](?=\p{L})[\p{L}\p{M}]*)*$/u;

  return re.test(s);
}
