function validate(name) {
  // Debe ser una cadena
  if (typeof name !== 'string') return false;

  // Quitar espacios en los extremos
  const s = name.trim();

  // Longitud razonable: al menos 1 carácter y como máximo 50 (ajustable)
  if (s.length === 0 || s.length > 50) return false;

  // Permitir letras de cualquier alfabeto (\p{L}) y marcas diacríticas (\p{M}),
  // y separadores comunes en nombres: espacio, apóstrofo (') y comilla derecha (’), guion (-).
  // Cada "parte" del nombre debe empezar y terminar en una letra (no en separador),
  // y no se permiten separadores consecutivos.
  const re = /^[\p{L}\p{M}]+(?:[ '\-\u2019][\p{L}\p{M}]+)*$/u;

  return re.test(s);
}
