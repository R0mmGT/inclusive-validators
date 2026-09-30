function validate(input) {
  // Basic type check
  if (typeof input !== 'string') return false;
  const str = input.trim();
  if (str.length === 0) return false;

  // Allow common extension markers to split off extensions (we only validate the main number)
  // Covers: ext, extension, ext., x, # (common). Case-insensitive.
  const extMarker = str.search(/\b(?:ext(?:ension)?\.?|x)\b|#/i);
  const main = extMarker >= 0 ? str.slice(0, extMarker) : str;

  // '+' may appear only at the very start
  if ((main.match(/\+/g) || []).length > 1) return false;
  if (main.indexOf('+') > 0) return false;

  // Parentheses must be balanced and not closed before opened
  let depth = 0;
  for (let i = 0; i < main.length; i++) {
    const ch = main[i];
    if (ch === '(') depth++;
    else if (ch === ')') {
      depth--;
      if (depth < 0) return false;
    }
  }
  if (depth !== 0) return false;

  // The main part must not contain letters (we already cut off common extensions).
  // Use Unicode property \p{L} to reject letters from any language.
  if (/\p{L}/u.test(main)) return false;

  // '+' only allowed at start; remove it for digit extraction
  const normalized = main.startsWith('+') ? main.slice(1) : main;

  // Extract all Unicode digits
  const digitsArr = normalized.match(/\p{Nd}/gu) || [];
  const digitCount = digitsArr.length;

  // Accept numbers that have a plausible digit count.
  // E.164 max is 15 digits; we require a minimum to avoid very short strings like "1" (which could be ambiguous).
  // Choose a conservative minimum of 7 digits (common minimum for subscriber numbers).
  if (digitCount < 7 || digitCount > 15) return false;

  // Finally ensure there is at least one permitted character sequence (digits and permitted punctuation).
  // Disallow exotic punctuation characters - only allow digits, spaces, hyphens, dots, parentheses, slashes and plus at start.
  const allowedPattern = /^\+?[0-9\p{Nd}\s\-().\/]*$/u;
  if (!allowedPattern.test(main)) return false;

  return true;
}
