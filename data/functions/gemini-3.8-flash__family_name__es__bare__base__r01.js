function validate(surname) {
  if (typeof surname !== 'string') {
    return false;
  }

  const trimmed = surname.trim();

  if (trimmed.length < 1 || trimmed.length > 100) {
    return false;
  }

  // Permite letras (incluyendo acentos y caracteres Unicode),
  // y separadores válidos (espacio, guion, apóstrofe) entre palabras.
  const regex = /^\p{L}+(?:['\s-]\p{L}+)*$/u;

  return regex.test(trimmed);
}
