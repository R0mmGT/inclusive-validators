function validate(postalCode) {
  if (typeof postalCode !== 'string') {
    return false;
  }

  const trimmed = postalCode.trim();

  // Must start and end with an alphanumeric character,
  // allow only alphanumeric characters, single spaces, or hyphens,
  // and prevent consecutive separators.
  if (!/^[a-zA-Z0-9](?!.*[ -]{2})[a-zA-Z0-9 -]{0,12}[a-zA-Z0-9]$/.test(trimmed)) {
    return false;
  }

  // Strip spaces and hyphens to inspect the core alphanumeric characters
  const alphanumeric = trimmed.replace(/[ -]/g, '');

  // Globally, postal codes consist of 2 to 11 alphanumeric characters
  // and contain at least one digit.
  return alphanumeric.length >= 2 && alphanumeric.length <= 11 && /\d/.test(alphanumeric);
}
