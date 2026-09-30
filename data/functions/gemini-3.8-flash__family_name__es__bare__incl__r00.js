function validate(surname) {
  if (typeof surname !== 'string') {
    return false;
  }

  const trimmed = surname.trim();

  // Comprueba longitud mínima y máxima razonable
  if (trimmed.length === 0 || trimmed.length > 100) {
    return false;
  }

  // \p{L}: cualquier letra en cualquier sistema de escritura (Unicode)
  // \p{M}: marcas diacríticas y de combinación de acentos
  // Permite separadores comunes (espacio, guion, apóstrofe ASCII y tipográfico) solo entre letras
  const surnameRegex = /^[\p{L}\p{M}]+(?:[\s\-'\u2019][\p{L}\p{M}]+)*$/u;

  return surnameRegex.test(trimmed);
}
