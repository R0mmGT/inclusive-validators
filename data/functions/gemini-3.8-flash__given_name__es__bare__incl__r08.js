function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  // Verifica una longitud razonable para nombres de pila a nivel global
  if (name.length === 0 || name.length > 100) {
    return false;
  }

  // Permite cualquier letra (\p{L}) o marca diacrítica (\p{M}) de cualquier sistema de escritura.
  // Admite separadores comunes internos (espacio, guion, apóstrofes o punto medio),
  // asegurando que no empiece ni termine con signos de puntuación ni existan separadores consecutivos.
  const nameRegex = /^[\p{L}\p{M}]+(?:[ '\-’·][\p{L}\p{M}]+)*$/u;

  return nameRegex.test(name);
}
