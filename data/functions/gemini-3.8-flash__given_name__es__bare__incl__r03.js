function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Comprobar una longitud razonable (al menos 1 carácter, máximo 100)
  if (trimmed.length === 0 || trimmed.length > 100) {
    return false;
  }

  // Debe contener al menos una letra de cualquier sistema de escritura (alfabeto)
  if (!/\p{L}/u.test(trimmed)) {
    return false;
  }

  // Permitir letras (\p{L}), marcas diacríticas/vocálicas combinadas (\p{M}),
  // letras modificadoras como el 'okina (\p{Lm}), espacios, guiones y apóstrofes
  const allowedCharacters = /^[\p{L}\p{M}\p{Lm}'’\-\s]+$/u;
  if (!allowedCharacters.test(trimmed)) {
    return false;
  }

  // No debe comenzar ni terminar con signos de puntuación (guion o apóstrofe)
  if (/^['’\-]/.test(trimmed) || /['’\-]$/.test(trimmed)) {
    return false;
  }

  // No debe contener separadores o signos de puntuación consecutivos (ej. "--", "  ", "'-")
  if (/['’\-\s]{2,}/.test(trimmed)) {
    return false;
  }

  return true;
}
