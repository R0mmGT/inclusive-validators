function validate(str) {
  if (typeof str !== 'string') return false;
  // Valid US ZIP: 5 digits or 5 digits + hyphen + 4 digits
  return /^[0-9]{5}(?:-[0-9]{4})?$/.test(str.trim());
}
