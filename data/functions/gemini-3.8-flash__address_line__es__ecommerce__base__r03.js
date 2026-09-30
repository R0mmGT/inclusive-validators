function validate(address) {
  if (typeof address !== 'string') {
    return false;
  }

  const trimmed = address.trim();

  // Comprobar una longitud mínima y máxima razonable
  if (trimmed.length < 5 || trimmed.length > 120) {
    return false;
  }

  // Permitir letras (incluye acentos y caracteres Unicode), números, espacios y puntuación común de direcciones
  const validCharsRegex = /^[\p{L}\d\s.,/#ºª°\-()]+$/u;
  if (!validCharsRegex.test(trimmed)) {
    return false;
  }

  // Debe contener al menos 2 letras (nombre de la vía/calle)
  const letters = trimmed.match(/\p{L}/gu);
  if (!letters || letters.length < 2) {
    return false;
  }

  // Para envíos de una tienda, debe incluir número de portal/edificio o la indicación "s/n" (sin número)
  const hasNumberOrSN = /\d|\b(?:s\/?n|sin\s+n[uú]mero)\b/i;
  if (!hasNumberOrSN.test(trimmed)) {
    return false;
  }

  return true;
}
