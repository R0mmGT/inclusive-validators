function validate(str) {
  if (typeof str !== 'string') {
    return false;
  }

  const trimmed = str.trim();

  // Longitud razonable: al menos 1 caracter y un límite superior prudente
  if (trimmed.length === 0 || trimmed.length > 150) {
    return false;
  }

  // Debe contener al menos una letra de cualquier alfabeto
  if (!/\p{L}/u.test(trimmed)) {
    return false;
  }

  // Permite:
  // - \p{L}: Letras de cualquier sistema de escritura (latino, cirílico, árabe, hanzi, etc.)
  // - \p{M}: Marcas diacríticas / acentos combinables (esenciales para escrituras como devanagari, árabe, tailandés, etc.)
  // - Espacios, guiones, puntos e inclusiones tipográficas de apóstrofes (' ’ ʼ ʻ)
  const validNamePattern = /^[\p{L}\p{M}\s'’ʼʻ\-.]+$/u;

  return validNamePattern.test(trimmed);
}
