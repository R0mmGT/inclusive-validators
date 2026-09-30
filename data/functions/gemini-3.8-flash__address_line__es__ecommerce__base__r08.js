function validate(address) {
  if (typeof address !== 'string') {
    return false;
  }

  const trimmed = address.trim();

  // Longitud razonable para una línea de dirección
  if (trimmed.length < 5 || trimmed.length > 100) {
    return false;
  }

  // Permitir letras (incluidos acentos y caracteres Unicode), números, espacios
  // y signos de puntuación comunes en direcciones (. , / # - º ª ° ')
  const validCharsRegex = /^[\p{L}\p{N}\s.,/#ºª°'\-]+$/u;
  if (!validCharsRegex.test(trimmed)) {
    return false;
  }

  // Debe contener al menos dos letras (para el nombre de la vía)
  const letters = trimmed.match(/\p{L}/gu);
  if (!letters || letters.length < 2) {
    return false;
  }

  // Debe contener al menos dos términos separados por espacio (ej. tipo/nombre de vía y número/identificador)
  const parts = trimmed.split(/\s+/);
  if (parts.length < 2) {
    return false;
  }

  return true;
}
