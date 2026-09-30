function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Expresión regular que admite al menos dos palabras formadas por letras Unicode,
  // permitiendo guiones o apóstrofes internos (ej. Jean-Luc, O'Connor).
  const fullNameRegex = /^[\p{L}]+(?:['\-][\p{L}]+)*(?:\s+[\p{L}]+(?:['\-][\p{L}]+)*)+$/u;

  return fullNameRegex.test(trimmed);
}
