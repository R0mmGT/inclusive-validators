function validate(postal) {
  // Must be a string
  if (typeof postal !== 'string') return false;

  // Trim surrounding whitespace
  const value = postal.trim();

  // Quick rejects
  if (value.length === 0) return false;

  // This regex aims to be permissive enough for global postal codes while rejecting
  // obviously invalid inputs:
  // - Uses Unicode properties to allow letters from any script (\p{L}) and digits (\p{N})
  // - Allows internal single spaces or single hyphens as separators but not at ends
  // - Disallows consecutive separators
  // - Requires at least one digit (postal codes worldwide almost always include digits)
  // - Enforces a reasonable overall length (3 to 12 characters, including separators)
  //
  // Note: Perfect validation for every country would require a country-specific database.
  const pattern = /^(?=.{3,12}$)(?=.*\p{N})[\p{L}\p{N}]+(?:[ -][\p{L}\p{N}]+)*$/u;

  return pattern.test(value);
}
