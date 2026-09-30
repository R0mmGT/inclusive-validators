function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Longitud razonable para nombres de pila (mínimo 1 carácter, máximo 100)
  if (trimmed.length < 1 || trimmed.length > 100) {
    return false;
  }

  // Debe contener al menos una letra de cualquier sistema de escritura
  if (!/\p{L}/u.test(trimmed)) {
    return false;
  }

  // Permite letras (\p{L}), marcas de acentuación/combinación (\p{M}),
  // espacios, guiones, puntos y apóstrofes (rectos y tipográficos)
  const validNamePattern = /^[\p{L}\p{M}\s'\-’.·]+$/u;

  return validNamePattern.test(trimmed);
}
