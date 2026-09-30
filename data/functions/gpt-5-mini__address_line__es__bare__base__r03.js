function validate(line) {
  if (typeof line !== 'string') return false;
  const s = line.trim();
  if (s.length < 3 || s.length > 100) return false;

  // Allowed characters: letters (incl. accents, ñ), digits, spaces and common punctuation in addresses
  const allowed = /^[\p{L}\d\s\.\-\,#\/ºª°\(\)'"]+$/u;
  if (!allowed.test(s)) return false;

  // There must be at least one letter somewhere (street name)
  if (!/\p{L}/u.test(s)) return false;

  // Reject obvious garbage punctuation sequences or stray leading/trailing punctuation
  if (/[\.\-\,#\/]{3,}/.test(s)) return false;
  if (/^[\.\-\,#\/]/.test(s) || /[\.\-\,#\/]$/.test(s)) return false;

  // Number patterns:
  // - "s/n", "sn", "S/N" (sin número) with optional dots/spaces
  // - or a house number like "23", "23B", "23-B", "23/2", "23-2ºB", "12345"
  const snPattern = /\bS\s*\/?\s*N\b/i;
  const numberPattern = /\b\d{1,5}(?:[-\/]\d{1,3})?(?:\s*[ºª°]?[A-Za-z\d]{0,4})?\b/u;

  let match;
  if (snPattern.test(s)) {
    match = s.match(snPattern);
  } else {
    match = s.match(numberPattern);
  }
  if (!match) return false;

  // Ensure there's a street name (letters) either before or after the number/token
  const idx = match.index;
  const before = s.slice(0, idx);
  const after = s.slice(idx + match[0].length);
  if (!(/\p{L}/u.test(before) || /\p{L}/u.test(after))) return false;

  // Basic sanity: no very long runs of spaces
  if (/\s{4,}/.test(s)) return false;

  return true;
}
