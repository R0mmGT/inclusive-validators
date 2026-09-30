function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Enforce reasonable length limits for a given name
  if (trimmed.length < 1 || trimmed.length > 50) {
    return false;
  }

  // Allows international letters (\p{L}) and permits single hyphens, 
  // apostrophes, or spaces between letters (e.g., "Mary-Ann", "Jean-Luc", "Renée", "O'Neill")
  const nameRegex = /^\p{L}+(?:['’\- ]\p{L}+)*$/u;

  return nameRegex.test(trimmed);
}
