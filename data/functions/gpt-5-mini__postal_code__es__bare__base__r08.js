function validate(cp) {
  // Debe ser una cadena de 5 dígitos y los dos primeros (código de provincia) entre 01 y 52
  if (typeof cp !== 'string') return false;
  if (!/^\d{5}$/.test(cp)) return false;
  const provincia = parseInt(cp.slice(0, 2), 10);
  return provincia >= 1 && provincia <= 52;
}
