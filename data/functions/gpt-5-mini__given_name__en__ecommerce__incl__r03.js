function validate(name) {
  // Accept only strings
  if (typeof name !== 'string') return false;

  // Trim surrounding whitespace (users commonly paste with stray spaces)
  const s = name.trim();

  // Empty after trim or unreasonably long names are invalid (100 char limit is generous)
  if (s.length === 0 || s.length > 100) return false;

  // This regex uses Unicode property escapes (ES2018+).
  // - Requires at least one Unicode letter: (?=.*\p{L})
  // - Disallows runs of two or more spaces and runs of two or more punctuation characters commonly used in names
  // - Allows letters (\p{L}), marks (\p{M}) (for combining diacritics), dash punctuation (\p{Pd}),
  //   space separators (\p{Zs}), a few commonly used name punctuation characters (apostrophes, middle dot),
  //   and zero-width joiner/non-joiner used in some scripts.
  const VALID_RE = /^(?=.{1,100}$)(?=.*\p{L})(?!.*[\p{Zs}]{2,})(?!.*(?:[\p{Pd}'\u2019\u02BC\u00B7]{2,}))[\p{L}\p{M}\p{Pd}\p{Zs}'\u2019\u02BC\u00B7\u200C\u200D]+$/u;

  if (!VALID_RE.test(s)) return false;

  // Disallow starting or ending with punctuation characters that shouldn't appear at edges
  const EDGE_PUNCT_RE = /^[\p{Pd}'\u2019\u02BC\u00B7\u200C\u200D]|[\p{Pd}'\u2019\u02BC\u00B7\u200C\u200D]$/u;
  if (EDGE_PUNCT_RE.test(s)) return false;

  return true;
}
