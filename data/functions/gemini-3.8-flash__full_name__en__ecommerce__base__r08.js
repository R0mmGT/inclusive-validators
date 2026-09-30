function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Basic length bounds for a person's full name
  if (trimmed.length < 2 || trimmed.length > 100) {
    return false;
  }

  // Support single-string full names for scripts that traditionally do not use spaces (e.g., CJK)
  const cjkPattern = /^[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]{2,20}$/u;
  if (cjkPattern.test(trimmed)) {
    return true;
  }

  // Standard full name validation:
  // - Requires at least two words separated by whitespace
  // - Supports international Unicode letters and combining marks
  // - Allows hyphens and apostrophes within name parts (e.g., O'Connor, Jean-Luc)
  // - Allows periods for initials or honorifics (e.g., John F. Kennedy, Jr.)
  const fullNamePattern = /^[\p{L}\p{M}]+(?:['’\-][\p{L}\p{M}]+)*\.?(?:\s+[\p{L}\p{M}]+(?:['’\-][\p{L}\p{M}]+)*\.?)+$/u;

  return fullNamePattern.test(trimmed);
}
