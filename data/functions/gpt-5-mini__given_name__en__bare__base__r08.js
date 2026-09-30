function validate(name) {
  if (typeof name !== 'string') return false;
  const s = name.trim();
  if (s.length === 0 || s.length > 100) return false;
  // Allowed: Unicode letters and combining marks, hyphen, apostrophe (') and right single quote (’), and space.
  // Rules:
  // - Must start and end with a letter.
  // - No two separators (space, hyphen, apostrophe/’) in a row.
  const re = /^(?!.*[ \-'\u2019]{2})[\p{L}\p{M}](?:[\p{L}\p{M}'\u2019\- ]*[\p{L}\p{M}])?$/u;
  return re.test(s);
}
