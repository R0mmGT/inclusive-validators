function validate(name) {
  if (typeof name !== 'string') return false;
  const s = name.trim();
  if (s.length === 0) return false;

  // Count Unicode code points to handle characters outside BMP correctly
  const cpLen = [...s].length;
  if (cpLen < 2 || cpLen > 60) return false;

  // Allowed: any Unicode letter, optionally separated by a single space, hyphen,
  // middle dot or common apostrophe characters. No leading/trailing separators,
  // no consecutive separators, no digits or other punctuation.
  const re = /^\p{L}+(?:[ \-·'’ʼ\u02BC\u02BB]\p{L}+)*$/u;
  return re.test(s);
}
