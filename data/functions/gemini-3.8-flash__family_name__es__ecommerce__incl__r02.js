function validate(surname) {
  if (typeof surname !== 'string') {
    return false;
  }

  const trimmed = surname.trim();

  // Longitud razonable: entre 1 y 100 caracteres
  if (trimmed.length < 1 || trimmed.length > 100) {
    return false;
  }

  // Permite cualquier letra en cualquier sistema de escritura (\p{L}),
  // marcas diacríticas/acentos combinables (\p{M}), espacios, guiones y apóstrofes
  const allowedCharactersPattern = /^[\p{L}\p{M} '’ʻ-]+$/u;

  // Debe contener al menos una letra válida (evita cadenas solo de símbolos o puntuación)
  const hasAtLeastOneLetter = /\p{L}/u;

  return allowedCharactersPattern.test(trimmed) && hasAtLeastOneLetter.test(trimmed);
}
