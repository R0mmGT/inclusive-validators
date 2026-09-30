function validate(name) {
  // Basic type and trimming
  if (typeof name !== 'string') return false;
  name = name.trim();
  if (name.length === 0 || name.length > 50) return false;

  // Allow Unicode letters (with combining marks), and internal separators:
  // space, ASCII hyphen-minus -, Unicode hyphen range \u2010-\u2015,
  // ASCII apostrophe ' and common curly apostrophes \u2018\u2019.
  // No separators at start/end, no consecutive separators, no digits or other punctuation.
  const re = /^\p{L}\p{M}*(?:[ \-'\u2018\u2019\u2010-\u2015]\p{L}\p{M}*)*$/u;
  return re.test(name);
}
