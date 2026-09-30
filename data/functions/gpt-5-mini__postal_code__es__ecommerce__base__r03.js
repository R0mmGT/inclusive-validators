function validate(cp) {
  if (typeof cp !== 'string') return false;
  cp = cp.trim();
  // Códigos postales españoles: 5 dígitos, los dos primeros van de 01 a 52.
  return /^(0[1-9]|[1-4][0-9]|5[0-2])\d{3}$/.test(cp);
}
