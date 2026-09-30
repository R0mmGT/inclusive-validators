function validate(address) {
  if (typeof address !== 'string') {
    return false;
  }

  const trimmed = address.trim();

  // Longitud estándar aceptable para una línea de dirección
  if (trimmed.length < 4 || trimmed.length > 120) {
    return false;
  }

  // Permitir letras (incluidos acentos y caracteres Unicode), números,
  // espacios y signos de puntuación comunes en direcciones (. , / - # º ª ' ())
  const allowedCharsRegex = /^[\p{L}\d\s.,/\-#ºª'()]+$/u;
  if (!allowedCharsRegex.test(trimmed)) {
    return false;
  }

  // Debe contener al menos dos letras consecutivas o separadas para garantizar un nombre de vía
  const hasLettersRegex = /[\p{L}].*[\p{L}]/u;
  if (!hasLettersRegex.test(trimmed)) {
    return false;
  }

  return true;
}
