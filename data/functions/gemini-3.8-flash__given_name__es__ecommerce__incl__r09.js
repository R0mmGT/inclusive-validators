function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Longitud mínima de 1 carácter y máxima razonable para nombres largos o compuestos
  if (trimmed.length < 1 || trimmed.length > 100) {
    return false;
  }

  // Debe contener al menos una letra de cualquier sistema de escritura
  if (!/\p{L}/u.test(trimmed)) {
    return false;
  }

  // Permite letras de cualquier alfabeto (\p{L}), marcas de acentuación/combinación (\p{M}),
  // espacios, guiones, puntos y variantes comunes de apóstrofes.
  const validPattern = /^[\p{L}\p{M}\s\-.'’‘ʻ]+$/u;

  return validPattern.test(trimmed);
}
