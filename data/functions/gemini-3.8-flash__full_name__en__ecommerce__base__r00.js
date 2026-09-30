function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Full name length should be within a reasonable range
  if (trimmed.length < 2 || trimmed.length > 100) {
    return false;
  }

  // Allow monograms / unspaced names for East Asian scripts (e.g., Chinese, Japanese, Korean)
  const isCJK = /^[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]{2,}$/u.test(trimmed);
  if (isCJK) {
    return true;
  }

  const parts = trimmed.split(/\s+/);

  // A full name typically requires at least two parts (e.g., first and last name)
  if (parts.length < 2) {
    return false;
  }

  // Each part must consist of Unicode letters, with optional internal hyphens/apostrophes or trailing initials
  const namePartRegex = /^[\p{L}\p{M}]+(?:['’.-][\p{L}\p{M}]+)*\.?$/u;

  return parts.every(part => namePartRegex.test(part));
}
