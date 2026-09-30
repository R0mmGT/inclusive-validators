function validate(name) {
  // Must be a string
  if (typeof name !== 'string') return false;

  // Trim surrounding whitespace
  const s = name.trim();

  // Reject empty or overly long names
  if (s.length === 0 || s.length > 50) return false;

  // Allow Unicode letters (with combining marks). Permit internal single
  // separators: space, hyphen (-), ASCII apostrophe ('), and right single
  // quotation mark (’). Separators cannot appear at ends or consecutively.
  const re = /^[\p{L}\p{M}]+(?:[ \-\u0027\u2019][\p{L}\p{M}]+)*$/u;

  return re.test(s);
}
