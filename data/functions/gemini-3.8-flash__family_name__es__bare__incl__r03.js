function validate(surname) {
  if (typeof surname !== 'string') {
    return false;
  }

  const trimmed = surname.trim();

  // Longitud razonable para apellidos (desde 1 carácter como en culturas asiáticas/africanas)
  if (trimmed.length === 0 || trimmed.length > 100) {
    return false;
  }

  // Debe contener al menos una letra de cualquier alfabeto/escritura Unicode
  if (!/\p{L}/u.test(trimmed)) {
    return false;
  }

  // Expresión regular que admite:
  // - Letras (\p{L}) y marcas de combinación diacrítica (\p{M}) de cualquier idioma
  // - Apóstrofes rectos y curvos (' ’), útiles en nombres como O'Connor o 't Hooft
  // - Guiones (-) para apellidos compuestos como Sánchez-López
  // - Espacios y puntos para partículas o abreviaciones como St. John o de la Rosa
  // - Evita caracteres no válidos, símbolos, números y separadores consecutivos
  const surnameRegex = /^['’\p{L}\p{M}]+(?:(?:[\s\-]|['’]|\.\s*)['’\p{L}\p{M}]+)*['’]?$/u;

  return surnameRegex.test(trimmed);
}
