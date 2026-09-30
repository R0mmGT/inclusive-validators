function validate(postal) {
  if (typeof postal !== 'string') return false;
  const code = postal.trim();
  // España: 5 dígitos, los dos primeros entre 01 y 52 (01-52)
  return /^(?:0[1-9]|[1-4]\d|5[0-2])\d{3}$/.test(code);
}
