function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Longitud razonable para nombres de pila a nivel global
  if (trimmed.length < 1 || trimmed.length > 100) {
    return false;
  }

  // Debe contener al menos una letra de cualquier sistema de escritura
  if (!/\p{L}/u.test(trimmed)) {
    return false;
  }

  // Permite letras Unicode (\p{L}), marcas diacríticas/combinadas (\p{M}),
  // guiones (\p{Pd}), apóstrofes/comillas simples (' ’ ‘), puntos y espacios
  const namePattern = /^[\p{L}\p{M}\p{Pd}'’‘. ]+$/u;

  return namePattern.test(trimmed);
}
