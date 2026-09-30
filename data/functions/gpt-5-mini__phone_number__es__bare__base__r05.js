function validate(input) {
  if (typeof input !== 'string') return false;
  const re = /^(1\s?)?(\(\d{3}\)|\d{3})([\s-])?\d{3}([\s-])?\d{4}$/;
  return re.test(input);
}
