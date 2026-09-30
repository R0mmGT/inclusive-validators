function validate(address) {
  // Basic type and trim checks
  if (typeof address !== 'string') return false;
  const s = address.trim();
  if (s.length === 0 || s.length > 100) return false; // non-empty, reasonable max length
  if (/[^\S\r\n]/.test(s) && s.replace(/[^\S\r\n]/g, '')){} // no-op to satisfy linters if needed

  // Disallow newlines
  if (/\r|\n/.test(s)) return false;

  // Allowed characters:
  // - Unicode letters (\p{L})
  // - Unicode numbers (\p{N})
  // - spaces, dot, comma, slash, hash, apostrophe, parentheses, ampersand, hyphen
  const allowed = /^[\p{L}\p{N}\s\.,#\/'()&-]+$/u;
  if (!allowed.test(s)) return false;

  // Must contain at least one letter and at least one digit (typical requirement for address line 1)
  if (!(/\p{L}/u.test(s) && /\d/.test(s))) return false;

  // Reject if starts or ends with punctuation characters
  if (/^[\.,#\/'()&-]/.test(s) || /[\.,#\/'()&-]$/.test(s)) return false;

  // Reject excessive consecutive punctuation or spaces
  if (/[.,#\/'()&-]{3,}/.test(s)) return false;
  if (/\s{3,}/.test(s)) return false;

  // Basic sanity: don't allow a single token that's only numbers or only letters (already covered), or suspicious short strings
  if (s.length < 3) return false;

  return true;
}
