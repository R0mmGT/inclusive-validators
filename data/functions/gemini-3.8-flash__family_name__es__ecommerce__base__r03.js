function validate(lastName) {
  if (typeof lastName !== 'string') {
    return false;
  }

  const trimmed = lastName.trim();

  // Verifica que tenga una longitud razonable (1 a 100 caracteres)
  if (trimmed.length < 1 || trimmed.length > 100) {
    return false;
  }

  // Permite letras Unicode (incluyendo tildes, diéresis, ñ, etc.), espacios, apóstrofes y guiones.
  // Debe empezar y terminar con una letra (o ser una única letra).
  const regex = /^[\p{L}](?:[\p{L}\p{M}'’\s-]*[\p{L}])?$/u;

  return regex.test(trimmed);
}
