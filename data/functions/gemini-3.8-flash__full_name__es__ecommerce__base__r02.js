function validate(str) {
  if (typeof str !== 'string') {
    return false;
  }

  const trimmed = str.trim();

  // Validar longitud razonable para un nombre completo
  if (trimmed.length < 3 || trimmed.length > 100) {
    return false;
  }

  // Separar en palabras por uno o más espacios
  const words = trimmed.split(/\s+/);

  // Un nombre completo debe tener al menos nombre y apellido (2 palabras)
  if (words.length < 2) {
    return false;
  }

  // Cada palabra debe estar formada por letras (compatibles con Unicode/acentos/ñ/etc.)
  // y permitir opcionalmente apóstrofes o guiones internos (ej. O'Connor, Jean-Luc)
  const nameSegmentPattern = /^[\p{L}]+(?:['’\-][\p{L}]+)*$/u;

  return words.every(word => nameSegmentPattern.test(word));
}
