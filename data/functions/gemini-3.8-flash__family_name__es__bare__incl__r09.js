function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Longitud razonable: entre 1 y 100 caracteres
  if (trimmed.length === 0 || trimmed.length > 100) {
    return false;
  }

  // Debe contener al menos una letra de cualquier alfabeto (Unicode)
  if (!/\p{L}/u.test(trimmed)) {
    return false;
  }

  // No debe contener guiones o puntos repetidos de forma consecutiva
  if (/[-.]{2,}/.test(trimmed)) {
    return false;
  }

  // Caracteres permitidos:
  // - Letras (\p{L}) y marcas diacríticas/vocales combinadas (\p{M}) de cualquier idioma
  // - Espacios, guiones, puntos y apóstrofes (incluyendo variantes tipográficas como ’ o ʻ)
  // No puede iniciar ni terminar en guion
  const validPattern = /^[\p{L}\p{M}'’ʻ.](?:[\p{L}\p{M}'’ʻ\s.-]*[\p{L}\p{M}'’ʻ.])?$/u;

  return validPattern.test(trimmed);
}
