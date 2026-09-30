function validate(name) {
  if (typeof name !== 'string') return false;
  name = name.trim();
  if (name.length === 0) return false;

  // Must contain at least two parts (first name + last name)
  const parts = name.split(/\s+/);
  if (parts.length < 2) return false;

  // Use Unicode letter class to allow international characters
  const letter = '\\p{L}';
  // Single-letter initial, optionally followed by a dot: "J" or "J."
  const initialRe = new RegExp(`^${letter}\\.?$`, 'u');
  // Multi-letter abbreviation ending with a dot: "St.", "Dr."
  const abbrRe = new RegExp(`^${letter}{2,}\\.$`, 'u');
  // Regular name part: letters possibly joined by single hyphens or apostrophes (no leading/trailing hyphen/apostrophe)
  const wordRe = new RegExp(`^${letter}+(?:['\\-]${letter}+)*$`, 'u');

  for (const p of parts) {
    if (!(initialRe.test(p) || abbrRe.test(p) || wordRe.test(p))) return false;
  }

  return true;
}
