function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Longitud mínima y un límite máximo razonable
  if (trimmed.length < 1 || trimmed.length > 150) {
    return false;
  }

  // Permite letras (\p{L}) y marcas diacríticas/vocálicas combinadas (\p{M}) de cualquier sistema de escritura Unicode.
  // También admite espacios (\s), puntos (.), guiones (-) y variantes comunes de apóstrofes (' ’ ʼ).
  const validCharsRegex = /^[\p{L}\p{M}\s.'’ʼ-]+$/u;

  // Debe contener obligatoriamente al menos una letra (evita cadenas solo de signos como "... -")
  const hasLetterRegex = /\p{L}/u;

  return validCharsRegex.test(trimmed) && hasLetterRegex.test(trimmed);
}
