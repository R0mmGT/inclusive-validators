function validate(str) {
  // Validates US phone numbers with optional country code 1.
  // Accepts formats like:
  // 555-555-5555, (555)555-5555, (555) 555-5555, 555 555 5555, 5555555555, 1 555 555 5555, 1 (555) 555-5555, etc.
  const re = /^(1\s?)?(\(\d{3}\)|\d{3})([\s-])?\d{3}([\s-])?\d{4}$/;
  return re.test(str);
}
