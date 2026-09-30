function validate(postalCode) {
  if (typeof postalCode !== 'string') {
    return false;
  }
  const regex = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
  return regex.test(postalCode.trim());
}
