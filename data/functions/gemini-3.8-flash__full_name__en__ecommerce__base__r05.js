function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  if (trimmed.length < 2 || trimmed.length > 100) {
    return false;
  }

  // Matches names with at least two words, supporting international letters,
  // hyphens, apostrophes, and period initials (e.g., "John Doe", "Jane O'Connor", "Jean-Luc Picard", "A. Smith").
  const multiWordPattern = /^[\p{L}]+(?:['’.-]\p{L}+)*\.?(?:\s+[\p{L}]+(?:['’.-]\p{L}+)*\.?)+$/u;

  // Matches native CJK full names which traditionally do not contain spaces (e.g., "田中太郎", "王小明").
  const cjkPattern = /^[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]{2,10}$/u;

  return multiWordPattern.test(trimmed) || cjkPattern.test(trimmed);
}
