function validate(surname) {
  // Debe ser una cadena de texto
  if (typeof surname !== 'string') {
    return false;
  }

  const trimmed = surname.trim();

  // Longitud mínima de 1 carácter y límite razonable para evitar ataques DoS/overflow
  if (trimmed.length === 0 || trimmed.length > 100) {
    return false;
  }

  // Debe contener al menos una letra de cualquier alfabeto/sistema de escritura
  if (!/\p{L}/u.test(trimmed)) {
    return false;
  }

  // Permite:
  // - \p{L}: Letras de cualquier idioma (latino, cirílico, árabe, hanzi, kanji, hangul, etc.)
  // - \p{M}: Marcas diacríticas y combinadas (acentos, tildes, signos vocálicos)
  // - Espacios (\s)
  // - Guiones comunes y variantes tipográficas (- \u2010-\u2015)
  // - Apóstrofes comunes y variantes tipográficas (' ’ ʼ)
  // - Puntos para abreviaturas compuestas como "St. John"
  const validSurnameRegex = /^[\p{L}\p{M}\s'’ʼ\u002D\u2010-\u2015.]+$/u;

  return validSurnameRegex.test(trimmed);
}
