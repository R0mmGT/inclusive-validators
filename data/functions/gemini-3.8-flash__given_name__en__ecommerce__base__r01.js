function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  // Allows 1–50 characters of Unicode letters, with single hyphens, 
  // apostrophes, or spaces between letters.
  const nameRegex = /^(?=.{1,50}$)\p{L}+(?:['’\s-]\p{L}+)*$/u;

  return nameRegex.test(name.trim());
}
