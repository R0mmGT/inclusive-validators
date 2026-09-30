function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Longitud razonable: soporta desde nombres monónimos cortos (ej. asiáticos) hasta nombres largos
  if (trimmed.length < 1 || trimmed.length > 150) {
    return false;
  }

  // Debe contener al menos una letra Unicode (soporta alfabetos latino, cirílico, árabe, kanji, etc.)
  if (!/\p{L}/u.test(trimmed)) {
    return false;
  }

  // Caracteres válidos: letras (\p{L}), marcas diacríticas/acentos combinables (\p{M}),
  // espacios, guiones, apóstrofes y puntos (abreviaturas/iniciales)
  const validCharsRegex = /^[\p{L}\p{M}\s'\u2019\u02BB.\-\u2010-\u2014]+$/u;
  if (!validCharsRegex.test(trimmed)) {
    return false;
  }

  // No debe comenzar con punto o guion
  if (/^[.\-\u2010-\u2014]/u.test(trimmed)) {
    return false;
  }

  // No debe terminar con guion
  if (/[\-\u2010-\u2014]$/u.test(trimmed)) {
    return false;
  }

  // No debe contener signos de puntuación consecutivos (ej. "..", "--", ".'")
  if (/['\u2019\u02BB.\-\u2010-\u2014]{2,}/u.test(trimmed)) {
    return false;
  }

  return true;
}
