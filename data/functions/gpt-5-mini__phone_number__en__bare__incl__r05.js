function validate(input) {
  // Basic type and emptiness checks
  if (typeof input !== 'string') return false;
  let s = input.trim();
  if (!s) return false;

  // Remove common extension markers at the end (ext, x, #, etc.)
  // This covers many languages' common markers but isn't exhaustive.
  s = s.replace(/\s*(?:ext|extension|extn|x|#|доб|内线)\.?:?\s*\d+$/i, '');

  // Map vanity letters to digits (classic phone keypad)
  const map = {
    A: '2', B: '2', C: '2',
    D: '3', E: '3', F: '3',
    G: '4', H: '4', I: '4',
    J: '5', K: '5', L: '5',
    M: '6', N: '6', O: '6',
    P: '7', Q: '7', R: '7', S: '7',
    T: '8', U: '8', V: '8',
    W: '9', X: '9', Y: '9', Z: '9'
  };
  s = s.replace(/[A-Za-z]/g, ch => map[ch.toUpperCase()] || '');

  // Normalize Unicode spaces and common separators by removing everything
  // except digits and leading '+' sign.
  // First, remove all characters except digits and plus.
  s = s.replace(/[^\d+]/g, '');

  // '+' is only allowed at the start
  if ((s.match(/\+/g) || []).length > 1) return false;
  if (s.includes('+') && s[0] !== '+') return false;

  // Allow international dialing prefixes like 00 or 011 by converting them to '+'
  if (!s.startsWith('+')) {
    if (s.startsWith('00')) s = '+' + s.slice(2);
    else if (s.startsWith('011')) s = '+' + s.slice(3);
  }

  // After normalization, string must be either all digits or '+' followed by digits
  if (!/^\+?\d+$/.test(s)) return false;

  // Count digits (exclude any leading '+')
  const digits = s.replace(/\D/g, '');
  // Minimum and maximum reasonable lengths:
  // - E.164 max is 15 digits. Many national numbers are at least 4 digits long.
  // This will accept almost all real-world phone numbers while rejecting too-short/long garbage.
  if (digits.length < 4 || digits.length > 15) return false;

  // If there's an international '+' prefix, the country code cannot start with '0'
  if (s.startsWith('+') && digits[0] === '0') return false;

  // Passed all checks -> likely a valid phone number
  return true;
}
