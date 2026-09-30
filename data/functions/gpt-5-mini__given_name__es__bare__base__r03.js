function validate(name) {
  // Debe ser string
  if (typeof name !== 'string') return false;

  // No permitir espacios al inicio/final
  if (name.trim() !== name) return false;

  // Longitud razonable (1..100)
  if (name.length === 0 || name.length > 100) return false;

  // Expresión regular que permite:
  // - letras Unicode (\p{L}) y marcas diacríticas (\p{M}) dentro de cada "parte"
  // - separadores internos: espacio, guion medio (-) o apóstrofo (')
  // - no permitir separadores consecutivos, ni al inicio ni al final
  // - cada parte debe empezar por una letra
  const re = /^\p{L}[\p{L}\p{M}]*([ '-]\p{L}[\p{L}\p{M}]*)*$/u;

  return re.test(name);
}
