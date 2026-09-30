function validate(name) {
  if (typeof name !== 'string') return false;
  name = name.trim();
  if (name.length === 0 || name.length > 40) return false;

  // Accept Unicode letters (including CJK, accented letters, etc.) and combining marks.
  // Allow single internal separators: space, ASCII apostrophe ('), right single quote (’ \u2019),
  // and common hyphen characters (\u002D, \u2010-\u2015). Separators cannot appear at the
  // start or end, nor consecutively.
  const re = /^\p{L}[\p{L}\p{M}]*(?:[ '\u2019\-\u2010-\u2015]\p{L}[\p{L}\p{M}]*)*$/u;
  return re.test(name);
}
