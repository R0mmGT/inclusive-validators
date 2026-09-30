function validate(input) {
  // Basic type/empty check
  if (typeof input !== 'string') return false;
  let s = input.trim();
  if (!s) return false;

  // Extract and remove an extension if present (e.g., "ext 123", "x123", "extension 123")
  const extRegex = /\s*(?:ext|ext\.|extension|x)\s*[:.]?\s*([\p{Nd}]{1,15})\s*$/iu;
  const extMatch = s.match(extRegex);
  if (extMatch) {
    // extension digits count sanity check (1-15)
    const extDigits = extMatch[1] ? extMatch[1].match(/\p{Nd}/gu) : null;
    if (!extDigits || extDigits.length === 0 || extDigits.length > 15) return false;
    s = s.slice(0, extMatch.index).trim();
  }

  // Map common vanity letters (A-Z) to digits per telephone keypad
  const letterToDigit = {
    A: '2', B: '2', C: '2',
    D: '3', E: '3', F: '3',
    G: '4', H: '4', I: '4',
    J: '5', K: '5', L: '5',
    M: '6', N: '6', O: '6',
    P: '7', Q: '7', R: '7', S: '7',
    T: '8', U: '8', V: '8',
    W: '9', X: '9', Y: '9', Z: '9'
  };
  s = s.replace(/[A-Za-z]/g, function(ch) {
    return letterToDigit[ch.toUpperCase()] || '';
  });

  // Allowed characters in main number: digits (all Unicode number digits), spaces, common separators and one optional leading +
  if (!/^[+\p{Nd}\s\-\.\(\)\/,~]+$/u.test(s)) return false;

  // Plus sign rules: at most one and only at the very start if present
  const plusCount = (s.match(/\+/g) || []).length;
  if (plusCount > 1) return false;
  if (plusCount === 1 && s[0] !== '+') return false;

  // Parentheses must be balanced and cannot close before opening
  let depth = 0;
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (ch === '(') {
      depth++;
      // avoid empty parentheses like "()" which are rarely valid
      if (s[i+1] === ')') return false;
    } else if (ch === ')') {
      depth--;
      if (depth < 0) return false;
    }
  }
  if (depth !== 0) return false;

  // Count Unicode digits (this counts digits in other scripts too)
  const digits = s.match(/\p{Nd}/gu) || [];
  const digitCount = digits.length;

  // Reasonable bounds: international E.164 allows up to 15 digits.
  // Allow very short emergency numbers (2+ digits). Adjust as pragmatic compromise.
  if (digitCount < 2 || digitCount > 15) return false;

  // Reject strings that are just separators or just a plus sign
  if (digitCount === 0) return false;

  // Prevent sequences that are obviously not phone-like (e.g., many separators with too few digits)
  // No more than 4 non-digit characters in a row (heuristic)
  if (/[^\p{Nd}]{5,}/u.test(s)) return false;

  return true;
}
