function validate(postal) {
  // Accepts US ZIP codes: "12345" or "12345-6789"
  if (typeof postal !== 'string') return false;
  return /^[0-9]{5}(?:-[0-9]{4})?$/.test(postal);
}
