function validate(phone) {
  phone = String(phone).trim();
  // Acepta formatos de EE. UU. con o sin código de país 1:
  // 555-555-5555, (555)555-5555, (555) 555-5555, 555 555 5555, 5555555555,
  // 1 555 555 5555, 1(555)555-5555, etc.
  const re = /^(?:1\s?)?(?:\(\d{3}\)|\d{3})(?:[\s-]?)\d{3}(?:[\s-]?)\d{4}$/;
  return re.test(phone);
}
