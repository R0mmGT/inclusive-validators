function validate(s) {
  if (typeof s !== 'string') return false;
  s = s.trim();
  if (s.length === 0 || s.length > 100) return false;
  try { s = s.normalize('NFC'); } catch (e) {}
  // Pieces are Unicode letters with optional combining marks and an optional trailing dot (for abbreviations like "St."),
  // pieces may be joined by a single space, hyphen or apostrophe. No digits, no leading/trailing separators, no double separators.
  const nameRegex = /^(?!.*[ '\-]{2})(?!^[ '\-])(?!.*[ '\-]$)(?!.*\d)(?:\p{L}\p{M}*(?:\.)?(?:[ '\-]\p{L}\p{M}*(?:\.)?)*)$/u;
  return nameRegex.test(s);
}
