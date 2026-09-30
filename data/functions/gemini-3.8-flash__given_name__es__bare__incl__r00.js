function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Rango de longitud razonable para nombres reales a nivel mundial
  if (trimmed.length === 0 || trimmed.length > 100) {
    return false;
  }

  // Debe contener al menos una letra de cualquier sistema de escritura (\p{L})
  if (!/\p{L}/u.test(trimmed)) {
    return false;
  }

  // Permite:
  // - \p{L}: Letras de cualquier idioma (latino, cirílico, árabe, kanji, hangul, etc.)
  // - \p{M}: Marcas de combinación (acentos, signos vocálicos diacríticos)
  // - Espacios
  // - Guiones (-)
  // - Variantes de apóstrofos/comillas simples (como en D'Angelo o la 'Okina polinesia: ' ’ ʻ ‛)
  const validNamePattern = /^[\p{L}\p{M}\s\-’'ʻ‛]+$/u;

  return validNamePattern.test(trimmed);
}
