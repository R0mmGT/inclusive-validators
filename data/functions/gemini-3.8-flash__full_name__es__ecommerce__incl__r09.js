function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Longitud razonable para nombres (soporta desde nombres cortos/monónimos hasta compuestos largos)
  if (trimmed.length < 2 || trimmed.length > 150) {
    return false;
  }

  // Debe contener al menos un carácter alfabético de cualquier sistema de escritura
  if (!/\p{L}/u.test(trimmed)) {
    return false;
  }

  // Permite:
  // - \p{L}: letras en cualquier alfabeto (latino, cirílico, árabe, devanagari, CJK, etc.)
  // - \p{M}: marcas diacríticas/acentos combinables (esenciales en idiomas como árabe, hindi o tailandés)
  // - Espacios, guiones, apóstrofes (rectos y tipográficos) y puntos (para iniciales o títulos)
  const validNamePattern = /^[\p{L}\p{M}\s'’.\-]+$/u;

  return validNamePattern.test(trimmed);
}
