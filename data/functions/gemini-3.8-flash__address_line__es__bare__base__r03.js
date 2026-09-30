function validate(address) {
  if (typeof address !== 'string') {
    return false;
  }

  const trimmed = address.trim();

  // Longitud razonable para una línea de dirección
  if (trimmed.length < 3 || trimmed.length > 120) {
    return false;
  }

  // Debe contener al menos una letra (nombre de calle/vía)
  if (!/\p{L}/u.test(trimmed)) {
    return false;
  }

  // Permite letras, números, espacios y caracteres comunes en direcciones (., - / # º ª ° ')
  const validAddressRegex = /^[\p{L}\p{N}\s.,/#ºª°'\-]+$/u;

  return validAddressRegex.test(trimmed);
}
