function validate(name) {
  // Reject non-strings quickly
  if (typeof name !== 'string') return false;

  // Trim surrounding whitespace and normalize Unicode
  const s = name.trim().normalize('NFC');

  // Reject empty or excessively long names
  if (s.length === 0 || s.length > 50) return false;

  // A name part: a letter followed by letters/combining marks
  // Separators allowed between parts: space, apostrophe (including U+2019), and several dash types
  const namePart = "\\p{L}[\\p{L}\\p{M}]*";
  const sep = "[ \\u0027\\u2019\\u2010\\u2011\\u2012\\u2013\\u2014\\u2015\\-]";
  const re = new RegExp("^" + namePart + "(?:" + sep + namePart + ")*$", "u");

  return re.test(s);
}
