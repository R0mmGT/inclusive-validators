function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Longitud razonable para nombres reales en cualquier cultura
  if (trimmed.length < 2 || trimmed.length > 120) {
    return false;
  }

  // Permite letras de cualquier sistema de escritura (alfabetos latino, cirílico, árabe,
  // kanji, hanzi, hangul, devanagari, etc.) y marcas diacríticas combinatorias (\p{M}),
  // así como separadores válidos (espacios, guiones, apóstrofes y puntos para iniciales).
  // Debe comenzar con una letra y terminar con una letra o un punto.
  const validCharsRegex = /^[\p{L}\p{M}][\p{L}\p{M}'’.\- ]*[\p{L}\p{M}.]$/u;
  if (!validCharsRegex.test(trimmed)) {
    return false;
  }

  // Evita secuencias no válidas como signos de puntuación o espacios consecutivos
  if (/[-'’]{2,}|\.{2,}|\s{2,}/u.test(trimmed)) {
    return false;
  }

  return true;
}
