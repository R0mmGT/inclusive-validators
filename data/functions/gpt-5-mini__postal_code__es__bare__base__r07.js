function validate(cp) {
  if (typeof cp !== 'string') return false;
  cp = cp.trim();
  // Debe ser exactamente 5 dígitos y los dos primeros entre 01 y 52 (códigos postales de España)
  return /^\d{5}$/.test(cp) && /^(0[1-9]|[1-4]\d|5[0-2])\d{3}$/.test(cp);
}
