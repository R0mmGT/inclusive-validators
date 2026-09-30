function validate(name) {
  // Basic type/trim/length checks
  if (typeof name !== 'string') return false;
  // Normalize common non-breaking spaces to ordinary space for checks
  const raw = name.replace(/\u00A0/g, ' ');
  const s = raw.trim();
  if (s.length === 0) return false;
  if (s.length > 200) return false; // guard against absurdly long inputs

  // Reject control characters (other than regular space) and obvious junk
  // \p{C} = Unicode Other (control, etc.)
  if (/\p{C}/u.test(s)) return false;

  // Require at least one letter (supports all scripts via Unicode property)
  if (!/\p{L}/u.test(s)) return false;

  // Allowed characters:
  //  - Unicode letters (\p{L}) and marks (\p{M}) for diacritics
  //  - Apostrophes: ' and ’
  //  - Hyphens/dashes: -, –, —
  //  - Middle dot ·
  //  - Period .
  //  - Comma ,
  //  - Parentheses ( )
  //  - Space
  // This set is intentionally permissive to accommodate global naming conventions.
  const allowed = /^[\p{L}\p{M}\u0027\u2019\-\u2013\u2014\u00B7\.,\(\)\u0020]+$/u;
  if (!allowed.test(s)) return false;

  // Disallow strings that look like emails or URLs
  if (/[<>@\/\\]|https?:|mailto:/i.test(s)) return false;

  // Disallow leading/trailing punctuation (except an opening parenthesis at start
  // or a closing parenthesis at end — these are handled by the parentheses balance check)
  const firstChar = s[0];
  const lastChar = s[s.length - 1];
  const punctuationChars = "'.\u2019-–—·,";
  if (punctuationChars.includes(firstChar) || punctuationChars.includes(lastChar)) return false;

  // Simple parentheses balance check and no nested garbage like ")(" sequences
  let depth = 0;
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (ch === '(') depth++;
    else if (ch === ')') {
      depth--;
      if (depth < 0) return false; // unbalanced closing
    }
  }
  if (depth !== 0) return false;

  // No runs of more than one space (normalize/force single spaces)
  if (/\s{2,}/u.test(s)) return false;

  // Disallow repeated punctuation like "--", "''", "..", ",,", "··" etc.
  if (/(['\u2019\-\u2013\u2014\.\,·])\1+/u.test(s)) return false;

  // Each space-separated token should contain at least one letter.
  // This prevents tokens that are only punctuation (like ".,") being accepted.
  const tokens = s.split(' ');
  for (const t of tokens) {
    if (t.length === 0) return false; // should not happen due to earlier check but safe
    if (!/\p{L}/u.test(t)) return false;
  }

  // Passed all heuristics; accept as a plausible personal name.
  return true;
}
