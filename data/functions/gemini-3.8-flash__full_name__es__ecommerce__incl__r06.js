function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  // Normalizar caracteres Unicode (NFC) y eliminar espacios en los extremos
  const trimmed = name.normalize('NFC').trim();

  // Validar una longitud razonable (mínimo 2 caracteres, máximo 120)
  if (trimmed.length < 2 || trimmed.length > 120) {
    return false;
  }

  // Permite:
  // - Letras (\p{L}) y marcas de combinación diacrítica (\p{M}) de cualquier sistema de escritura
  //   (latino con tildes, cirílico, árabe, kanji/hanzi, devanagari, tailandés, etc.)
  // - Monónimos (ej. nombres de una sola palabra comunes en Islandia o Indonesia) y nombres múltiples
  // - Separadores válidos entre palabras/letras: espacios, guiones (-), apóstrofes rectos o tipográficos (' y ’)
  // - Puntos para iniciales o sufijos (ej. "J. R. Smith", "St. John", "Jr.")
  const nameRegex = /^[\p{L}\p{M}]+(?:(?:[ '’\-]|(?:\. ?))[\p{L}\p{M}]+)*\.?$/u;

  return nameRegex.test(trimmed);
}
