function validate(name) {
  // Debe ser string
  if (typeof name !== 'string') return false;
  // No vacío y sin espacios al inicio/fin
  if (name.length === 0 || name !== name.trim()) return false;
  // Token: una o más letras (soportando marcas diacríticas),
  // posiblemente seguidas por grupos internos con apóstrofo o guion y más letras.
  // El nombre puede tener varias tokens separadas por un único espacio (nombres compuestos).
  const token = "\\p{L}\\p{M}*(?:['-]\\p{L}\\p{M}*)*";
  const re = new RegExp(`^${token}(?: ${token})*$`, 'u');
  return re.test(name);
}
