function validate(name) {
  // Accept only strings
  if (typeof name !== 'string') return false;

  // Normalize to a composed form to handle combining marks consistently
  if (typeof name.normalize === 'function') {
    name = name.normalize('NFC');
  }

  // Trim common surrounding whitespace (users rarely expect leading/trailing spaces in names)
  name = name.trim();

  // Empty or unreasonably long names are invalid
  if (name.length === 0 || name.length > 255) return false;

  // Build a safe character class for allowed punctuation/spacing characters.
  // We include:
  // - space and no-break-space
  // - common hyphens
  // - periods and middle dot (e.g. Catalan L·l)
  // - common apostrophe characters and the Hawaiian ʻ (modifier letter)
  const allowedPunctChars = [
    ' ',         // U+0020
    '\u00A0',    // NO-BREAK SPACE
    '-',         // hyphen-minus U+002D
    '\u2010',    // hyphen U+2010
    '\u2011',    // non-breaking hyphen U+2011
    '.',         // period
    '\u00B7',    // middle dot
    "'",         // apostrophe
    '\u2019',    // right single quotation mark
    '\u2018',    // left single quotation mark
    '\u02BB',    // modifier letter turned comma (ʻ)
    '\u02BC'     // modifier letter apostrophe
  ];

  // Escape characters that are special inside a character class
  const escapeForCharClass = (ch) => {
    if (ch === '-' ) return '\\-';
    if (ch === ']' ) return '\\]';
    if (ch === '\\') return '\\\\';
    // most other characters (including Unicode letters) are safe here
    return ch;
  };

  const punctClass = allowedPunctChars.map(escapeForCharClass).join('');

  // Build the regex:
  // - ^(?![punct]) : must not start with a punctuation/space
  // - (?!.*[punct]$) : must not end with a punctuation/space
  // - (?!.*[punct]{2}) : no two punctuation/space characters adjacent (prevents "--", "  ", "''", etc.)
  // - (?=.*\p{L}) : must contain at least one Unicode letter
  // - [\p{L}\p{M}punct]+$ : only Unicode letters, marks (combining marks) and allowed punctuation
  const pattern = new RegExp(
    '^(?![' + punctClass + '])' +
    '(?!.*[' + punctClass + ']$)' +
    '(?!.*[' + punctClass + ']{2})' +
    '(?=.*\\p{L})' +
    '[\\p{L}\\p{M}' + punctClass + ']+$',
    'u'
  );

  return pattern.test(name);
}
