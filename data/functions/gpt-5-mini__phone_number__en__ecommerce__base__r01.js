function validate(input) {
  const re = /^(1\s?)?((\(\d{3}\)\s?)|(\d{3}[\s-]?))\d{3}[\s-]?\d{4}$/;
  return re.test(input);
}
