function validate(surname) {
  if (typeof surname !== 'string') {
    return false;
  }

  const trimmed = surname.trim();

  // Longitud razonable para apellidos a nivel global (1 a 100 caracteres)
  if (trimmed.length === 0 || trimmed.length > 100) {
    return false;
  }

  // Debe contener al menos una letra de cualquier sistema de escritura del mundo
  if (!/\p{L}/u.test(trimmed)) {
    return false;
  }

  // Permite letras (\p{L}), marcas diacríticas/acentos combinables (\p{M}),
  // espacios, guiones, puntos y apóstrofes (incluyendo el tipográfico ’)
  const validPattern = /^[\p{L}\p{M}\s'\u2019.\-]+$/u;

  return validPattern.test(trimmed);
}
