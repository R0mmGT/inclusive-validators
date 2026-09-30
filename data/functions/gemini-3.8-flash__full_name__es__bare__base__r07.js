function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Verifica una longitud razonable para un nombre completo
  if (trimmed.length < 3 || trimmed.length > 100) {
    return false;
  }

  // Permite letras (incluyendo tildes y caracteres Unicode), apóstrofes y guiones.
  // Requiere al menos dos palabras separadas por espacios.
  const fullNameRegex = /^\p{L}+(?:['\-]\p{L}+)*(?:\s+\p{L}+(?:['\-]\p{L}+)*)+$/u;

  return fullNameRegex.test(trimmed);
}
