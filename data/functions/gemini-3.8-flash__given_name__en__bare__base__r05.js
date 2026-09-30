function validate(name) {
  if (typeof name !== 'string' || name.length < 1 || name.length > 50) {
    return false;
  }

  // Matches Unicode letters and combining marks, permitting internal single spaces, hyphens, and apostrophes
  const nameRegex = /^[\p{L}\p{M}]+(?:['’\- ][\p{L}\p{M}]+)*$/u;

  return nameRegex.test(name);
}
