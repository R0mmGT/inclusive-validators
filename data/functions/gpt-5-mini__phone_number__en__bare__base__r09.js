function validate(str) {
  // Accepts U.S. phone numbers: 10 digits or 11 with leading '1'.
  // Allows formats like:
  // 555-555-5555, (555)555-5555, (555) 555-5555, 555 555 5555,
  // 5555555555, 1 555 555 5555, 1 (555) 555-5555, 1-555-555-5555, 1.555.555.5555, etc.
  const re = /^(?:1\s?)?(?:\(\d{3}\)|\d{3})(?:[\s.-]?\d{3})(?:[\s.-]?\d{4})$/;
  return re.test(str);
}
