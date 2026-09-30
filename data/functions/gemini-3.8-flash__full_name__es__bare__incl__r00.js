function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Longitud razonable: contempla desde monónimos cortos (ej. "U") hasta nombres largos
  if (trimmed.length < 1 || trimmed.length > 200) {
    return false;
  }

  // Debe contener al menos una letra de cualquier alfabeto/sistema de escritura
  if (!/\p{L}/u.test(trimmed)) {
    return false;
  }

  // Permite:
  // - \p{L}: cualquier letra en cualquier idioma (alfabeto latino, cirílico, kanji, árabe, etc.)
  // - \p{M}: marcas de combinación y diacríticos (indispensables en devanagari, tailandés, etc.)
  // - \s: espacios
  // - Signos de puntuación válidos en nombres (apóstrofes, 'okina, guiones, puntos y puntos medios)
  const validNameRegex = /^[\p{L}\p{M}\s'’ʼʻ\-\.\·]+$/u;

  return validNameRegex.test(trimmed);
}
