function validate(str) {
  if (typeof str !== 'string') {
    return false;
  }

  // Permite nombres con letras (incluyendo acentos, la ñ y caracteres Unicode),
  // apóstrofes y guiones internos, requiriendo al menos dos palabras separadas por un espacio.
  const fullNameRegex = /^\p{L}+(?:['’\-]\p{L}+)*(?: \p{L}+(?:['’\-]\p{L}+)*)+$/u;

  return fullNameRegex.test(str.trim());
}
