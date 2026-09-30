function validate(surname) {
  if (typeof surname !== 'string') {
    return false;
  }

  const trimmed = surname.trim();

  // Longitud razonable para apellidos de diversas culturas (1 a 100 caracteres)
  if (trimmed.length < 1 || trimmed.length > 100) {
    return false;
  }

  // Debe contener al menos una letra de cualquier sistema de escritura (Unicode)
  if (!/\p{L}/u.test(trimmed)) {
    return false;
  }

  // Permite letras, marcas diacríticas/vocálicas (\p{M}), espacios, guiones, puntos y variantes comunes de apóstrofe
  if (!/^[\p{L}\p{M}\s'’ʼ·.-]+$/u.test(trimmed)) {
    return false;
  }

  // No debe iniciar ni terminar con guion o punto
  if (/^[-.]|[.-]$/.test(trimmed)) {
    return false;
  }

  // No debe contener guiones o puntos repetidos de forma consecutiva
  if (/[-.]{2,}/.test(trimmed)) {
    return false;
  }

  return true;
}
