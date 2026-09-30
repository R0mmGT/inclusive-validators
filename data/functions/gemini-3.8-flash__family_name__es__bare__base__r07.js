function validate(surname) {
  if (typeof surname !== 'string' || surname.length === 0 || surname.length > 100) {
    return false;
  }

  // Permite caracteres alfabéticos internacionales (Unicode),
  // y separadores válidos (espacio, guion, apóstrofe) únicamente entre letras.
  const regex = /^\p{L}+(?:[' -]\p{L}+)*$/u;

  return regex.test(surname);
}
