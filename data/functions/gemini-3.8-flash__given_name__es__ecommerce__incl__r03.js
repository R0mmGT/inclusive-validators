function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Validar longitud razonable (nombres cortos como 'Li' o 'U' hasta nombres largos)
  if (trimmed.length < 1 || trimmed.length > 100) {
    return false;
  }

  // Debe contener al menos una letra Unicode (soporta cualquier alfabeto o sistema de escritura)
  if (!/\p{L}/u.test(trimmed)) {
    return false;
  }

  // Permitir letras (\p{L}), marcas diacríticas/acentos (\p{M}), apóstrofes, guiones, puntos y espacios
  const allowedCharsRegex = /^[\p{L}\p{M}'’ʻ.\-\s]+$/u;
  if (!allowedCharsRegex.test(trimmed)) {
    return false;
  }

  // No debe comenzar con un guion o punto, ni terminar con un guion
  if (/^[.\-]|-$/u.test(trimmed)) {
    return false;
  }

  // Evitar caracteres especiales o espacios repetidos consecutivamente (ej. '--', '..', '  ')
  if (/(?:[\-]{2,}|\.{2,}|['’ʻ]{2,}|\s{2,})/u.test(trimmed)) {
    return false;
  }

  return true;
}
