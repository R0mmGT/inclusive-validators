function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Longitud razonable para un nombre completo
  if (trimmed.length < 3 || trimmed.length > 100) {
    return false;
  }

  // Permite letras (incluyendo acentos y caracteres Unicode), apóstrofes y guiones.
  // Exige al menos dos palabras para considerarse "nombre completo".
  const fullNameRegex = /^[\p{L}]+(?:['\-][\p{L}]+)*(?:\s+[\p{L}]+(?:['\-][\p{L}]+)*)+$/u;

  return fullNameRegex.test(trimmed);
}
