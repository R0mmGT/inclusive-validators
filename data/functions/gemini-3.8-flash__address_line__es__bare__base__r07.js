function validate(address) {
  if (typeof address !== 'string') {
    return false;
  }

  const trimmed = address.trim();

  // Verifica que tenga una longitud adecuada (entre 3 y 120 caracteres),
  // que contenga al menos una letra (incluye caracteres internacionales)
  // y que solo contenga caracteres válidos para una dirección (letras, números, espacios y signos comunes: .,'/#ºª-).
  const addressRegex = /^(?=.*\p{L})[\p{L}\p{N}\s.,'/#ºª\-]{3,120}$/u;

  return addressRegex.test(trimmed);
}
