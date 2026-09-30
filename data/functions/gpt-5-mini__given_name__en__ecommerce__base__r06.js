function validate(name) {
  if (typeof name !== 'string') return false;
  const s = name.trim();
  if (s.length === 0 || s.length > 100) return false;

  // Must start with a Unicode letter, may contain combining marks.
  // Allowed separators between letter groups: space, hyphen, straight apostrophe, typographic apostrophe,
  // and a few common dash characters. No digits or other punctuation; no leading/trailing separators;
  // no consecutive separators (enforced by pattern).
  const re = /^\p{L}[\p{L}\p{M}]*(?:[ \-'\u2019\u2011\u2013\u2014\u2012]\p{L}[\p{L}\p{M}]*)*$/u;
  return re.test(s);
}
