function validate(address) {
  if (typeof address !== 'string') {
    return false;
  }

  const trimmed = address.trim();

  // Longitud mínima y máxima razonable para una línea de dirección
  if (trimmed.length < 2 || trimmed.length > 150) {
    return false;
  }

  // No permitir saltos de línea ni caracteres de control
  if (/[\r\n\u0000-\u001F\u007F-\u009F]/.test(trimmed)) {
    return false;
  }

  // Debe contener al menos una letra o número de cualquier sistema de escritura
  if (!/[\p{L}\p{N}]/u.test(trimmed)) {
    return false;
  }

  // Permitir letras (\p{L}), números (\p{N}), marcas diacríticas (\p{M}),
  // signos de puntuación (\p{P}) y espacios (\p{Zs}) de cualquier idioma
  const validPattern = /^[\p{L}\p{N}\p{M}\p{P}\p{Zs}]+$/u;

  return validPattern.test(trimmed);
}
