function validate(name) {
  // Accepts a single string and returns true if it looks like a plausible given name
  // for people worldwide. This is permissive by design: it allows letters from any
  // script, diacritical marks, common connectors like hyphens and apostrophes,
  // middle dot and the zero-width-joiner. It disallows digits, stray punctuation,
  // empty values and repeated separators.
  if (typeof name !== 'string') return false;

  name = name.trim();
  if (name.length === 0) return false;

  // Limit length in Unicode codepoints to avoid pathological inputs.
  const codePointCount = [...name].length;
  if (codePointCount > 100) return false;

  // Quick reject: no digits allowed in given names here.
  if (/\p{Nd}/u.test(name)) return false;

  // Allowed characters:
  // \p{L} letters from any script
  // \p{M} combining marks (diacritics)
  // \p{Pd} dash punctuation (hyphen variants)
  // ' and ’ apostrophes
  // \u00B7 middle dot used in some names
  // \u200D zero-width-joiner used in some scripts (e.g. Indic)
  // space (ASCII space) as a separator between name parts
  const allowed = /^[\p{L}\p{M}\p{Pd}'’\u00B7\u200D ]+$/u;
  if (!allowed.test(name)) return false;

  // Must start and end with a letter (not a separator).
  if (!/^\p{L}/u.test(name) || !/\p{L}$/u.test(name)) return false;

  // Disallow consecutive visible separators (space, apostrophe, dash, middle dot).
  // This prevents things like "Jean--Luc", "O''Connor", "Mary  Ann".
  if (/(?:[ '\u2019\p{Pd}\u00B7]){2,}/u.test(name)) return false;

  // Each component between visible separators must contain at least one letter.
  // Splitting on the visible separators used above.
  const parts = name.split(/(?:[ '\u2019\p{Pd}\u00B7])/u).filter(Boolean);
  if (parts.length === 0) return false;
  for (const part of parts) {
    if (!/\p{L}/u.test(part)) return false;
  }

  return true;
}
