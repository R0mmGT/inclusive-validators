function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  // Comprueba longitud razonable y que no tenga espacios al inicio o al final
  if (name.length === 0 || name.length > 150 || name !== name.trim()) {
    return false;
  }

  // Permite cualquier alfabeto internacional (Unicode \p{L} y marcas combinables \p{M}),
  // junto con separadores legítimos en nombres (espacios simples, guiones, apóstrofes y puntos para iniciales).
  // No permite números, símbolos inválidos ni separadores consecutivos.
  const nameRegex = /^[\p{L}\p{M}]+(?:(?:[ '’\-]|\.\s?)[\p{L}\p{M}]+)*\.?$/u;

  return nameRegex.test(name);
}
