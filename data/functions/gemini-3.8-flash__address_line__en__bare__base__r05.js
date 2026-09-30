function validate(address) {
  if (typeof address !== 'string') {
    return false;
  }

  const trimmed = address.trim();

  // Check acceptable length for a street address line
  if (trimmed.length < 4 || trimmed.length > 100) {
    return false;
  }

  // Allow only valid address characters: alphanumeric, spaces, and common punctuation
  if (!/^[a-zA-Z0-9\s.,#'\/-]+$/.test(trimmed)) {
    return false;
  }

  // Must contain whitespace separating parts (e.g., number and street name)
  if (!/\s/.test(trimmed)) {
    return false;
  }

  // Match P.O. Box formats (e.g., "P.O. Box 123", "PO Box 45B")
  const poBoxPattern = /^(?:p\.?\s*o\.?\s*box|post\s+office\s+box)\s+[a-z0-9#-]+/i;
  if (poBoxPattern.test(trimmed)) {
    return true;
  }

  // Standard street address must contain at least one digit (house/building number)
  // and at least two alphabetical characters (street name/type)
  const hasNumber = /\d/.test(trimmed);
  const hasStreetName = /[a-zA-Z]{2,}/.test(trimmed);

  return hasNumber && hasStreetName;
}
