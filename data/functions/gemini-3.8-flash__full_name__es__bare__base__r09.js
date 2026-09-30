function validate(str) {
  if (typeof str !== 'string') {
    return false;
  }

  // Permite nombres con letras (incluyendo tildes/caracteres Unicode), 
  // apóstrofes o guiones internos, y exige al menos dos palabras separadas por espacios.
  const regex = /^\p{L}+(?:['’-]\p{L}+)*(?:\s+\p{L}+(?:['’-]\p{L}+)*)+$/u;

  return regex.test(str.trim());
}
