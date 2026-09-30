function validate(surname) {
  if (typeof surname !== 'string') {
    return false;
  }

  const trimmed = surname.trim();

  // Longitud razonable para apellidos de cualquier cultura (mínimo 1 carácter, máx 100)
  if (trimmed.length < 1 || trimmed.length > 100) {
    return false;
  }

  // Debe contener al menos una letra Unicode (evita cadenas solo de símbolos o puntuación)
  if (!/\p{L}/u.test(trimmed)) {
    return false;
  }

  // Permite:
  // \p{L}: cualquier letra Unicode (latina, cirílica, árabe, kanji, hanzi, hangul, etc.)
  // \p{M}: marcas diacríticas/acentos combinables
  // Espacios: para apellidos compuestos (ej. "de la Cruz", "Van der Bilt")
  // Guiones: ASCII y Unicode (ej. "Smith-Jones")
  // Apóstrofes: recto (') y tipográfico (’) (ej. "O'Connor", "D’Angelo")
  // Puntos: abreviaturas tradicionales (ej. "St. John")
  const validSurnameRegex = /^[\p{L}\p{M}\s'\u2019\u2010\u2013\u2014\-.]+$/u;

  return validSurnameRegex.test(trimmed);
}
