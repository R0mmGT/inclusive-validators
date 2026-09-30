function validate(phone) {
  if (typeof phone !== 'string') return false;
  phone = phone.trim();
  // Accepts US-style numbers:
  // Optional country code +1 or 1, optional separators (space, dot, dash),
  // optional parentheses around area code. Examples valid:
  // 555-555-5555, (555)555-5555, (555) 555-5555, 555 555 5555,
  // 555.555.5555, 5555555555, 1 555 555 5555, +1 (555) 555-5555
  var re = /^(?:\+?1\s*)?(?:\(\d{3}\)|\d{3})(?:[\s.-]?)\d{3}(?:[\s.-]?)\d{4}$/;
  return re.test(phone);
}
