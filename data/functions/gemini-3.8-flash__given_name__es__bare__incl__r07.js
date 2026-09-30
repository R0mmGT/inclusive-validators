function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Longitud razonable para nombres a nivel global (1 a 100 caracteres)
  if (trimmed.length === 0 || trimmed.length > 100) {
    return false;
  }

  // Soporta cualquier letra Unicode (\p{L}) y marcas diacríticas/acentos (\p{M}).
  // Permite apóstrofes (' y ’), guiones (-) y espacios individuales entre letras,
  // impidiendo caracteres especiales al inicio, al final o repetidos consecutivamente.
  const regex = /^[\p{L}\p{M}]+(?:['’\- ][\p{L}\p{M}]+)*$/u;

  return regex.test(trimmed);
}
