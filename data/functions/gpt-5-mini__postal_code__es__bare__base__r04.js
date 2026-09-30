function validate(cp) {
  if (typeof cp !== 'string') return false;
  const s = cp.trim();
  // Código postal español: cinco dígitos, los dos primeros entre 01 y 52
  return /^(0[1-9]|[1-4][0-9]|5[0-2])\d{3}$/.test(s);
}
