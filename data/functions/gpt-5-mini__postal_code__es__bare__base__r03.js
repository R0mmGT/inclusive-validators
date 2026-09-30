function validate(cp) {
  if (typeof cp !== 'string') return false;
  cp = cp.trim();
  // Códigos postales españoles: 5 dígitos, los dos primeros entre 01 y 52
  return /^(0[1-9]|[1-4]\d|5[0-2])\d{3}$/.test(cp);
}
