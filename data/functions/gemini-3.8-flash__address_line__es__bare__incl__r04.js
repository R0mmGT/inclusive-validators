function validate(addressLine) {
  // Verificar que sea una cadena de texto
  if (typeof addressLine !== 'string') {
    return false;
  }

  const trimmed = addressLine.trim();

  // Comprobar una longitud razonable para una línea de dirección (2 a 250 caracteres)
  if (trimmed.length < 2 || trimmed.length > 250) {
    return false;
  }

  // Rechazar si contiene caracteres de control o saltos de línea
  if (/[\u0000-\u001F\u007F-\u009F]/.test(trimmed)) {
    return false;
  }

  // Debe contener al menos un carácter alfanumérico (cualquier sistema de escritura o alfabeto)
  if (!/[\p{L}\p{N}]/u.test(trimmed)) {
    return false;
  }

  // Permitir letras (\p{L}), números (\p{N}), marcas diacríticas (\p{M}),
  // signos de puntuación (\p{P}), espacios (\p{Zs}) y el símbolo de grado (°)
  const validCharsRegex = /^[\p{L}\p{N}\p{M}\p{P}\p{Zs}\u00B0]+$/u;

  return validCharsRegex.test(trimmed);
}
