function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Verifica una longitud mínima y máxima razonable
  if (trimmed.length < 3 || trimmed.length > 100) {
    return false;
  }

  // Permite letras con acentos/diacríticos (Unicode), apóstrofes y guiones internos.
  // Exige al menos dos palabras separadas por espacios (nombre y apellido).
  const fullNameRegex = /^[\p{L}]+(?:['’\-][\p{L}]+)*(?:\s+[\p{L}]+(?:['’\-][\p{L}]+)*)+$/u;

  return fullNameRegex.test(trimmed);
}
