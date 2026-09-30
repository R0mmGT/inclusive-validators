function validate(address) {
  if (typeof address !== 'string') return false;
  // Normalize whitespace
  const a = address.trim().replace(/\s+/g, ' ');
  if (a.length < 5 || a.length > 120) return false;

  // Allowed characters: any Unicode letter, number, spaces and a limited set of punctuation commonly used in addresses
  const allowed = /^[\p{L}\p{N}\s\.\,\/\#\-\ºª°\(\)'":;]+$/u;
  if (!allowed.test(a)) return false;

  // Must contain at least one letter (street name)
  if (!/\p{L}/u.test(a)) return false;

  // Street name should include at least two consecutive letters (avoid single-letter noise)
  if (!/\p{L}{2,}/u.test(a)) return false;

  // Must contain a house number (one or more digits) OR common "sin número" tokens like "s/n", "S/N", "SN"
  const hasNumber = /\p{N}/u.test(a);
  const hasSn = /\bS\s*\/?\s*N\b/i.test(a) || /\bSN\b/i.test(a);
  if (!hasNumber && !hasSn) return false;

  // Reject obviously malformed sequences like many repeated punctuation characters
  if (/[.,\/#\-\:\;]{3,}/.test(a)) return false;

  return true;
}
