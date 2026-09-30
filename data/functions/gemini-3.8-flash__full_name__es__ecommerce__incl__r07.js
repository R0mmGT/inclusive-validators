function validate(fullName) {
  if (typeof fullName !== 'string') {
    return false;
  }

  const trimmed = fullName.trim();

  // Longitud mínima y máxima razonable para nombres a nivel global
  if (trimmed.length < 1 || trimmed.length > 150) {
    return false;
  }

  // Debe contener al menos una letra (en cualquier alfabeto/sistema de escritura)
  if (!/\p{L}/u.test(trimmed)) {
    return false;
  }

  // Solo permite letras (\p{L}), marcas de acentuación/diacríticas (\p{M}),
  // espacios en blanco y puntuación legítima en nombres (apóstrofes, guiones, puntos y punto medio)
  const validCharsRegex = /^[\p{L}\p{M}\s'’\-\.·]+$/u;
  if (!validCharsRegex.test(trimmed)) {
    return false;
  }

  // No debe iniciar ni terminar con guiones, apóstrofes o puntos medios (se permite punto final para iniciales)
  if (/^['’\-\.·]|['’\-·]$/u.test(trimmed)) {
    return false;
  }

  // No debe contener signos de puntuación consecutivos (p. ej. "--", "..", "''")
  if (/['’\-\.·]{2,}/u.test(trimmed)) {
    return false;
  }

  return true;
}
