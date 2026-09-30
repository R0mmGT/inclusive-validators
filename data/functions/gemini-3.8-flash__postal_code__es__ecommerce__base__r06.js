function validate(postalCode) {
  return typeof postalCode === 'string' && /^(?:0[1-9]|[1-4]\d|5[0-2])\d{3}$/.test(postalCode.trim());
}
