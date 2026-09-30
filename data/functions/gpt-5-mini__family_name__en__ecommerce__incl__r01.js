function validate(name) {
  if (typeof name !== 'string') return false;
  const s = name.trim();
  if (s.length === 0) return false;

  // Acceptable "separator" characters inside family names:
  // - ASCII hyphen/minus and a range of Unicode hyphen/dash characters
  // - ASCII apostrophe and a couple of common Unicode apostrophe-like chars
  // - Middle dot (used in some names), normal space and no-break space
  const SEPS = "\\-\\u2010\\u2011\\u2012\\u2013\\u2014\\'\\u2019\\u02BC\\u00B7\\u00A0 ";

  // Regex rules:
  // - overall length between 1 and 100 after trim
  // - must contain at least one Unicode letter
  // - may contain Unicode letters (\p{L}) and combining marks (\p{M})
  // - may contain the allowed separators listed above
  // - must not start or end with a separator
  // - must not contain two separators in a row
  const re = new RegExp(
    "^" +
      "(?=.{1,100}$)" +        // length constraint
      "(?=.*\\p{L})" +        // at least one letter
      "(?!.*[" + SEPS + "]{2,})" + // no consecutive separators
      "(?![" + SEPS + "])" +        // doesn't start with a separator
      "(?!.*[" + SEPS + "]$)" +     // doesn't end with a separator
      "[\\p{L}\\p{M}" + SEPS + "]+$",
    "u"
  );

  return re.test(s);
}
