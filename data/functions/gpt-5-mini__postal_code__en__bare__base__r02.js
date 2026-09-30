function validate(postal) {
  if (typeof postal !== 'string') return false;
  return /^\d{5}(?:-\d{4})?$/.test(postal);
}
