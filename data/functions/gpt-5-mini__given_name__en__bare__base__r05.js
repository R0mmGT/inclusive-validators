function validate(name) {
  // Must be a string
  if (typeof name !== 'string') return false;

  // Trim surrounding whitespace
  name = name.trim();
  if (name.length === 0) return false;

  // Reasonable length limits for a given name
  if (name.length > 50) return false;

  // Pattern:
  // - Start with a letter (\p{L}), optionally followed by combining marks (\p{M})
  // - Allows internal groups of a single separator (space, hyphen variants, ASCII and curly apostrophes)
  //   followed by a letter+combining marks sequence.
  // - Rejects digits, punctuation, consecutive separators, or separators at ends.
  const re = /^\p{L}[\p{L}\p{M}]*(?:[ \-'\u2019\u2018\u2010-\u2015]\p{L}[\p{L}\p{M}]*)*$/u;

  return re.test(name);
}
