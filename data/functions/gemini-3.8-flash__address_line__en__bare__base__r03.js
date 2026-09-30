function validate(address) {
  if (typeof address !== 'string') {
    return false;
  }

  const trimmed = address.trim();

  // Basic length constraints for a reasonable street address
  if (trimmed.length < 4 || trimmed.length > 100) {
    return false;
  }

  // Must only contain letters, numbers, spaces, and common address punctuation
  if (!/^[\p{L}\p{N}\s.,'#\/-]+$/u.test(trimmed)) {
    return false;
  }

  // Must contain at least one letter (for the street/unit name)
  if (!/\p{L}/u.test(trimmed)) {
    return false;
  }

  // Must contain at least one number (for the house/building/box/unit number)
  if (!/\p{N}/u.test(trimmed)) {
    return false;
  }

  return true;
}
