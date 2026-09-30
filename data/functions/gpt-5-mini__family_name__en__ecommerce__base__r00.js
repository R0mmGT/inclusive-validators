function validate(name) {
  // Accept only strings
  if (typeof name !== 'string') return false;

  // Trim whitespace from ends
  name = name.trim();

  // Empty names are invalid
  if (name.length === 0) return false;

  // Limit length (counting Unicode code points) to avoid excessively long input
  const MAX_CHARS = 100;
  if ([...name].length > MAX_CHARS) return false;

  // Rules enforced by the regex:
  // - Must start and end with a letter
  // - Letters may include Unicode letters and combining marks
  // - Allowed separators between letter-groups: space, hyphen, straight apostrophe, left/right curly single quotes
  // - No consecutive separators (each separator must be followed by a letter)
  // - No other characters are allowed
  // Uses Unicode property escapes (\p{L}, \p{M}) and the 'u' flag
  const nameRegex = /^\p{L}[\p{L}\p{M}]*(?:[ '\u2018\u2019-]\p{L}[\p{L}\p{M}]*)*$/u;

  return nameRegex.test(name);
}
