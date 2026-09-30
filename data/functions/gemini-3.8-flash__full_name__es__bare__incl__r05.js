function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Longitud razonable para nombres (soporta desde monónimos de 1 caracter hasta nombres compuestos largos)
  if (trimmed.length === 0 || trimmed.length > 150) {
    return false;
  }

  // Debe contener al menos una letra de cualquier sistema de escritura (alfabetos latino, cirílico, árabe, kanji, etc.)
  if (!/\p{L}/u.test(trimmed)) {
    return false;
  }

  // Caracteres permitidos:
  // - \p{L}: Letras de cualquier idioma
  // - \p{M}: Marcas diacríticas / acentos combinables
  // - \s: Espacios
  // - '’ʼ: Apóstrofes y letras modificadoras (ej. O'Connor, ʻOkina hawaiano)
  // - -: Guiones
  // - .: Puntos (iniciales o abreviaturas como Jr.)
  // - ·・: Puntos medios (catalán, transcripciones en chino/japonés)
  const allowedChars = /^[\p{L}\p{M}\s'’ʼ\-.·・]+$/u;
  if (!allowedChars.test(trimmed)) {
    return false;
  }

  // No debe empezar con guion o punto, ni terminar con guion
  if (/^[-.]|-$/.test(trimmed)) {
    return false;
  }

  // No debe contener signos de puntuación consecutivos repetidos (ej. "..", "--")
  if (/[-.·・'’ʼ]{2,}/.test(trimmed)) {
    return false;
  }

  return true;
}
