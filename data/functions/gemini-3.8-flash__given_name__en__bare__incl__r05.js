function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  // Matches names containing Unicode letters and combining marks from any script,
  // allowing internal single spaces, hyphens, and apostrophes (no consecutive separators,
  // and must start and end with a letter/mark). Length limited to 1–100 characters.
  const nameRegex = /^[\p{L}\p{M}](?:[\p{L}\p{M}]|[-'’\s](?=[\p{L}\p{M}])){0,99}$/u;

  return nameRegex.test(name);
}
