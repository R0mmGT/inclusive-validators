function validate(fullName) {
  if (typeof fullName !== 'string') return false;

  // Normalize whitespace (collapse runs of whitespace to a single space) and trim
  const name = fullName.replace(/\s+/g, ' ').trim();

  // Reasonable length checks
  if (name.length < 2 || name.length > 100) return false;

  // Each part may be:
  // - a sequence of Unicode letters (with combining marks) possibly containing internal
  //   apostrophes (straight or typographic) or hyphens (but not starting/ending with them),
  // - or a single-letter initial followed by a dot (e.g. "J.")
  //
  // We use Unicode property escapes (\p{L}, \p{M}) so this works with accented and non-Latin letters.
  const part = "(?:\\p{L}\\p{M}*(?:[\\-\\'\\u2019]\\p{L}\\p{M}*)*|\\p{L}\\.)";
  // Require at least two parts (first part + one or more following parts separated by a single space)
  const re = new RegExp("^" + part + "(?: " + part + ")+$", "u");

  return re.test(name);
}
