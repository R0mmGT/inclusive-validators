function validate(name) {
  // Accept only strings
  if (typeof name !== 'string') return false;

  // Trim surrounding whitespace (but reject empty after trimming)
  name = name.trim();
  if (name.length === 0 || name.length > 50) return false; // length limit to avoid pathological inputs

  // Allow Unicode letters and combining marks, optionally separated by single hyphen, apostrophe (straight or right single quote) or space.
  // - Must start and end with a letter
  // - No consecutive separators
  // - Examples accepted: "Jean-Luc", "O'Neil", "Mary Ann", "Åsa", "D'Angelo", "Pepe"
  const re = /^[\p{L}\p{M}]+(?:(?:['\u2019-]|\s)[\p{L}\p{M}]+)*$/u;

  return re.test(name);
}
