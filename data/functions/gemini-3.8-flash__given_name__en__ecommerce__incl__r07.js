function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Basic length constraints for a realistic first name
  if (trimmed.length < 1 || trimmed.length > 100) {
    return false;
  }

  // Normalize Unicode to Canonical Composition (NFC)
  const normalized = trimmed.normalize('NFC');

  // Allows:
  // - Unicode letters (\p{L}) and combining marks (\p{M}) for non-Latin scripts
  // - Single spaces, hyphens, and standard/typographic apostrophes between letters
  // - An optional period at the end for single initials (e.g., "J.")
  const nameRegex = /^[\p{L}\p{M}]+(?:['’ʼ\- ][\p{L}\p{M}]+)*\.?$/u;

  return nameRegex.test(normalized);
}
