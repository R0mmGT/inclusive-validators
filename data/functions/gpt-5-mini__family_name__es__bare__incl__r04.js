function validate(name) {
  if (typeof name !== 'string') return false;
  const s = name.trim();
  if (s.length === 0) return false;
  // optional sane maximum to avoid pathological inputs (adjustable)
  if (s.length > 200) return false;

  // - \p{L} = any Unicode letter
  // - \p{M} = combining marks (accents, diacritics)
  // We allow:
  //  - letters and combining marks,
  //  - single spaces,
  //  - hyphens,
  //  - ASCII apostrophe ' and right single quotation mark ’,
  //  - middle dot · (U+00B7),
  //  - an optional single dot at the end of a token (e.g. "St.")
  //
  // We do NOT allow digits, underscores, multiple separators in a row,
  // or leading/trailing separators (except the special case of a leading apostrophe
  // often used in names like "'t Hooft").
  const firstToken = "(?:['\u2019])?\\p{L}[\\p{L}\\p{M}]*\\.?"; // first token may start with an apostrophe
  const token = "\\p{L}[\\p{L}\\p{M}]*\\.?";
  const separator = "[ \\-'\u2019\u00B7]";

  const re = new RegExp("^" + firstToken + "(?:" + separator + token + ")*$", "u");
  return re.test(s);
}
