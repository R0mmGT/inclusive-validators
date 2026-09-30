function validate(input) {
  // Accept only strings
  if (typeof input !== 'string') return false;
  let s = input.trim();
  if (!s) return false;

  // Remove a common extension suffix (e.g. "ext 1234", "x123", "extension: 5", "#123")
  // Uses Unicode digit class \p{Nd} so it will match Arabic-Indic and other decimal digits.
  const extPattern = /(?:\b(?:ext|extension)\b\.?|\b[x]\b|#)\s*[:.-]?\s*\p{Nd}+/iu;
  const extMatch = s.match(extPattern);
  if (extMatch && typeof extMatch.index === 'number') {
    s = s.slice(0, extMatch.index).trim();
    if (!s) return false;
  }

  // Mapping for vanity letters to digits (standard telephone keypad)
  const letterMap = {
    A: '2', B: '2', C: '2',
    D: '3', E: '3', F: '3',
    G: '4', H: '4', I: '4',
    J: '5', K: '5', L: '5',
    M: '6', N: '6', O: '6',
    P: '7', Q: '7', R: '7', S: '7',
    T: '8', U: '8', V: '8',
    W: '9', X: '9', Y: '9', Z: '9'
  };

  // Allowed separator characters
  const separators = new Set([' ', '\u00A0', '-', '.', '(', ')', '/', '\u2009', '\u2002', '\t']);

  let seenPlus = false;
  let digits = '';

  for (let i = 0; i < s.length; i++) {
    const ch = s[i];

    // Allow a single leading plus sign for international format
    if (ch === '+') {
      if (i !== 0 || seenPlus) return false; // plus only allowed at start and only once
      seenPlus = true;
      continue;
    }

    if (separators.has(ch)) {
      continue; // skip separators
    }

    // ASCII letters (vanity numbers) -> map to digits
    if (/[A-Za-z]/.test(ch)) {
      const upper = ch.toUpperCase();
      if (!letterMap[upper]) return false;
      digits += letterMap[upper];
      continue;
    }

    // Unicode decimal digit (covers many scripts: Arabic-Indic, Devanagari, etc.)
    if (/\p{Nd}/u.test(ch)) {
      // Convert the single-digit character to its numeric value then to ASCII digit
      const num = Number(ch);
      if (!Number.isFinite(num) || num < 0 || num > 9) return false;
      digits += String(num);
      continue;
    }

    // Anything else is invalid (letters from non-Latin scripts, symbols, emojis, etc.)
    return false;
  }

  // Validate digit count.
  // E.164 defines a maximum of 15 digits for international numbers.
  // Many valid national numbers are shorter; to be inclusive across countries/cultures
  // accept between 3 and 15 digits. (Adjust minDigits if you want stricter rules.)
  const minDigits = 3;
  const maxDigits = 15;
  if (digits.length < minDigits || digits.length > maxDigits) return false;

  // Reject strings that were only a plus or only separators
  return true;
}
