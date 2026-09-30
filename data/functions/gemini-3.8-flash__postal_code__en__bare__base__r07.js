function validate(postalCode) {
  if (typeof postalCode !== 'string') {
    return false;
  }
  return /^\d{5}(-\d{4})?$/.test(postalCode.trim());
}
