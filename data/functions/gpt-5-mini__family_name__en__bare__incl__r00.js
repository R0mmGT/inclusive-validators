function validate(name) {
  // Inclusive last-name validation for global use.
  // - Accepts any Unicode letters and combining marks.
  // - Allows single separators between letter-groups: spaces, dash punctuation, apostrophes (straight and typographic), middle dot.
  // - Disallows leading/trailing whitespace, consecutive separators, digits, symbols, and emoji.
  // - Keeps a reasonable maximum length.
  if (typeof name !== 'string') return false;

  // Normalize to a consistent Unicode form if available
  if (typeof name.normalize === 'function') {
    name = name.normalize('NFC');
  }

  // Reject empty or excessively long names
  if (name.length === 0 || name.length > 100) return false;

  // Reject names with leading/trailing whitespace (including common Unicode spaces)
  if (name.trim() !== name) return false;

  // Build a Unicode-aware regex:
  // - \p{L} = any letter
  // - \p{M} = combining mark (accent marks, etc.)
  // - \p{Zs} = space separators (regular space, NBSP, etc.)
  // - \p{Pd} = dash punctuation (hyphen, en-dash, em-dash, etc.)
  // We allow apostrophe U+0027 and right single quotation mark U+2019, and middle dot U+00B7 as separators.
  const SEP = "[\\p{Zs}\\p{Pd}\\u0027\\u2019\\u00B7]";
  const SEG = "\\p{L}[\\p{L}\\p{M}]*";
  const pattern = `^${SEG}(?:${SEP}${SEG})*$`;

  try {
    const re = new RegExp(pattern, "u");
    return re.test(name);
  } catch (e) {
    // If the runtime doesn't support Unicode property escapes, fall back to a conservative ASCII-ish check.
    // (Most modern JS engines support the "u" flag with \p{})
    const fallback = /^[A-Za-z]+(?:[ '\-·][A-Za-z]+)*$/;
    return fallback.test(name);
  }
}
