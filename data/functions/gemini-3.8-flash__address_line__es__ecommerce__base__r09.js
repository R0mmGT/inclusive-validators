function validate(address) {
  if (typeof address !== 'string') {
    return false;
  }

  const trimmed = address.trim();

  // Longitud razonable para una línea de dirección (entre 4 y 100 caracteres)
  if (trimmed.length < 4 || trimmed.length > 100) {
    return false;
  }

  // Permitir letras (incluye acentos/diacríticos), números y signos comunes en direcciones (. , - / # º ª ')
  const validCharsRegex = /^[\p{L}\p{N}\s.,\-/ºª'#]+$/u;
  if (!validCharsRegex.test(trimmed)) {
    return false;
  }

  // Debe contener al menos una letra
  if (!/\p{L}/u.test(trimmed)) {
    return false;
  }

  // Debe contener al menos 3 caracteres alfanuméricos en total para evitar entradas casi vacías o solo puntuación
  const alphanumericCount = (trimmed.match(/[\p{L}\p{N}]/gu) || []).length;
  if (alphanumericCount < 3) {
    return false;
  }

  return true;
}
