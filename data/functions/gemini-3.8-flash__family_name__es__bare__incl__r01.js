function validate(surname) {
  if (typeof surname !== 'string') {
    return false;
  }

  const trimmed = surname.trim();

  // Longitud razonable para cualquier cultura (mínimo 1 carácter, máximo 100)
  if (trimmed.length === 0 || trimmed.length > 100) {
    return false;
  }

  // Debe contener al menos una letra Unicode (soporta alfabetos latinos, cirílicos, asiáticos, árabes, etc.)
  if (!/\p{L}/u.test(trimmed)) {
    return false;
  }

  // No debe comenzar ni terminar con un guion
  if (trimmed.startsWith('-') || trimmed.endsWith('-')) {
    return false;
  }

  // No debe contener guiones o espacios consecutivos
  if (/--|\s{2}/.test(trimmed)) {
    return false;
  }

  // Caracteres permitidos: letras Unicode (\p{L}), marcas diacríticas/acentos (\p{M}),
  // espacios, guiones y variantes habituales de apóstrofes (' ’ ʻ)
  const validPattern = /^[\p{L}\p{M}\s'’ʻ\-]+$/u;

  return validPattern.test(trimmed);
}
