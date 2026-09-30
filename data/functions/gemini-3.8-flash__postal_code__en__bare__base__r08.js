function validate(postalCode) {
  return /^\d{5}(-\d{4})?$/.test(postalCode);
}
