function validate(postalCode) {
  if (typeof postalCode !== 'string') {
    return false;
  }

  const trimmed = postalCode.trim();

  // Valid international postal codes are typically 2 to 12 alphanumeric characters,
  // occasionally separated by single spaces or hyphens (e.g., US, UK, Canada, Japan, etc.).
  // Must start and end with an alphanumeric character, with no consecutive separators.
  const formatRegex = /^[a-zA-Z0-9](?!.*[ -]{2})[a-zA-Z0-9 -]{0,14}[a-zA-Z0-9]$/;

  if (!formatRegex.test(trimmed)) {
    return false;
  }

  // Count purely alphanumeric characters to ensure it falls within international standards (2-12 characters)
  const alphanumericCount = trimmed.replace(/[^a-zA-Z0-9]/g, '').length;

  return alphanumericCount >= 2 && alphanumericCount <= 12;
}
