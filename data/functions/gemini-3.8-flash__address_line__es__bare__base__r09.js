function validate(address) {
  if (typeof address !== 'string') {
    return false;
  }

  const trimmed = address.trim();

  // Longitud razonable para una línea de dirección
  if (trimmed.length < 3 || trimmed.length > 120) {
    return false;
  }

  // Debe contener al menos una letra (nombre de calle, vía o caja postal)
  if (!/\p{L}/u.test(trimmed)) {
    return false;
  }

  // Permitir letras (con acentos/caracteres internacionales), números, espacios
  // y caracteres habituales de dirección como ., -, #, /, º, ª, apostrofes y comas
  const addressRegex = /^[\p{L}\p{N}\s.,\-\/#ºª'’]+$/u;

  return addressRegex.test(trimmed);
}
