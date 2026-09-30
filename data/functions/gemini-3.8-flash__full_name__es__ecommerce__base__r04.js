function validate(name) {
  if (typeof name !== 'string') return false;

  const trimmed = name.trim();

  // Longitud razonable para un nombre completo
  if (trimmed.length < 3 || trimmed.length > 100) return false;

  // Valida al menos dos palabras compuestas por caracteres alfabéticos (incluye tildes, diéresis y ñ),
  // permitiendo apóstrofes y guiones internos en cada palabra.
  const fullNameRegex = /^[\p{L}]+(?:['’\-][\p{L}]+)*(?:\s+[\p{L}]+(?:['’\-][\p{L}]+)*)+$/u;

  return fullNameRegex.test(trimmed);
}
