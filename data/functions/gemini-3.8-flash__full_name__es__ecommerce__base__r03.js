function validate(input) {
  if (typeof input !== 'string') {
    return false;
  }

  const trimmed = input.trim();

  // Verifica una longitud razonable para un nombre completo
  if (trimmed.length < 3 || trimmed.length > 100) {
    return false;
  }

  // Permite letras unicode (incluyendo tildes y diéresis), apóstrofes y guiones.
  // Exige al menos dos palabras compuestas por letras válidas.
  const nameRegex = /^\p{L}+(?:['\-]\p{L}+)*(?:\s+\p{L}+(?:['\-]\p{L}+)*)+$/u;

  return nameRegex.test(trimmed);
}
