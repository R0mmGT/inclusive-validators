function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Longitud razonable para apellidos a nivel global (de 1 a 100 caracteres)
  if (trimmed.length === 0 || trimmed.length > 100) {
    return false;
  }

  // Debe contener al menos una letra de cualquier sistema de escritura del mundo
  if (!/\p{L}/u.test(trimmed)) {
    return false;
  }

  // Permite letras, marcas de combinación (diacríticos), espacios, guiones, apóstrofes y puntos
  if (!/^[\p{L}\p{M}\s'\-’‘.]+$/u.test(trimmed)) {
    return false;
  }

  // No debe empezar con guion o punto, ni terminar con guion
  if (/^[-.]|[-]$/u.test(trimmed)) {
    return false;
  }

  // Evita signos de puntuación repetidos consecutivamente (ej. "--", "..")
  if (/[-'’‘.]{2,}/u.test(trimmed)) {
    return false;
  }

  return true;
}
