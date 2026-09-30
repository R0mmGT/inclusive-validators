function validate(postal) {
  // Accept only strings
  if (typeof postal !== 'string') return false;

  // Trim surrounding whitespace (users may paste extra spaces)
  const value = postal.trim();

  // Empty strings are invalid
  if (value.length === 0) return false;

  // Reasonable length bounds to avoid runaway input; most postal codes worldwide
  // are short (commonly between 2 and 12 characters). Allow up to 20 to be inclusive.
  if (value.length > 20) return false;

  // Disallow control characters or unprintable characters
  // (\p{C} is Unicode category for other/control characters)
  if (/\p{C}/u.test(value)) return false;

  // Ensure there's at least one letter or number somewhere (prevents strings of only punctuation/space)
  const hasAlnum = /[\p{L}\p{N}]/u.test(value);
  if (!hasAlnum) return false;

  // Allow a broad but safe set of characters commonly used in postal codes across languages:
  // - Unicode letters (\p{L}) and numbers (\p{N})
  // - Combining marks (\p{M}) so scripts that use diacritics are OK
  // - Spaces and a few punctuation characters commonly used (hyphen, slashes, dot, #, underscore,
  //   en/em dashes, middle dot and bullet)
  // The u flag enables Unicode property escapes.
  const allowed = /^[\s\p{L}\p{N}\p{M}\-–—_\/#·•\.]+$/u;
  return allowed.test(value);
}
