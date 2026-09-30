function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Enforce reasonable length constraints for a last name
  if (trimmed.length === 0 || trimmed.length > 100) {
    return false;
  }

  // Supports international Unicode letters and permits single hyphens,
  // apostrophes, or spaces between letters (e.g., O'Connor, Smith-Jones, van der Bilt).
  const lastNameRegex = /^\p{L}+(?:['’ -]\p{L}+)*$/u;

  return lastNameRegex.test(trimmed);
}
