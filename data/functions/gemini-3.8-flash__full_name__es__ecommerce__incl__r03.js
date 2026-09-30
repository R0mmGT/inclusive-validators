function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Comprueba una longitud razonable para nombres personales a nivel internacional (2 a 100 caracteres)
  if (trimmed.length < 2 || trimmed.length > 100) {
    return false;
  }

  // Evita signos de puntuación repetidos consecutivos (-- , '', ..)
  if (/[-'’.]{2,}/u.test(trimmed)) {
    return false;
  }

  // Permite cualquier letra y marca diacrítica Unicode (\p{L}, \p{M}), espacios, guiones, puntos y apóstrofes.
  // Debe comenzar con una letra/marca y terminar con una letra/marca o punto (abreviaturas/sufijos como Jr.).
  const nameRegex = /^[\p{L}\p{M}][\p{L}\p{M}\s'’.-]*[\p{L}\p{M}.]$/u;

  return nameRegex.test(trimmed);
}
