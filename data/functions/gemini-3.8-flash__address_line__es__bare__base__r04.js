function validate(address) {
  if (typeof address !== 'string') {
    return false;
  }

  const trimmed = address.trim();

  // Longitud razonable para una línea de dirección postal
  if (trimmed.length < 4 || trimmed.length > 120) {
    return false;
  }

  // Permitir letras (incluye acentos y caracteres Unicode), números, espacios
  // y signos de puntuación estándar en direcciones (., -, /, #, º, ª, ', etc.)
  const allowedChars = /^[\p{L}\d\s,.\-/#ºª'’]+$/u;
  if (!allowedChars.test(trimmed)) {
    return false;
  }

  // Debe incluir al menos una secuencia de letras (nombre de calle/vía)
  const hasStreetName = /\p{L}{2,}/u.test(trimmed);
  if (!hasStreetName) {
    return false;
  }

  // Debe contener un número (altura/portal) o una indicación válida como "s/n" (sin número)
  const hasNumberOrSN = /\d|\b(?:s\/?n|sin\s*n[uú]mero)\b/i.test(trimmed);
  if (!hasNumberOrSN) {
    return false;
  }

  return true;
}
