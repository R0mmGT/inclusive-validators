function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Longitud razonable para un nombre completo
  if (trimmed.length < 3 || trimmed.length > 100) {
    return false;
  }

  // Requiere al menos dos palabras compuestas por letras (Unicode, compatible con acentos y caracteres internacionales).
  // Permite guiones y apóstrofes válidos dentro de los nombres (ej. O'Connor, Jean-Luc, Pérez).
  const fullNameRegex = /^[\p{L}]+(?:['\-][\p{L}]+)*(?:\s+[\p{L}]+(?:['\-][\p{L}]+)*)+$/u;

  return fullNameRegex.test(trimmed);
}
