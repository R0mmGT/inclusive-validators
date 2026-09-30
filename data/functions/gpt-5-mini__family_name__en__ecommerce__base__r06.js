function validate(name) {
  // Basic type & normalization
  if (typeof name !== 'string') return false;
  if (name.normalize) name = name.normalize('NFC');
  name = name.trim();

  // Length limits (adjustable)
  if (name.length < 2 || name.length > 100) return false;

  // Allowed separator characters
  const separators = new Set([
    ' ',         // space
    '\u00A0',    // non-breaking space
    '-',         // hyphen-minus
    '\u2013',    // en dash
    '\u2014',    // em dash
    "'",         // apostrophe
    '\u2019',    // right single quotation mark (common apostrophe)
    '·',         // middle dot (e.g. Spanish names)
    '.'          // period (to allow "St. John" style)
  ]);

  // Helpers for Unicode letters/marks (ES2018+)
  const isLetter = ch => /\p{L}/u.test(ch);
  const isMark = ch => /\p{M}/u.test(ch);

  let prevIsSep = false;
  let prevSepChar = '';
  let hasLetter = false;
  let index = 0;
  let lastChar = '';

  for (const ch of name) {
    index++;
    lastChar = ch;

    if (isLetter(ch) || isMark(ch)) {
      // A combining mark should not start the string
      if (isMark(ch) && index === 1) return false;
      if (isLetter(ch)) hasLetter = true;
      prevIsSep = false;
      prevSepChar = '';
      continue;
    }

    if (separators.has(ch)) {
      // cannot start with a separator
      if (index === 1) return false;

      // disallow consecutive separators except for a period followed by a normal space
      if (prevIsSep) {
        if (!(prevSepChar === '.' && (ch === ' ' || ch === '\u00A0'))) {
          return false;
        }
      }

      prevIsSep = true;
      prevSepChar = ch;
      continue;
    }

    // any other character (digits, punctuation not in the allowed set, emojis, etc.) is invalid
    return false;
  }

  // last character must be a letter (not a separator)
  if (!isLetter(lastChar)) return false;

  // must contain at least one letter
  if (!hasLetter) return false;

  return true;
}
