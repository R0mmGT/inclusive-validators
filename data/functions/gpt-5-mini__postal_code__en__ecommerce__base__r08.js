function validate(postal) {
  if (typeof postal !== 'string') return false;
  const s = postal.trim();
  // Accepts 5-digit ZIP or ZIP+4 (e.g. "12345" or "12345-6789")
  return /^(?:\d{5})(?:-\d{4})?$/.test(s);
}
