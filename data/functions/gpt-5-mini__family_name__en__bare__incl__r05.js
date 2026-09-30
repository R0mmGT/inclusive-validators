function validate(name) {
  // Accept only strings
  if (typeof name !== 'string') return false;

  // Normalize to a canonical Unicode form so combining marks are handled consistently.
  // Most modern JS engines support String.prototype.normalize.
  try {
    name = name.normalize('NFC');
  } catch (e) {
    // ignore if not supported
  }

  // Reasonable overall length limits (allow single-character family names and up to 100 chars)
  if (name.length === 0 || name.length > 100) return false;

  // This regex aims to be permissive across global naming conventions while rejecting digits,
  // control characters, emojis, and most symbols. It allows:
  // - Any Unicode letter (\p{L}) and combining marks (\p{M}) so scripts like Latin, Cyrillic,
  //   Han, Hangul, Arabic, etc. are accepted.
  // - A small set of punctuation commonly found in family names: space, hyphen, apostrophes
  //   (ASCII ' and Unicode RIGHT SINGLE QUOTATION MARK), middle dot (·), and period.
  // It also enforces:
  // - At least one letter present.
  // - No leading or trailing punctuation/space.
  // - No consecutive punctuation/space characters.
  //
  // Note: This uses Unicode property escapes, so a modern JS runtime with the 'u' flag is required.
  const re = /^(?=.{1,100}$)(?=.*\p{L})(?!.*[ \-'\u2019\u00B7\.]{2,})(?!^[ \-'\u2019\u00B7\.])(?!.*[ \-'\u2019\u00B7\.]$)[\p{L}\p{M} \-'\u2019\u00B7\.]+$/u;

  return re.test(name);
}
