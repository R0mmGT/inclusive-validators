function validate(str) {
  const s = String(str).trim();
  const re = /^(1\s?)?(\d{3}|\(\d{3}\))([-\s]?)\d{3}([-\s]?)\d{4}$/;
  return re.test(s);
}
