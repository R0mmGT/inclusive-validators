// validate(name) -> boolean
// Accept a wide range of real given-names from many cultures/scripts while rejecting
// digits, emoji, control chars and most punctuation. It allows letters (all Unicode
// scripts), combining marks, and single separators between name parts: any dash-like
// punctuation, any space separator, ASCII apostrophe, right single quote (U+2019),
// middle dot (U+00B7) and modifier letter apostrophe (U+02BC). Names cannot start
// or end with a separator, nor contain consecutive separators. The input is
// normalized (NFC) and trimmed. A practical length limit is applied.
function validate(name) {
  if (typeof name !== 'string') return false;

  // normalize to avoid differences between composed/decomposed forms
  const s = name.normalize('NFC').trim();

  // Disallow empty and overly long names (adjustable limit)
  if (s.length === 0 || s.length > 100) return false;

  // Separators we allow between name parts:
  // - \p{Pd} : any dash punctuation (hyphen, en-dash, em-dash, etc.)
  // - \p{Zs} : any space separator (space, NBSP, thin space, etc.)
  // - '      : ASCII apostrophe
  // - \u2019  : right single quotation mark (commonly used as an apostrophe)
  // - \u00B7  : middle dot (used in some names)
  // - \u02BC  : modifier letter apostrophe (ʼ)
  //
  // Token structure:
  // - Each token must start with a Unicode letter (\p{L})
  // - Letters may be followed by letters or combining marks (\p{M})
  // - Tokens may be separated by a single allowed separator
  //
  // Constraints enforced with lookaheads:
  // - No consecutive separators
  // - Cannot start or end with a separator
  //
  // The 'u' flag enables Unicode property escapes.
  const re = /^(?!.*[\p{Pd}\p{Zs}'\u2019\u00B7\u02BC]{2})(?![\p{Pd}\p{Zs}'\u2019\u00B7\u02BC])(?!.*[\p{Pd}\p{Zs}'\u2019\u00B7\u02BC]$)(?:\p{L}[\p{M}\p{L}]*(?:[\p{Pd}\p{Zs}'\u2019\u00B7\u02BC]\p{L}[\p{M}\p{L}]*)*)$/u;

  return re.test(s);
}
