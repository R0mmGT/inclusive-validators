function validate(address) {
  // Verificar que sea una cadena de texto
  if (typeof address !== 'string') {
    return false;
  }

  const trimmed = address.trim();

  // Longitud razonable para líneas de dirección internacionalmente (ej. "1", "C/ 2", descripciones largas)
  if (trimmed.length < 2 || trimmed.length > 250) {
    return false;
  }

  // Rechazar caracteres de control no imprimibles (ASCII e invisibles)
  if (/[\u0000-\u001F\u007F-\u009F]/.test(trimmed)) {
    return false;
  }

  // Debe contener al menos un carácter alfanumérico en cualquier alfabeto o sistema de escritura (\p{L} o \p{N})
  if (!/[\p{L}\p{N}]/u.test(trimmed)) {
    return false;
  }

  // Permitir letras (\p{L}), números (\p{N}), marcas diacríticas/acentos (\p{M}),
  // puntuación (\p{P}), espacios (\p{Zs}) y símbolos matemáticos como '+' para Plus Codes (\p{Sm})
  const validCharacters = /^[\p{L}\p{N}\p{M}\p{P}\p{Zs}\p{Sm}]+$/u;

  return validCharacters.test(trimmed);
}
