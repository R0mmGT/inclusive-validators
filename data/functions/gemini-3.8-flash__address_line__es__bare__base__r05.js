function validate(address) {
  if (typeof address !== 'string') {
    return false;
  }

  const trimmed = address.trim();

  // Validar longitud básica razonable para una calle
  if (trimmed.length < 3 || trimmed.length > 100) {
    return false;
  }

  // Permitir letras (incluidos acentos), números, espacios y caracteres comunes de dirección
  const validCharsRegex = /^[\p{L}\p{N}\s.,/#'ºª-]+$/u;
  if (!validCharsRegex.test(trimmed)) {
    return false;
  }

  // Debe contener al menos una letra
  if (!/\p{L}/u.test(trimmed)) {
    return false;
  }

  // Debe tener al menos un número (ej. altura/portal) o estar formada por al menos dos palabras
  const hasNumber = /\p{N}/u.test(trimmed);
  const hasMultipleWords = trimmed.split(/\s+/).length >= 2;

  return hasNumber || hasMultipleWords;
}
