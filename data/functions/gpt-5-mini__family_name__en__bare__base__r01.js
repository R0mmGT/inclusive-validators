function validate(name) {
  if (typeof name !== 'string') return false;
  name = name.trim();
  if (name.length === 0 || name.length > 100) return false;

  // Allow Unicode letters (and combining marks), with optional internal single
  // separators: space, hyphen or apostrophe. Separators cannot appear at the
  // start or end, nor appear consecutively.
  const re = /^\p{L}[\p{L}\p{M}]*(?:[ '\-]\p{L}[\p{L}\p{M}]*)*$/u;
  return re.test(name);
}
