function validate(surname) {
  if (typeof surname !== 'string') {
    return false;
  }

  const trimmed = surname.trim();

  // No debe estar vacío, ni tener espacios en los extremos, ni exceder un límite razonable
  if (surname !== trimmed || trimmed.length === 0 || trimmed.length > 100) {
    return false;
  }

  // Debe contener al menos una letra (en cualquier sistema de escritura: latino, cirílico, árabe, hanzi, etc.)
  if (!/\p{L}/u.test(trimmed)) {
    return false;
  }

  // Solo se permiten letras (\p{L}), marcas diacríticas/vocálicas combinadas (\p{M}),
  // espacios, guiones, apóstrofes y puntos
  if (!/^[\p{L}\p{M} '\-’.]+$/u.test(trimmed)) {
    return false;
  }

  // No debe empezar ni terminar con guion o punto
  if (/^[.\-]|[.\-]$/u.test(trimmed)) {
    return false;
  }

  // No debe contener separadores consecutivos (salvo ". " para abreviaturas tipo "St. John")
  if (/[-’'.\s]{2,}/u.test(trimmed.replace(/\.\s/gu, ''))) {
    return false;
  }

  return true;
}
