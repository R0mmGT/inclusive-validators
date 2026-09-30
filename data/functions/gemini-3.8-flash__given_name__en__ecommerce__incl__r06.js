function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Ensure length is reasonable for a person's first name
  if (trimmed.length < 1 || trimmed.length > 100) {
    return false;
  }

  // \p{L}: any Unicode letter across all world scripts
  // \p{M}: any Unicode combining mark (accents, diacritics, vowel signs)
  // Allows valid name delimiters (hyphens, spaces, apostrophes) between letter groups
  // Supports names starting with an apostrophe (e.g., Hawaiian ʻOkina) and single-letter initials with an optional period
  const nameRegex = /^['’]?[\p{L}\p{M}]+(?:['’\- .][\p{L}\p{M}]+)*\.?$/u;

  return nameRegex.test(trimmed);
}
