function validate(surname) {
  if (typeof surname !== 'string') {
    return false;
  }

  // Verificar longitud razonable y ausencia de espacios al inicio o final
  if (surname.length === 0 || surname.length > 100 || surname !== surname.trim()) {
    return false;
  }

  // Debe contener al menos una letra de cualquier sistema de escritura (\p{L})
  if (!/\p{L}/u.test(surname)) {
    return false;
  }

  // Caracteres permitidos:
  // - Letras (\p{L}) y marcas diacríticas/vocálicas combinadas (\p{M})
  // - Espacios, guiones, puntos y variantes de apóstrofes (incluyendo 'okina hawaiano)
  const allowedChars = /^[\p{L}\p{M} \-\u2010\u2013'\u2019\u02BB\u02BC\.]+$/u;
  if (!allowedChars.test(surname)) {
    return false;
  }

  // No debe terminar con un guion
  if (/[\-\u2010\u2013]$/u.test(surname)) {
    return false;
  }

  // No permitir separadores repetidos de forma consecutiva (ej. "--", "  ", "..", "''")
  if (/\s{2,}|[\-\u2010\u2013]{2,}|\.{2,}|['\u2019\u02BB\u02BC]{2,}/u.test(surname)) {
    return false;
  }

  return true;
}
