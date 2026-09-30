function validate(name) {
  // Must be a string
  if (typeof name !== 'string') return false;

  // Trim obvious surrounding whitespace
  name = name.trim();
  if (name.length === 0) return false;

  // Avoid pathological lengths
  if (name.length > 200) return false;

  // This pattern:
  // - Uses Unicode property escapes (u flag) so it works across scripts.
  // - A "part" is a letter followed by any number of letters or combining marks.
  // - Parts may be separated by a single separator character (space-like characters, ASCII apostrophe,
  //   right single quotation mark, middle dot, and various hyphen/dash codepoints).
  // - The whole string must be one or more parts joined by single separators, starting and ending with a letter.
  //
  // This permits names from all writing systems while rejecting digits, punctuation (other than a controlled set),
  // control characters, and consecutive separators.
  try {
    const part = "\\p{L}[\\p{L}\\p{M}]*";
    // \p{Zs} covers unicode space separator characters (regular space, NBSP, etc.)
    // include common apostrophes, middle dot (·), and a range of hyphen/dash characters
    const sep = "[\\p{Zs}'\\u2019\\u00B7\\u2010-\\u2014]";
    const re = new RegExp(`^${part}(?:${sep}${part})*$`, 'u');
    return re.test(name);
  } catch (e) {
    // If the environment doesn't support Unicode property escapes (very old JS engines),
    // fall back to a conservative ASCII+Latin-1-ish check that still permits common name characters.
    const fallback = /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:[ '\u2019\u00B7\u2010-\u2014][A-Za-zÀ-ÖØ-öø-ÿ]+)*$/;
    return fallback.test(name);
  }
}
