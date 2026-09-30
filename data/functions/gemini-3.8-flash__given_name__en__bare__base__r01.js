function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  // Allows 1-50 characters consisting of Unicode letters, with optional
  // internal hyphens, apostrophes, or spaces separating letter segments.
  const nameRegex = /^(?=.{1,50}$)\p{L}+(?:['’\- ]\p{L}+)*$/u;

  return nameRegex.test(name);
}
