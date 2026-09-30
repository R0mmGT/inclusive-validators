function validate(surname) {
  if (typeof surname !== 'string') {
    return false;
  }

  const trimmed = surname.trim();

  // Debe tener una longitud razonable (entre 1 y 100 caracteres)
  if (trimmed.length === 0 || trimmed.length > 100) {
    return false;
  }

  // Permite letras unicode (incluyendo tildes, ñ, etc.)
  // y separadores válidos (espacio, guion, apóstrofe) no consecutivos entre palabras.
  const regex = /^[\p{L}]+(?:[\s'-][\p{L}]+)*$/u;

  return regex.test(trimmed);
}
