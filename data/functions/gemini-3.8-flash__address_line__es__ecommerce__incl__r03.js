function validate(address) {
  // Debe ser una cadena de texto
  if (typeof address !== 'string') {
    return false;
  }

  // Eliminar espacios al inicio y al final
  const trimmed = address.trim();

  // Longitud razonable para líneas de dirección a nivel internacional
  // (desde formatos muy cortos como "C/ 1" o ideogramas CJK hasta direcciones descriptivas)
  if (trimmed.length < 2 || trimmed.length > 250) {
    return false;
  }

  // Rechazar caracteres de control y saltos de línea
  if (/[\u0000-\u001F\u007F-\u009F]/.test(trimmed)) {
    return false;
  }

  // Debe contener al menos un carácter alfanumérico (cualquier sistema de escritura o dígitos)
  if (!/[\p{L}\p{N}]/u.test(trimmed)) {
    return false;
  }

  // Permitir letras (\p{L}), números (\p{N}), marcas diacríticas (\p{M}),
  // signos de puntuación de cualquier idioma (\p{P}), espacios (\s)
  // y símbolos comunes en direcciones como el grado (°), número (№), etc.
  const addressRegex = /^[\p{L}\p{N}\p{M}\p{P}\s°№+~]+$/u;

  return addressRegex.test(trimmed);
}
