function validate(code) {
  // Basic type and trimming
  if (typeof code !== 'string') return false;
  const s = code.trim();
  if (s.length < 2 || s.length > 20) return false; // reasonable global bounds

  // Detect Unicode property escape support
  let unicodeProp = true;
  try {
    new RegExp('\\p{L}', 'u');
  } catch (e) {
    unicodeProp = false;
  }

  // Control characters check (use Unicode property if available, otherwise ascii control range)
  if (unicodeProp) {
    if (/\p{C}/u.test(s)) return false; // contains control/other invisible chars
  } else {
    if (/[\x00-\x1F\x7F]/.test(s)) return false;
  }

  // Build character class for letters/numbers (Unicode aware if possible, otherwise fallback)
  const charClass = unicodeProp ? '\\p{L}\\p{N}' : 'A-Za-z0-9\\u0080-\\uFFFF';

  // Pattern: starts and ends with a letter/number; interior may contain letters, numbers, spaces or hyphens.
  const pattern = new RegExp(`^[${charClass}][${charClass}\\s-]{0,18}[${charClass}]$`, 'u');
  return pattern.test(s);
}
