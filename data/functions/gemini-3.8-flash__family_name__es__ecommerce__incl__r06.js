function validate(surname) {
  if (typeof surname !== 'string') {
    return false;
  }

  const trimmed = surname.trim();

  // Limitar una longitud razonable (al menos 1 carácter, máximo 100)
  if (trimmed.length < 1 || trimmed.length > 100) {
    return false;
  }

  // Debe contener al menos una letra de cualquier alfabeto/sistema de escritura
  if (!/\p{L}/u.test(trimmed)) {
    return false;
  }

  // Permite letras (\p{L}), marcas de acentuación (\p{M}), espacios,
  // guiones (-), puntos (.) y apóstrofes (' y ’)
  const validSurnamePattern = /^[\p{L}\p{M}\s'\-\.’]+$/u;

  return validSurnamePattern.test(trimmed);
}
