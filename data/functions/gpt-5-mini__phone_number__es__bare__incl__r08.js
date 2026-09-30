function validate(input) {
  if (typeof input !== 'string') return false;

  // Trim and normalize common "tel:" prefix
  let s = input.trim().replace(/^tel:\s*/i, '');
  if (s.length === 0) return false;

  // Extract and remove a common extension (ext, x, #, anexo, extension)
  // Extension digits must be contiguous Unicode digits
  const extRe = /\s*(?:#|x|ext(?:ension)?\.?|anexo)\s*(\p{Nd}+)/iu;
  let main = s;
  const extMatch = s.match(extRe);
  if (extMatch) {
    main = s.slice(0, extMatch.index).trim();
    const extDigits = extMatch[1].match(/\p{Nd}/gu) || [];
    if (extDigits.length === 0 || extDigits.length > 6) return false; // extension too long or empty
  }

  if (main.length === 0) return false;

  // '+' may only appear at the start (for international numbers)
  const plusCount = (main.match(/\+/g) || []).length;
  if (plusCount > 1) return false;
  if (plusCount === 1 && main[0] !== '+') return false;

  // Parentheses must be balanced and not closed before opened
  let depth = 0;
  for (let ch of main) {
    if (ch === '(') depth++;
    else if (ch === ')') {
      depth--;
      if (depth < 0) return false;
    }
  }
  if (depth !== 0) return false;

  // Count all Unicode decimal digits (this handles Arabic-Indic, Devanagari, fullwidth, etc.)
  const digits = main.match(/\p{Nd}/gu) || [];
  const digitCount = digits.length;

  // Accept numbers that fit ITU-T E.164 maximum (15 digits).
  // Many national numbers will be 7-15 digits; 7 is a reasonable practical minimum.
  if (digitCount < 7 || digitCount > 15) return false;

  // Disallow letters in the main part (other than allowed extension which was removed)
  if (/\p{L}/u.test(main)) return false;

  // Ensure remaining characters (after removing leading '+' and all digits) are only common separators/punctuation
  let tmp = main;
  if (tmp[0] === '+') tmp = tmp.slice(1);
  tmp = tmp.replace(/\p{Nd}/gu, '');
  // Allow spaces, dots, hyphens, parentheses, slashes and some common bullets/non-breaking spaces
  tmp = tmp.replace(/[\s.\-()\/·•\u00A0\u202F\u2009#]/g, '');
  if (tmp.length > 0) return false;

  return true;
}
