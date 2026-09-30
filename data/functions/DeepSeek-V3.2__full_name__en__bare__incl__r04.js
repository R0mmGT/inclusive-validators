const validate = (name) => {
  if (typeof name !== 'string') return false;
  
  const trimmed = name.trim();
  if (trimmed.length < 2) return false;
  
  // Allow a wide range of Unicode letters including accented characters,
  // letters from various scripts, hyphens, apostrophes, and spaces
  const validCharRegex = /^[\p{L}\p{M}\-.'\s]+$/u;
  if (!validCharRegex.test(trimmed)) return false;
  
  // Check for consecutive invalid sequences (e.g., multiple spaces/hyphens)
  const invalidSequenceRegex = /[\-.]{2,}|\s{2,}|[']{2,}/;
  if (invalidSequenceRegex.test(trimmed)) return false;
  
  // Must contain at least one space (for first and last name separation)
  // but allow for compound last names with hyphens or multiple spaces
  const parts = trimmed.split(/\s+/);
  if (parts.length < 2) return false;
  
  // Each part must have at least one letter character
  const letterRegex = /\p{L}/u;
  for (const part of parts) {
    if (!letterRegex.test(part.replace(/[-.'']/g, ''))) return false;
    if (part.length < 1) return false;
  }
  
  // Check for edge cases like standalone punctuation
  const standalonePunctuationRegex = /^[-.'\s]|[-.'\s]$/;
  if (standalonePunctuationRegex.test(trimmed)) return false;
  
  return true;
};
