function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Longitud razonable para nombres (soporta monónimos y nombres compuestos extensos)
  if (trimmed.length < 1 || trimmed.length > 150) {
    return false;
  }

  // Debe contener al menos una letra Unicode (soporta alfabetos latino, cirílico, árabe, kanji, etc.)
  if (!/\p{L}/u.test(trimmed)) {
    return false;
  }

  // Permite letras (\p{L}), diacríticos/acentos combinados (\p{M}), espacios,
  // guiones, apóstrofos (rectos y tipográficos/okina) y puntos (para iniciales).
  const validCharsRegex = /^[\p{L}\p{M}\s'’ʻ.\-]+$/u;
  if (!validCharsRegex.test(trimmed)) {
    return false;
  }

  // Evita signos de puntuación duplicados consecutivos (ej. "..", "--", "''")
  if (/([.\-'’ʻ])\1/.test(trimmed)) {
    return false;
  }

  // No debe comenzar ni terminar con punto o guion
  if (/^[.\-]|[.\-]$/.test(trimmed)) {
    return false;
  }

  return true;
}
