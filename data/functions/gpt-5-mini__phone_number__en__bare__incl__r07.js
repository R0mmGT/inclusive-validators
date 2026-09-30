function validate(input) {
  // Basic type/trim check
  if (typeof input !== 'string') return false;
  let s = input.trim();
  if (!s) return false;

  // Parentheses must be balanced and not interleaved
  let depth = 0;
  for (let ch of s) {
    if (ch === '(') depth++;
    else if (ch === ')') {
      depth--;
      if (depth < 0) return false;
    }
  }
  if (depth !== 0) return false;

  // Remove a common extension at the end (ext, x, extension, # and some localized shortcuts).
  // Uses Unicode digit property to support non-latin digits.
  const extPattern = /(?:[ ,;]*?(?:ext|extension|x|#|доб|доп|доб\.|内線)\s*[:\.]?\s*\p{Nd}+)\s*$/iu;
  if (extPattern.test(s)) {
    s = s.replace(extPattern, '').trim();
    if (!s) return false;
  }

  // Remove common separators but keep leading + and digits (including Unicode digits).
  // This removes spaces, NBSP, various dash types, dots, parentheses and slashes.
  s = s.replace(/[\s\u00A0\u2000-\u200B\-\.\(\)\/‐‑–—]+/g, '');

  if (!s) return false;

  // Convert international dialing prefixes 00 and 011 to + for normalization
  if (/^00\p{Nd}/u.test(s)) s = '+' + s.slice(2);
  else if (/^011\p{Nd}/u.test(s)) s = '+' + s.slice(3);

  // There must be at most one plus and if present it must be the first char
  if ((s.match(/\+/g) || []).length > 1) return false;
  if (s.indexOf('+') > 0) return false;

  // Build ASCII-only digit string from Unicode digits (category Nd).
  // If any character is not a decimal digit (Unicode Nd) or leading +, reject.
  let digits = '';
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (ch === '+') continue;
    if (/\p{Nd}/u.test(ch)) {
      // Number(ch) works for Unicode decimal digits (Nd), yielding the numeric value 0-9.
      const v = Number(ch);
      if (!Number.isFinite(v)) return false;
      digits += String(v);
    } else {
      return false;
    }
  }

  // Enforce length limits based on international E.164 (max 15 digits).
  // Allow very short emergency/local codes: minimum 2 digits (e.g. "11", "911", "112").
  // This gives broad cultural coverage while preventing nonsense strings.
  if (digits.length < 2 || digits.length > 15) return false;

  // Reject sequences that are obviously not phone numbers: all same digit repeatedly
  // (e.g. "0000000", "1111111") or very short repetitive patterns.
  if (/^([0-9])\1{1,}$/.test(digits)) return false;

  return true;
}
