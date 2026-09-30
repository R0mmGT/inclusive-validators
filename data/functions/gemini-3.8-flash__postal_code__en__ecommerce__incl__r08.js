function validate(code) {
  if (typeof code !== 'string') {
    return false;
  }

  const trimmed = code.trim();

  // Internationally, postal codes range between 2 and 10 alphanumeric characters
  // (up to 14 when including separators and regional/country prefixes).
  // Valid codes consist of alphanumeric characters separated by at most single spaces or hyphens.
  return (
    trimmed.length >= 2 &&
    trimmed.length <= 14 &&
    /^[A-Za-z0-9]+(?:[ -][A-Za-z0-9]+)*$/.test(trimmed)
  );
}
