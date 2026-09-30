function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Longitud razonable para nombres de pila internacionales
  if (trimmed.length === 0 || trimmed.length > 100) {
    return false;
  }

  // Permite letras de cualquier alfabeto Unicode (\p{L}) y marcas diacríticas/acentos (\p{M}).
  // Permite apóstrofes, guiones y espacios siempre que estén situados entre secuencias de letras.
  const nameRegex = /^[\p{L}\p{M}]+(?:['’\- ][\p{L}\p{M}]+)*$/u;

  return nameRegex.test(trimmed);
}
