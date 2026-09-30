function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  // Ensure reasonable length and no leading or trailing whitespace
  if (name.length < 1 || name.length > 100 || name.trim() !== name) {
    return false;
  }

  // Supports Unicode letters (\p{L}) and combining marks (\p{M}) across all writing systems.
  // Allows single hyphens, apostrophes (including typographic), or spaces between letters.
  const namePattern = /^\p{L}[\p{L}\p{M}]*(?:['’\- ]\p{L}[\p{L}\p{M}]*)*$/u;

  return namePattern.test(name);
}
