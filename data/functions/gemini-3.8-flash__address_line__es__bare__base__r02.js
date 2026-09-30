function validate(address) {
  if (typeof address !== 'string') {
    return false;
  }

  const trimmed = address.trim();

  // Longitud razonable para una línea de dirección de calle
  if (trimmed.length < 3 || trimmed.length > 120) {
    return false;
  }

  // Debe contener al menos dos letras (nombre de la calle o tipo de vía)
  if (!/\p{L}.*\p{L}/u.test(trimmed)) {
    return false;
  }

  // Permitir letras (con tildes/caracteres internacionales), números, espacios y signos comunes en direcciones
  const validPattern = /^[\p{L}\p{N}\s.,/#ºª'\-]+$/u;

  return validPattern.test(trimmed);
}
