function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Comprueba una longitud razonable para nombres de personas (mínimo 1 carácter, ej. nombres en Birmania o iniciales, máximo 150)
  if (trimmed.length < 1 || trimmed.length > 150) {
    return false;
  }

  // Debe contener al menos una letra de cualquier sistema de escritura
  if (!/\p{L}/u.test(trimmed)) {
    return false;
  }

  // Caracteres permitidos:
  // \p{L}: Cualquier letra Unicode (latín, cirílico, árabe, kanji, hangul, devanagari, etc.)
  // \p{M}: Marcas de combinación diacrítica (indispensables en escrituras como árabe, hindi, tailandés, etc.)
  // \s: Espacios y separadores
  // ' ’ ʼ ʻ: Variantes de apóstrofes (ej. O'Connor, D'Angelo, transliteraciones)
  // \- ‐: Guiones para nombres compuestos
  // . ·: Puntos e interpunto (ej. iniciales, St. John, punt volat catalán, separador japonés)
  const validCharsRegex = /^[\p{L}\p{M}\s'’ʼʻ.\-‐·]+$/u;

  return validCharsRegex.test(trimmed);
}
