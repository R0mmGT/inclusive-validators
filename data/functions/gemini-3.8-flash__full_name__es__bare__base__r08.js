function validate(name) {
  if (typeof name !== 'string') return false;

  const trimmed = name.trim();

  // Debe tener una longitud razonable (entre 3 y 100 caracteres)
  if (trimmed.length < 3 || trimmed.length > 100) return false;

  // Permite letras (incluyendo tildes y caracteres Unicode), apóstrofes o guiones internos,
  // y exige al menos dos palabras separadas por espacio (nombre y apellido).
  const fullNameRegex = /^[\p{L}]+(?:['’\-][\p{L}]+)*(?:\s+[\p{L}]+(?:['’\-][\p{L}]+)*)+$/u;

  return fullNameRegex.test(trimmed);
}
