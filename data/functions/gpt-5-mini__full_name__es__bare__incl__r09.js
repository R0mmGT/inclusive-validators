function validate(name) {
  if (typeof name !== 'string') return false;
  const s = name.trim();
  if (s.length === 0 || s.length > 200) return false;

  // Allowed punctuation often used inside personal names:
  // - apostrophes (straight and U+2019), hyphens, dots, middle dot (U+00B7), en-/em-dash
  const punct = "'\\-\\u2019\\.\\u00B7\\u2013\\u2014";
  const P = "[" + punct + "]";   // punctuation class
  const Z = "\\p{Zs}";           // any Unicode space separator

  // Regex rules (Unicode-aware):
  // 1) must contain at least one letter from any script
  // 2) disallow two punctuation characters in a row (e.g. "..", "-'")
  // 3) disallow two space separators in a row
  // 4) cannot start or end with a punctuation character
  // 5) only letters, marks, numbers, space separators and the allowed punctuation are permitted
  const re = new RegExp(
    "^(?=.+\\p{L})(?!.*" + P + "{2,})(?!.*" + Z + "{2,})(?!^" + P + ")(?!.*" + P + "$)[\\p{L}\\p{M}\\p{N}" + Z + punct + "]+$",
    "u"
  );

  return re.test(s);
}
