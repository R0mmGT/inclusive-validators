function validate(surname) {
  if (typeof surname !== 'string') {
    return false;
  }

  const trimmed = surname.trim();

  // Debe tener una longitud razonable (al menos 1 carácter y un límite sensato)
  if (trimmed.length === 0 || trimmed.length > 100) {
    return false;
  }

  // Debe contener al menos una letra Unicode (soporta alfabetos latino, cirílico, árabe, kanji, etc.)
  if (!/\p{L}/u.test(trimmed)) {
    return false;
  }

  // Permite letras, marcas diacríticas/acentos combinables (\p{M}), espacios,
  // guiones (- y guiones Unicode), apóstrofes (' y ’) y puntos (para abreviaturas como "St. John")
  const validSurnamePattern = /^[\p{L}\p{M}\s'\u2019\-\u2010-\u2015.]+$/u;

  return validSurnamePattern.test(trimmed);
}
