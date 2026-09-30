function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Full name should be within a reasonable length
  if (trimmed.length < 2 || trimmed.length > 100) {
    return false;
  }

  // Multi-word name supporting Unicode letters, hyphens, apostrophes, and initials (e.g., "John Doe", "Mary-Jane O'Connor", "J. R. Tolkien")
  const multiWordPattern = /^[\p{L}]+(?:['’\-][\p{L}]+)*\.?(?:\s+[\p{L}]+(?:['’\-][\p{L}]+)*\.?)+$/u;

  // CJK scripts where full names are commonly written without spaces (at least 2 characters)
  const cjkPattern = /^[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]{2,10}$/u;

  return multiWordPattern.test(trimmed) || cjkPattern.test(trimmed);
}
