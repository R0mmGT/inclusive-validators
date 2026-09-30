function validate(name) {
  // Accept only strings
  if (typeof name !== 'string') return false;

  // Trim surrounding whitespace
  const s = name.trim();
  if (s.length === 0) return false;

  // Must contain at least one letter from any script
  if (!/\p{L}/u.test(s)) return false;

  // Reject numbers (most names don't include digits)
  if (/\p{N}/u.test(s)) return false;

  // Allowed characters:
  // - Unicode letters (\p{L}) and combining marks (\p{M})
  // - whitespace
  // - Unicode dash punctuation (\p{Pd}) like hyphen/en-dash
  // - a few explicitly allowed punctuation characters commonly used in names:
  //   period (.), middle dot (·), and several apostrophe/quote variants
  const allowed = /^[\p{L}\p{M}\s\p{Pd}\.\u00B7\u2027\u0027\u2019\u2018\u02BC\u02BB\u201B]+$/u;
  if (!allowed.test(s)) return false;

  // Must start and end with a letter/mark (no leading/trailing punctuation or spaces)
  if (!/^[\p{L}\p{M}]/u.test(s)) return false;
  if (!/[\p{L}\p{M}]$/u.test(s)) return false;

  // Disallow two or more consecutive non-letter/mark/space characters (e.g. "..", "-'", etc.)
  if (/([^\p{L}\p{M}\s]){2,}/u.test(s)) return false;

  // Disallow punctuation immediately after a space (e.g. "Mary -Jane" or "Mary 'Jane")
  // (Punctuation before a space is common for initials like "J. K. Rowling" so we allow that.)
  if (/\s[^\p{L}\p{M}\s]/u.test(s)) return false;

  // Passed all checks — consider it a valid full name
  return true;
}
