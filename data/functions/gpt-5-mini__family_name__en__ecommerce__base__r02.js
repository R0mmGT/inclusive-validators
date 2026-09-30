function validate(name) {
  // Must be a string
  if (typeof name !== 'string') return false;
  // Trim surrounding whitespace (common for user input)
  name = name.trim();
  if (name.length === 0) return false;
  // Reasonable upper limit to avoid denial-of-service via extremely long input
  if (name.length > 100) return false;

  // This pattern allows:
  // - Unicode letters (\p{L}) and combining marks (\p{M}) (covers diacritics)
  // - Single separators between letter groups: space, ASCII hyphen (-),
  //   common Unicode hyphen variants, ASCII apostrophe ('), and common apostrophe variants,
  //   and middle dot (·) used in some names.
  // It forbids leading/trailing separators and consecutive separators.
  const sep = "\\-\\u2010\\u2011\\u2012\\u2013\\u2014" + // various hyphens/dashes
              "\\'\\u2019\\u02BC" +                    // apostrophes (', ’, ʼ)
              "\\u00B7" +                              // middle dot ·
              "\\s";                                   // space
  const re = new RegExp(
    "^[\\p{L}\\p{M}]+" +                 // starts with one or more letters/marks
    "(?:[" + sep + "][\\p{L}\\p{M}]+)*$",
    "u"
  );

  return re.test(name);
}
