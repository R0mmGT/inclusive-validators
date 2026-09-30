function validate(address) {
  if (typeof address !== 'string') {
    return false;
  }

  const trimmed = address.trim();

  // Basic length constraints for a street address line
  if (trimmed.length < 3 || trimmed.length > 100) {
    return false;
  }

  // Allow only letters, numbers, spaces, and standard address punctuation
  if (!/^[a-zA-Z0-9\s.,'#\/-]+$/.test(trimmed)) {
    return false;
  }

  // Check for P.O. Box formats (e.g., "PO Box 123", "P.O. Box 456-B")
  const poBoxRegex = /^(?:p\.?\s*o\.?\s*box|post\s+office\s+box)\s+[a-zA-Z0-9-]+$/i;
  if (poBoxRegex.test(trimmed)) {
    return true;
  }

  // Must contain at least one digit (building/house/unit number)
  const hasNumber = /\d/.test(trimmed);

  // Must contain at least two consecutive letters (street/road name)
  const hasStreetName = /[a-zA-Z]{2,}/.test(trimmed);

  return hasNumber && hasStreetName;
}
