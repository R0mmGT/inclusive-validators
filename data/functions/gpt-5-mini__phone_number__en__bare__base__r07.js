function validate(phone) {
  const re = /^(1[\s-]?)?(?:\(\d{3}\)[\s]?|\d{3}[\s-]?)\d{3}[\s-]?\d{4}$/;
  return re.test(phone);
}
