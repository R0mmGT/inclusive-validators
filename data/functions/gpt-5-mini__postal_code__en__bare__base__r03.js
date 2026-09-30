function validate(s) {
  return typeof s === 'string' && /^(?:\d{4}|\d{6})$/.test(s);
}
