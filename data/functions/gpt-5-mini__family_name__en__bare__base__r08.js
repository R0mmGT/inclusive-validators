function validate(name) {
  if (typeof name !== 'string') return false;
  name = name.trim();
  if (name.length === 0 || name.length > 100) return false;

  // Rules:
  // - Allow any Unicode letters (all scripts) and combining marks.
  // - Allow single separators between letter groups: space, hyphen (-), ASCII apostrophe ('), and right single quote (’ U+2019).
  // - No leading/trailing separators, no consecutive separators, and each segment must start with a letter.
  const re = /^(?!.*[ \-'\u2019]{2})(?![ \-'\u2019])\p{L}[\p{L}\p{M}]*(?:[ \-'\u2019]\p{L}[\p{L}\p{M}]*)*$/u;
  return re.test(name);
}
