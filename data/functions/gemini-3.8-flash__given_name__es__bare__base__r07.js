function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  // Verifica que tenga una longitud razonable (entre 2 y 50 caracteres)
  if (name.length < 2 || name.length > 50) {
    return false;
  }

  // Valida letras (con soporte Unicode para tildes, diéresis, ñ, etc.)
  // y permite guiones, apóstrofes o espacios simples no consecutivos entre letras
  const regex = /^[\p{L}]+(?:[' -][\p{L}]+)*$/u;

  return regex.test(name);
}
