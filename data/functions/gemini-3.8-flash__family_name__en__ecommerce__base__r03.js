function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  // Check reasonable length constraints (1 to 100 characters)
  // and disallow leading/trailing whitespace
  if (name.length < 1 || name.length > 100 || name.trim() !== name) {
    return false;
  }

  // Regex breakdown:
  // - ^[\p{L}\p{M}]+ : Must start with one or more Unicode letters/combining marks
  // - (?:['’ -][\p{L}\p{M}]+)*$ : Can be followed by a single separator (apostrophe, 
  //   curly apostrophe, space, or hyphen) followed by more letters/marks
  // - Flag 'u' : Enables full Unicode character property support
  const nameRegex = /^[\p{L}\p{M}]+(?:['’ -][\p{L}\p{M}]+)*$/u;

  return nameRegex.test(name);
}
