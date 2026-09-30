function validate(input) {
  // Validate type
  if (typeof input !== 'string') return false;
  let s = input.trim();
  if (s.length === 0) return false;

  // Accept and strip a leading "tel:" scheme if present
  s = s.replace(/^tel:/i, '').trim();

  // Extract and remove a common extension suffix (ext, x, #, extension)
  // Supports Unicode digits in the extension with \p{Nd}
  const extRegex = /(?:[\s,;-]*?(?:ext(?:ension)?|ext\.|x|#)[\s:.\-]*)((?:\p{Nd}){1,6})$/iu;
  const extMatch = s.match(extRegex);
  if (extMatch) {
    // remove the extension portion from the string
    s = s.slice(0, extMatch.index).trim();
  }

  // Convert all Unicode decimal digits to ASCII digits (e.g. Arabic-Indic)
  // \p{Nd} matches any Unicode decimal digit
  s = s.replace(/\p{Nd}/gu, d => String(Number(d)));

  // Quick reject: alphabetic letters (other than allowed extension removed) are not allowed
  if (/[A-Za-z\u00C0-\u024F]/.test(s)) return false;

  // Parentheses must be balanced and not interleaved with other parentheses content
  const opens = (s.match(/\(/g) || []).length;
  const closes = (s.match(/\)/g) || []).length;
  if (opens !== closes) return false;
  if (opens > 0) {
    // ensure parentheses appear in non-overlapping pairs and contain only digits/allowed separators
    // remove each well-formed parenthesized chunk and check the remainder doesn't contain parentheses
    const remainderAfterRemovingPairs = s.replace(/\([^)]*\)/g, '');
    if (/[()]/.test(remainderAfterRemovingPairs)) return false;
    // ensure inside each parentheses there's no letters or invalid symbols
    const insideInvalid = s.match(/\(([^)]*)\)/g)?.some(chunk => !/^[\d\s\-\.\u00A0]*$/.test(chunk.slice(1, -1)));
    if (insideInvalid) return false;
  }

  // Normalize separators: allow spaces, NBSP, hyphens, dots
  let normalized = s.replace(/[\s\u00A0\-\.\u2013\u2014]/g, '');

  // Treat international prefix 00 as + (common alternative)
  normalized = normalized.replace(/^00/, '+');

  // Remove any remaining parentheses (they've been validated above)
  normalized = normalized.replace(/[()]/g, '');

  // Now only a leading + and digits are allowed
  if (!/^\+?\d+$/.test(normalized)) return false;

  // Count digits (E.164 allows up to 15 digits). Allow a reasonable minimum (4)
  // This accepts international numbers (+...) and national numbers without +
  const digits = normalized.replace(/^\+/, '');
  if (digits.length < 4 || digits.length > 15) return false;

  // Passed all checks -> likely a valid international phone number string
  return true;
}
