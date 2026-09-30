function validate(name) {
  if (typeof name !== 'string') return false;
  const s = name.trim();
  if (s.length < 2 || s.length > 100) return false;

  // Rules implemented by the regex:
  // - At least two name parts separated by whitespace (first + at least one more)
  // - Parts may be:
  //     * a single-letter initial with a trailing dot (e.g. "J.")
  //     * or a word made of Unicode letters, possibly containing internal hyphens or apostrophes (e.g. "Anne-Marie", "O'Neil")
  // - No consecutive spaces, no doubled hyphens/apostrophes, no consecutive dots
  // - No digits or other symbols
  const re = /^(?=.{2,100}$)(?!.*\s{2,})(?!.*[-'’]{2,})(?!.*\.\.)(?:(?:\p{L}\.)|(?:\p{L}\p{M}*(?:['’\-]\p{L}\p{M}*)*))(?:\s+(?:(?:\p{L}\.)|(?:\p{L}\p{M}*(?:['’\-]\p{L}\p{M}*)*)))+$/u;

  return re.test(s);
}
