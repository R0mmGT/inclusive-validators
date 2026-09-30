function validate(address) {
  if (typeof address !== 'string') {
    return false;
  }

  const trimmed = address.trim();

  // Comprobar una longitud razonable para una línea de dirección
  if (trimmed.length < 3 || trimmed.length > 100) {
    return false;
  }

  // Debe contener al menos una letra (nombre de calle/vía)
  if (!/\p{L}/u.test(trimmed)) {
    return false;
  }

  // Permitir letras (incluyendo tildes y caracteres internacionales), números, espacios
  // y signos de puntuación comunes en direcciones (#, ., ,, ', -, /, º, ª)
  const allowedCharactersRegex = /^[\p{L}\p{N}\s#.,\/'\-ºª]+$/u;
  if (!allowedCharactersRegex.test(trimmed)) {
    return false;
  }

  // Evitar secuencias excesivas de caracteres especiales consecutivos (ej. "---", ",,,")
  if (/([#.,\/'\-ºª])\1{2,}/.test(trimmed)) {
    return false;
  }

  return true;
}
