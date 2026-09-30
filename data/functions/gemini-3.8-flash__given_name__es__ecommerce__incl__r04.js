function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Longitud razonable para nombres de pila en cualquier cultura (1 a 100 caracteres)
  if (trimmed.length === 0 || trimmed.length > 100) {
    return false;
  }

  // Debe contener al menos una letra de cualquier alfabeto/escritura Unicode
  if (!/\p{L}/u.test(trimmed)) {
    return false;
  }

  // No permitir caracteres separadores repetidos consecutivamente
  if (/[\s'\-’ʻ]{2,}/u.test(trimmed)) {
    return false;
  }

  // Valida que empiece y termine con un carácter válido (letra, marca o apóstrofe/ʻokina)
  // y solo contenga letras (\p{L}), diacríticos/marcas (\p{M}), espacios, guiones y apóstrofes
  const namePattern = /^[\p{L}\p{M}'’ʻ](?:[\p{L}\p{M}\s'\-’ʻ]*[\p{L}\p{M}'’ʻ])?$/u;

  return namePattern.test(trimmed);
}
