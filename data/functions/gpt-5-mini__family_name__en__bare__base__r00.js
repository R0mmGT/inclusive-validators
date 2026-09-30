function validate(name) {
  if (typeof name !== 'string') return false;
  // Normalize whitespace (collapse any whitespace to single ASCII space) and trim edges
  name = name.replace(/\s+/g, ' ').trim();
  if (name.length === 0 || name.length > 100) return false;

  // Token: one or more Unicode letters (and combining marks), optionally followed by
  // sequences of an apostrophe-like character or a dash and more letters.
  // Accept common apostrophe variants: ' (U+0027), ’ (U+2019), ʼ (U+02BC)
  // Accept any dash/punctuation in the Unicode Pd category (hyphen/minus variants).
  // Full name: one or more tokens separated by single spaces.
  const re = /^[\p{L}\p{M}]+(?:(?:['\u2019\u02BC]|\p{Pd})[\p{L}\p{M}]+)*(?: [\p{L}\p{M}]+(?:(?:['\u2019\u02BC]|\p{Pd})[\p{L}\p{M}]+)*)*$/u;

  return re.test(name);
}
