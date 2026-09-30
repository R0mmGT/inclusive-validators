function validate(address) {
  if (typeof address !== 'string') {
    return false;
  }

  const trimmed = address.trim();

  // Longitud estándar razonable para una línea de dirección
  if (trimmed.length < 3 || trimmed.length > 100) {
    return false;
  }

  // Debe contener al menos una letra (nombre de calle o vía)
  if (!/\p{L}/u.test(trimmed)) {
    return false;
  }

  // Permitir letras (cualquier idioma/alfabeto), números, espacios y signos habituales en direcciones (.,-/#'ºª°)
  const addressPattern = /^[\p{L}\p{N}\s.,/#'ºª°\-]+$/u;
  if (!addressPattern.test(trimmed)) {
    return false;
  }

  // Evitar secuencias no válidas de signos de puntuación repetidos
  if (/([.,/#'ºª°\-])\1{2,}/.test(trimmed)) {
    return false;
  }

  return true;
}
