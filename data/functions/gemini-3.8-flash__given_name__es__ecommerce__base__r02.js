function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Longitud razonable para un nombre de pila (entre 2 y 50 caracteres)
  if (trimmed.length < 2 || trimmed.length > 50) {
    return false;
  }

  // Permite letras (incluyendo tildes, ñ, caracteres internacionales),
  // y separadores válidos internos (espacio, guion o apóstrofe) entre letras.
  const regex = /^\p{L}+(?:[' -]\p{L}+)*$/u;

  return regex.test(trimmed);
}
