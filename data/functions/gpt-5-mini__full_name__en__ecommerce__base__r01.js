function validate(name) {
  if (typeof name !== 'string') return false;
  name = name.trim();
  if (name.length < 2 || name.length > 100) return false;

  // Require at least two name parts (first + last)
  const parts = name.split(/\s+/);
  if (parts.length < 2) return false;

  // Unicode letter and combining mark classes (to allow accented letters)
  const letterRe = '\\p{L}\\p{M}';
  // Allow straight and curly apostrophes, hyphen and dot inside name parts
  const extra = "'\u2019\\-\\.";
  const innerClass = `${letterRe}${extra}`;

  const rxSingleLetter = new RegExp(`^[${letterRe}]$`, 'u');          // "A"
  const rxInitialDot   = new RegExp(`^[${letterRe}]\\.$`, 'u');      // "A."
  const rxWordEndLetter= new RegExp(`^[${letterRe}][${innerClass}]*[${letterRe}]$`, 'u'); // "Anne", "O'Connor"
  const rxWordEndDot   = new RegExp(`^[${letterRe}][${innerClass}]*[${letterRe}]\\.$`, 'u'); // "Jr."

  for (const part of parts) {
    if (part.length === 0 || part.length > 50) return false;
    if (
      rxSingleLetter.test(part) ||
      rxInitialDot.test(part) ||
      rxWordEndLetter.test(part) ||
      rxWordEndDot.test(part)
    ) {
      continue;
    }
    return false;
  }

  return true;
}
