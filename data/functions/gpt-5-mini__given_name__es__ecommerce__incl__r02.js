function validate(name) {
  // Must be a string
  if (typeof name !== 'string') return false;

  // Trim surrounding whitespace
  const s = name.trim();
  if (s.length === 0) return false;

  // Count user-perceived characters (code points) and enforce reasonable length limits.
  // Allow very short names (1 char) and reasonably long ones (up to 60 characters).
  const codePointLength = [...s].length;
  if (codePointLength < 1 || codePointLength > 60) return false;

  // Unicode-aware regex:
  // - \p{L} matches any kind of letter from any language.
  // - \p{M} matches combining marks (accents that follow letters).
  // - \u200C and \u200D are ZERO WIDTH NON-JOINER / JOINER sometimes used in some scripts.
  // - \p{Pd} matches dash punctuation (hyphen, en-dash, etc.).
  // - Allow a small set of culturally common separators: space, dashes, apostrophes (straight and curly),
  //   middle dot characters, and a period (to allow initials like "J.").
  // - Separators are only allowed between letter groups (no leading/trailing separators,
  //   and no consecutive separators). A single trailing period is allowed.
  const nameRegex = /^\p{L}(?:[\p{M}\u200C\u200D])*(?:[ \p{Pd}'\u2019\u00B7\u0387\.]\p{L}(?:[\p{M}\u200C\u200D])*)*\.?$/u;

  return nameRegex.test(s);
}
