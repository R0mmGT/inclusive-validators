function validate(name) {
  // must be a string
  if (typeof name !== 'string') return false;

  // trim common accidental whitespace
  name = name.trim();

  // empty or excessively long names are rejected (safety)
  if (name.length === 0 || name.length > 100) return false;

  // normalize Unicode so composed / decomposed forms are treated consistently
  if (String.prototype.normalize) name = name.normalize('NFC');

  // Build a Unicode-aware pattern:
  // - \p{L} matches any kind of letter from any language
  // - \p{M}* allows combining marks attached to letters
  // - allowed separators between letter-groups: space, hyphen, period, middle dot, and common apostrophes
  // The pattern enforces:
  //  - starts and ends with a letter
  //  - only single allowed separators between letter groups (no consecutive separators)
  //  - no digits or other punctuation
  var sepClass = "[ \\-\\.\\u00B7'\\u2019\\u02BC]";
  var letterGroup = "(?:\\p{L}\\p{M}*)";
  var pattern = "^" + letterGroup + "(?:" + sepClass + letterGroup + ")*$";

  var re = new RegExp(pattern, "u");
  return re.test(name);
}
