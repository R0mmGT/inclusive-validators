function validate(address) {
  if (typeof address !== 'string') {
    return false;
  }

  const trimmed = address.trim();

  // Longitud razonable para una línea de dirección
  if (trimmed.length < 5 || trimmed.length > 100) {
    return false;
  }

  // Permite letras (incluyendo tildes/Unicode), números, espacios y puntuación común en direcciones
  const validPattern = /^[\p{L}\p{N}\s.,\-\/#ºª°'’]+$/u;
  if (!validPattern.test(trimmed)) {
    return false;
  }

  // Debe contener al menos dos letras (nombre de la calle o vía)
  if (!/\p{L}{2,}/u.test(trimmed)) {
    return false;
  }

  return true;
}
