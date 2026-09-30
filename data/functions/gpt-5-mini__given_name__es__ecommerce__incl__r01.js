function validate(name) {
  // Debe ser una cadena
  if (typeof name !== 'string') return false;

  // Recortar espacio inicial/final y normalizar Unicode
  const s = name.trim().normalize('NFC');

  // Longitud razonable: al menos 1 carácter y no excesivamente largo
  if (s.length === 0 || s.length > 100) return false;

  // Permitir letras de cualquier escritura (\p{L}) y marcas diacríticas (\p{M}).
  // Separadores permitidos entre componentes del nombre: espacio, guion (incluye en-dash/em-dash),
  // apóstrofos comunes y caracteres usados en algunas lenguas (ʼ, ʻ), y el middle dot.
  // Las partes del nombre deben empezar por una letra y los separadores no pueden aparecer
  // al inicio, final ni repetidos (es decir, siempre van seguidos de una letra).
  const NAME_REGEX = /^\p{L}\p{M}*(?:[ \-'\u2019\u02BC\u02BB\u2013\u2014·]\p{L}\p{M}*)*$/u;

  return NAME_REGEX.test(s);
}
