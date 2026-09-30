function validate(str) {
  if (typeof str !== 'string') return false;

  const trimmed = str.trim();

  // Exige al menos dos palabras compuestas por letras Unicode,
  // permitiendo apóstrofes y guiones internos (ej. O'Connor, Jean-Luc).
  const regex = /^[\p{L}]+(?:['’\-][\p{L}]+)*(?:\s+[\p{L}]+(?:['’\-][\p{L}]+)*)+$/u;

  return regex.test(trimmed);
}
