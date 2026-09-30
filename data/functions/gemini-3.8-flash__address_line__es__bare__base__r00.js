function validate(address) {
  if (typeof address !== 'string') {
    return false;
  }

  const trimmed = address.trim();

  // Verifica que tenga una longitud adecuada (entre 3 y 100 caracteres)
  if (trimmed.length < 3 || trimmed.length > 100) {
    return false;
  }

  // Debe contener al menos una letra y permitir números, espacios y caracteres comunes de dirección
  const addressRegex = /^(?=.*\p{L})[\p{L}\p{N}\s.,#'ºª\/\-()]+$/u;

  return addressRegex.test(trimmed);
}
