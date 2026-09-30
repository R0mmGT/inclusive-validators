function validate(str) {
  if (typeof str !== 'string') return false;
  // Accepts US-style numbers: 555-555-5555, (555)555-5555, (555) 555-5555, 5555555555,
  // 1 555 555 5555, 1-555-555-5555, 1(555)555-5555, etc.
  var re = /^(?:1[\s-]?)?(?:\(\d{3}\)|\d{3})[\s-]?\d{3}[\s-]?\d{4}$/;
  return re.test(str);
}
