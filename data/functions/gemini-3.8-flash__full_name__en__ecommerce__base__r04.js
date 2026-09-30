function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Basic length constraints for a realistic full name
  if (trimmed.length < 2 || trimmed.length > 100) {
    return false;
  }

  // Matches multi-word full names (e.g., "John Doe", "Mary-Jane O'Connor", "J. R. R. Tolkien")
  // Allows Unicode letters, hyphens, apostrophes, and dots for initials.
  const multiWordName = /^[\p{L}]+(?:['’\-][\p{L}]+)*\.?(?:\s+[\p{L}]+(?:['’\-][\p{L}]+)*\.?)+$/u;

  // Matches East Asian scripts (Chinese, Japanese, Korean) which typically do not contain spaces
  const cjkName = /^[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]{2,}$/u;

  return multiWordName.test(trimmed) || cjkName.test(trimmed);
}
