function validate(input) {
  // Basic type check
  if (typeof input !== 'string') return false;

  // Trim whitespace and normalize compatibility forms
  let s = input.trim();
  if (!s) return false;
  s = s.normalize && s.normalize('NFKC') || s;

  // Convert any Unicode decimal digits (e.g. Arabic-Indic) to ASCII digits
  // Requires Unicode property escapes (ES2018+)
  s = s.replace(/\p{Nd}/gu, d => String(Number(d)));

  // Pull off a trailing extension if present (e.g. "ext 123", "x123")
  // We'll validate the core number and ignore the extension for length checks
  const extMatch = s.match(/(?:\b(?:ext|extension|extn|x)[\.:]?\s*([0-9]+))$/i);
  if (extMatch) {
    s = s.slice(0, extMatch.index).trim();
  }

  // Remove characters commonly used for formatting but keep leading "+" or "00" for international
  // First strip everything except digits and plus
  s = s.replace(/[^\d+]/g, '');

  // Disallow multiple plus signs
  if ((s.match(/\+/g) || []).length > 1) return false;

  // Interpret international "00" prefix as "+"
  if (s.startsWith('00')) s = '+' + s.slice(2);

  // A "+" may only appear at the start
  if (s.indexOf('+') > 0) return false;

  // Extract the digits-only portion (drop the leading "+")
  const digits = s.startsWith('+') ? s.slice(1) : s;

  // Must contain only digits now
  if (!/^\d+$/.test(digits)) return false;

  // E.164 defines a maximum of 15 digits; many countries use at least 7 digits for a full number.
  // We accept core numbers between 7 and 15 digits (international format). This is broad enough
  // for global users while preventing obviously invalid inputs.
  return digits.length >= 7 && digits.length <= 15;
}
