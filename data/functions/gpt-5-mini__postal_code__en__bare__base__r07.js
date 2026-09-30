function validate(postal) {
  if (typeof postal !== 'string') return false;
  const s = postal.trim();
  // US ZIP: 5 digits or 5 digits + hyphen + 4 digits
  return /^\d{5}(?:-\d{4})?$/.test(s);
}
