function validate(name) {
  if (typeof name !== 'string') return false;

  const s = name.trim();
  if (s.length === 0 || s.length > 50) return false; // reasonable length limits

  // Allowed characters: Unicode letters, combining marks (diacritics),
  // ASCII apostrophe ('), typographic apostrophe (’), hyphen, and spaces.
  const allAllowed = /^[\p{L}\p{M}'’\-\s]+$/u;
  if (!allAllowed.test(s)) return false;

  // Must start and end with a letter
  if (!/^\p{L}/u.test(s) || !/\p{L}$/u.test(s)) return false;

  // Disallow consecutive separators (spaces, hyphens, apostrophes)
  if (/(?:['’\-\s]){2,}/u.test(s)) return false;

  return true;
}
