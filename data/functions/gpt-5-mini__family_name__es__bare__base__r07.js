function validate(name) {
  if (typeof name !== 'string') return false;
  const s = name.trim();
  if (s.length === 0) return false;

  // Allowed characters: any Unicode letter or mark (to cover accents), plus apostrophe, hyphen and space
  const allowed = /^[\p{L}\p{M}'\-\x20]+$/u;
  if (!allowed.test(s)) return false;

  // Must start with a letter
  if (!/^\p{L}/u.test(s)) return false;
  // Must end with a letter or a combining mark (to allow decomposed accented letters)
  if (!/[\p{L}\p{M}]$/u.test(s)) return false;

  // Disallow consecutive separators (spaces, hyphens, apostrophes)
  if (/[ '\-]{2,}/.test(s)) return false;

  return true;
}
