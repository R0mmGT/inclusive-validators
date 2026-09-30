function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  // Permite letras (incluyendo tildes y caracteres Unicode), apóstrofes y guiones.
  // Requiere al menos dos palabras separadas por espacios.
  const regex = /^[\p{L}]+(?:['’\-][\p{L}]+)*(?:\s+[\p{L}]+(?:['’\-][\p{L}]+)*)+$/u;

  return regex.test(name.trim());
}
