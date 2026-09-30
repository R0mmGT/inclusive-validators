function validate(name) {
  // Accept only strings
  if (typeof name !== 'string') return false;

  // Trim surrounding whitespace
  const s = name.trim();

  // Empty or excessively long names are invalid
  if (s.length === 0 || s.length > 100) return false;

  // This regex is intentionally permissive and Unicode-aware:
  // - \p{L} matches any kind of letter from any language
  // - \p{M} matches combining marks (accents, etc.)
  // - Allowed separators between letter clusters: space, hyphen, various apostrophe characters,
  //   middle dot, interpunct, and period (to allow e.g. "St. John")
  // - Separators may appear only between letter clusters (no leading/trailing separators,
  //   no consecutive separators)
  //
  // Note: requires a JavaScript engine that supports Unicode property escapes (the 'u' flag).
  const re = /^\p{L}[\p{L}\p{M}]*(?:[ \-'\u2019\u02BC\u2018\u201B\u00B7\u2027\.][\p{L}\p{M}]+)*$/u;

  return re.test(s);
}
