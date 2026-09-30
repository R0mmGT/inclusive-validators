function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  // Comprueba que la longitud sea adecuada (entre 2 y 50 caracteres)
  if (name.length < 2 || name.length > 50) {
    return false;
  }

  // Permite letras (incluyendo tildes y caracteres internacionales de cualquier idioma),
  // y separadores válidos (espacio, guion o apóstrofe) entre palabras sin repeticiones consecutivas.
  const regex = /^[\p{L}]+(?:[' -][\p{L}]+)*$/u;

  return regex.test(name);
}
