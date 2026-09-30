function validate(code) {
  return typeof code === 'string' && /^\d{5}(-\d{4})?$/.test(code);
}
