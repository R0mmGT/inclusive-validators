function validate(address) {
  if (typeof address !== 'string') {
    return false;
  }

  const trimmed = address.trim();

  // Longitud mínima y máxima aceptable para una dirección de calle
  if (trimmed.length < 4 || trimmed.length > 100) {
    return false;
  }

  // Debe contener al menos una letra (soporta acentos y caracteres unicode)
  if (!/\p{L}/u.test(trimmed)) {
    return false;
  }

  // Permite letras, números, espacios y signos habituales en direcciones (. , - / # º ª ' ())
  const allowedCharsRegex = /^[\p{L}\p{N}\s.,\-\/#ºª'()]+$/u;
  if (!allowedCharsRegex.test(trimmed)) {
    return false;
  }

  // Evita cadenas con repeticiones excesivas del mismo carácter (ej. "aaaaa", "......")
  if (/(.)\1{4,}/u.test(trimmed)) {
    return false;
  }

  return true;
}
