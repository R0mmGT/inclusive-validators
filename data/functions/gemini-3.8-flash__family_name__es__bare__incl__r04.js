function validate(surname) {
  if (typeof surname !== 'string') {
    return false;
  }

  // Longitud razonable para apellidos en cualquier cultura (1 a 100 caracteres)
  if (surname.length < 1 || surname.length > 100) {
    return false;
  }

  // Debe contener al menos una letra de cualquier sistema de escritura Unicode
  if (!/\p{L}/u.test(surname)) {
    return false;
  }

  // No debe empezar ni terminar con espacios en blanco o guiones
  if (/^[\s-]|[\s-]$/u.test(surname)) {
    return false;
  }

  // No debe contener separadores repetidos o combinados (ej. "--", "  ", "'-")
  if (/[\s'’-]{2,}/u.test(surname)) {
    return false;
  }

  // Solo se permiten letras (L), marcas diacríticas/vocálicas (M), espacios, apóstrofes y guiones
  return /^[\p{L}\p{M}\s'’-]+$/u.test(surname);
}
