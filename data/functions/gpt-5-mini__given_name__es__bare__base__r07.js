function validate(name) {
  if (typeof name !== 'string') return false;
  const s = name.trim();
  if (s.length === 0) return false;

  // Permitir letras Unicode y marcas diacríticas, y separadores internos: espacio, guion o apóstrofo.
  // No se permiten separadores al inicio/fin ni repetidos seguidos.
  const re = /^[\p{L}\p{M}]+(?:[ '\-][\p{L}\p{M}]+)*$/u;
  return re.test(s);
}
