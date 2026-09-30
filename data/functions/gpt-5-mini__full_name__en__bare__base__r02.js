function validate(name) {
  if (typeof name !== 'string') return false;
  const s = name.trim();
  if (s.length === 0) return false;

  // reject multiple consecutive spaces
  if (/\s{2,}/.test(s)) return false;

  // A name "part" can be:
  // - a single letter optionally followed by a dot (initial), e.g. "J" or "J."
  // - or a word of 2+ letters (including Unicode letters + marks) possibly containing
  //   internal hyphens or apostrophes (e.g. "Mary-Jane", "O'Connor").
  // We allow the Unicode curly apostrophe ’ as well.
  const part = "(?:\\p{L}\\.?|\\p{L}\\p{M}+(?:['’\\-]\\p{L}\\p{M}+)*)";

  // Require at least two parts (first and last name), separated by single spaces.
  const re = new RegExp("^" + part + "(?: " + part + ")+$", "u");

  return re.test(s);
}
