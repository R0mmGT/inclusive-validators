function validate(name) {
  // Accept only strings
  if (typeof name !== 'string') return false;

  // Trim surrounding whitespace (user-friendly)
  const s = name.trim();

  // Reasonable length limits for a family name
  if (s.length === 0 || s.length > 80) return false;

  // Rules implemented:
  // - Must start and end with a Unicode letter (letters and combining marks considered)
  // - May contain letters, combining marks, spaces, hyphens and apostrophes only
  // - No consecutive separators (space, hyphen, apostrophe)
  // - No leading/trailing separators (ensured by start/end letter rule and trim)
  // Uses Unicode property escapes, requires an environment that supports /u and \p{...}
  const re = /^(?!.*[ \-']{2})(?!.*[ \-']$)[\p{L}\p{M}](?:[\p{L}\p{M} \-']{0,78}[\p{L}\p{M}])?$/u;

  return re.test(s);
}
