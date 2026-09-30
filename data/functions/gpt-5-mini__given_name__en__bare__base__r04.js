function validate(name) {
  if (typeof name !== 'string') return false;
  name = name.trim();
  if (name.length === 0) return false;

  // limit length (count Unicode code points)
  const len = [...name].length;
  if (len > 50) return false;

  // Accept Unicode letters (with combining marks). Allow single separators between letter groups:
  // - spaces
  // - any punctuation dash (hyphen/minus/em-dash variants)
  // - ASCII apostrophe (') and right single quotation mark (’)
  // Disallow separators at start/end, consecutive separators, digits, and other punctuation.
  const re = /^\p{L}\p{M}*(?:[ \p{Pd}'\u2019]\p{L}\p{M}*)*$/u;
  return re.test(name);
}
