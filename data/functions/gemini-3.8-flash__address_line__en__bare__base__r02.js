function validate(address) {
  if (typeof address !== 'string') {
    return false;
  }

  const trimmed = address.trim();

  // Check reasonable length for a street address line
  if (trimmed.length < 3 || trimmed.length > 100) {
    return false;
  }

  // Ensure it only contains letters (including Unicode/accented characters),
  // digits, spaces, and common address punctuation marks
  if (!/^[\p{L}\p{N}\s.,'#\-\/]+$/u.test(trimmed)) {
    return false;
  }

  // Must contain at least one letter (street name, unit, box, etc.)
  const hasLetter = /\p{L}/u.test(trimmed);

  // Must contain a street/box number, or a recognized written-out number prefix
  const hasNumber = /\p{N}/u.test(trimmed) || /^(one|two|three|four|five|six|seven|eight|nine|ten)\b/iu.test(trimmed);

  return hasLetter && hasNumber;
}
