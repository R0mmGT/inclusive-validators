function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Longitud razonable para nombres a nivel global (1 a 100 caracteres)
  if (trimmed.length < 1 || trimmed.length > 100) {
    return false;
  }

  // Debe contener al menos una letra Unicode (soporta alfabetos latinos, cirílicos, árabes, CJK, etc.)
  if (!/\p{L}/u.test(trimmed)) {
    return false;
  }

  // Permite letras (\p{L}), marcas de combinación/diacríticos (\p{M}), espacios, guiones, apóstrofes y puntos
  const validCharsPattern = /^[\p{L}\p{M}\s'’.\-]+$/u;
  if (!validCharsPattern.test(trimmed)) {
    return false;
  }

  // Evita caracteres de puntuación repetidos consecutivamente o espacios dobles
  if (/['’.\-]{2,}|\s{2,}/.test(trimmed)) {
    return false;
  }

  // No debe comenzar con guion o punto, ni terminar en guion
  if (/^[\-.]|[\-]$/.test(trimmed)) {
    return false;
  }

  return true;
}
