function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Comprueba longitud mínima y máxima razonable
  if (trimmed.length < 1 || trimmed.length > 100) {
    return false;
  }

  // \p{L}: cualquier letra Unicode (latín, cirílico, árabe, hanzi, kanji, devanagari, etc.)
  // \p{M}: marcas diacríticas combinadas
  // Permite apóstrofes iniciales (ej. 't Hooft), separadores válidos (espacio, guion, apóstrofe, punto)
  // y un punto opcional al final para abreviaciones.
  const surnameRegex = /^['’]?[\p{L}\p{M}]+(?:['’\-\.\s][\p{L}\p{M}]+)*\.?$/u;

  return surnameRegex.test(trimmed);
}
