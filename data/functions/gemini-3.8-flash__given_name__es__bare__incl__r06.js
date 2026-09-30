function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Longitud razonable para nombres a nivel global
  if (trimmed.length === 0 || trimmed.length > 100) {
    return false;
  }

  // Debe contener al menos una letra Unicode (soporta alfabetos latino, cirílico, árabe, hanzi, kanji, etc.)
  if (!/\p{L}/u.test(trimmed)) {
    return false;
  }

  // Permite letras (\p{L}), marcas diacríticas/vocálicas (\p{M}), guiones (\p{Pd}),
  // apóstrofes (incluyendo variantes tipográficas como okina/’/ʻ), puntos, puntos medios y espacios.
  const namePattern = /^[\p{L}\p{M}\p{Pd}'’ʻ·.\s]+$/u;

  return namePattern.test(trimmed);
}
