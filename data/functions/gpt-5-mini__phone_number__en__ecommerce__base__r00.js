function validate(str) {
  // Accepts U.S. style phone numbers with optional leading "1"
  // Examples allowed: "555-555-5555", "(555)555-5555", "1 555 555 5555", "15555555555", "5555555555"
  const re = /^(?:1\s?)?(?:\(\d{3}\)|\d{3})(?:[\s-]?\d{3})(?:[\s-]?\d{4})$/;
  return re.test(str);
}
