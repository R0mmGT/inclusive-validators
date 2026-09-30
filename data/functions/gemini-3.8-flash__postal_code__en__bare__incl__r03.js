function validate(postalCode) {
  if (typeof postalCode !== 'string') {
    return false;
  }

  const trimmed = postalCode.trim();

  // Postal codes worldwide require at least one digit
  if (!/\d/.test(trimmed)) {
    return false;
  }

  // Count total alphanumeric characters (UPU standards range between 3 and 10, or up to 12 with ISO country code prefix)
  const alphanumericOnly = trimmed.replace(/[^a-zA-Z0-9]/g, '');
  if (alphanumericOnly.length < 3 || alphanumericOnly.length > 11) {
    return false;
  }

  // Matches standard international formats:
  // - Optional 1-3 letter ISO country prefix separated by a hyphen or space (e.g., 'GB-', 'LV-')
  // - Alphanumeric postal code body, either as a single block or two blocks separated by a single space or hyphen
  const postalCodeRegex = /^(?:[a-zA-Z]{1,3}[-\s])?[a-zA-Z0-9]{1,8}(?:[-\s][a-zA-Z0-9]{1,8})?$/;

  return postalCodeRegex.test(trimmed);
}
