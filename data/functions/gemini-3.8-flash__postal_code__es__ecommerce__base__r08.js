function validate(postalCode) {
  return typeof postalCode === 'string' && /^\d{5}$/.test(postalCode);
}
