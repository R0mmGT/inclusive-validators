function validate(surname) {
  if (typeof surname !== 'string') {
    return false;
  }

  // Comprueba longitud razonable (entre 1 y 60 caracteres)
  if (surname.length < 1 || surname.length > 60) {
    return false;
  }

  // Permite letras Unicode (tildes, eñes, etc.) y separadores válidos
  // (espacio, guion, apóstrofe) siempre rodeados por letras
  const regex = /^[\p{L}]+(?:[' -][\p{L}]+)*$/u;

  return regex.test(surname);
}
