function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  // Ensure reasonable length bounds for given names
  if (name.length === 0 || name.length > 100) {
    return false;
  }

  // Regex breakdown:
  // ^[\p{L}]                    - Must start with a Unicode letter
  // (?:                         - Followed by zero or more:
  //   [\p{L}\p{M}]              - Unicode letters or combining marks (diacritics/accents)
  //   |                         - OR
  //   [-'’\s](?=[\p{L}\p{M}])   - A single separator (hyphen, apostrophe, space)
  //                               strictly followed by a Unicode letter/mark
  // )*$                         - Must end without dangling punctuation or spaces
  // 'u' flag enables full Unicode property support
  const namePattern = /^[\p{L}](?:[\p{L}\p{M}]|[-'’\s](?=[\p{L}\p{M}]))*$/u;

  return namePattern.test(name);
}
