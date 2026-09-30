function validate(name) {
  if (typeof name !== 'string') return false;
  name = name.trim();
  if (!name) return false;

  // count Unicode code points to enforce a reasonable maximum
  const length = [...name].length;
  if (length > 100) return false;

  // Pattern explanation (using Unicode property escapes with the 'u' flag):
  // - (?:\p{L}\p{M}*)+  : one or more "letter clusters" (base letter + optional combining marks)
  // - (?:[seps](?:\p{L}\p{M}*)+)* : zero or more groups that start with a single separator
  //   (space separator, any dash, common apostrophe variants, middle dot, Japanese middle dot, or period)
  //   followed by one or more letter clusters.
  // This allows names from any script, permits hyphens, apostrophes, dots and single spaces
  // between letter groups, forbids leading/trailing separators and consecutive separators,
  // and disallows digits/symbols/underscores.
  const re = /^(?:\p{L}\p{M}*)+(?:[\p{Zs}\p{Pd}'’‘ʼ\u02BC\u00B7·\u30FB\.](?:\p{L}\p{M}*)+)*$/u;

  return re.test(name);
}
