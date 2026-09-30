function validate(name) {
  if (typeof name !== 'string') return false;
  const s = name.trim();
  if (s.length === 0) return false;
  // allow 1..60 characters (trimmed), letters (any script), combining marks,
  // spaces, apostrophe, hyphen and period. Must start and end with a letter.
  // Disallow digits, consecutive punctuation among (' - .), consecutive whitespace,
  // and whitespace immediately before punctuation.
  const re = /^(?=.{1,60}$)(?!.*\d)(?!.*[\'\-\.]{2})(?!.*\s{2})(?!.*\s[\'\-\.])\p{L}[\p{L}\p{M}\s\'\-\.]*\p{L}$/u;
  return re.test(s);
}
