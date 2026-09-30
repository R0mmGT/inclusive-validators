function validate(name) {
  // debe ser string
  if (typeof name !== 'string') return false;
  // no vacío y sin espacios iniciales/finales
  if (name.length === 0 || name.trim() !== name) return false;
  // no múltiples espacios consecutivos
  if (/\s{2,}/.test(name)) return false;
  const parts = name.split(' ');
  // al menos nombre y apellido
  if (parts.length < 2) return false;

  // cada parte debe comenzar y terminar con una letra Unicode,
  // puede contener letras, apóstrofes, guiones o puntos en el interior.
  const partRegex = /^[\p{L}][\p{L}'\-.]*[\p{L}]$/u;
  for (const part of parts) {
    if (!partRegex.test(part)) return false;
    // no secuencias de signos de puntuación (e.g. "--", "''", "..")
    if (/(?:['\-.]){2,}/.test(part)) return false;
    // cada parte debe tener al menos 2 letras reales
    const lettersCount = (part.match(/\p{L}/gu) || []).length;
    if (lettersCount < 2) return false;
  }

  return true;
}
