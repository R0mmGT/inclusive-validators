function validate(code) {
  return typeof code === 'string' && /^\d{5}$/.test(code);
}
