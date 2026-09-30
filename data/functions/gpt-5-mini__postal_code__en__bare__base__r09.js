function validate(str) {
  if (typeof str !== 'string') return false;
  return /^\d{5}(?:-\d{4})?$/.test(str);
}
