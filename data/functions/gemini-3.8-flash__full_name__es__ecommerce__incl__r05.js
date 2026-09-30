function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Longitud razonable para nombres de cualquier cultura (desde nombres cortos hasta largos)
  if (trimmed.length < 1 || trimmed.length > 150) {
    return false;
  }

  // Debe contener al menos una letra de cualquier alfabeto/sistema de escritura
  if (!/\p{L}/u.test(trimmed)) {
    return false;
  }

  // Caracteres permitidos:
  // - \p{L}: cualquier letra en cualquier idioma/script (latino, cirílico, árabe, kanji, hangul, devanagari, etc.)
  // - \p{M}: marcas diacríticas o combinatorias (acentos, tildes, signos vocálicos)
  // - \s: espacios
  // - Puntuación legítima en nombres: apóstrofos (' ’ ʻ), guiones (- – —), puntos (.), comas (,) y punto medio (·)
  // - \u200C y \u200D: Zero-Width Non-Joiner y Joiner (indispensables en escrituras como persa, árabe o devanagari)
  const validCharsPattern = /^[\p{L}\p{M}\s,.\·'’ʻ\-\u2010-\u2015\u200C\u200D]+$/u;
  if (!validCharsPattern.test(trimmed)) {
    return false;
  }

  // No permitir signos de puntuación repetidos consecutivamente (ej. "..", "--", ",,")
  if (/[,.\·'’ʻ\-\u2010-\u2015]{2,}/u.test(trimmed)) {
    return false;
  }

  // No debe comenzar con punto, coma o guion (se permite comenzar con apóstrofo por el ʻOkina hawaiano)
  if (/^[.,\-\u2010-\u2015]/u.test(trimmed)) {
    return false;
  }

  // No debe terminar con coma o guion (el punto sí está permitido para abreviaturas como "Jr.")
  if (/[,–\-\u2010-\u2015]$/u.test(trimmed)) {
    return false;
  }

  return true;
}
