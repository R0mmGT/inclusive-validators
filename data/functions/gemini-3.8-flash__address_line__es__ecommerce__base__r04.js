function validate(address) {
  if (typeof address !== 'string') {
    return false;
  }

  const trimmed = address.trim();

  // Longitud razonable para una línea de dirección
  if (trimmed.length < 4 || trimmed.length > 100) {
    return false;
  }

  // Caracteres permitidos: letras (con tildes, ñ, etc.), números, espacios y signos habituales en direcciones (, . - / # º ª ° ' ())
  const allowedCharsRegex = /^[\p{L}\p{N}\s.,\-\/#ºª°'()]+$/u;
  if (!allowedCharsRegex.test(trimmed)) {
    return false;
  }

  // Debe contener al menos una letra (nombre de vía/calle)
  if (!/\p{L}/u.test(trimmed)) {
    return false;
  }

  // Asegura contenido significativo: al menos una palabra de 2+ letras o combinación de letra y número
  const meaningfulContentRegex = /(\p{L}{2,}|\p{L}.*\p{N}|\p{N}.*\p{L})/u;
  if (!meaningfulContentRegex.test(trimmed)) {
    return false;
  }

  return true;
}
