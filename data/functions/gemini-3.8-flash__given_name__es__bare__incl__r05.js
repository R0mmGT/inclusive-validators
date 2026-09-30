function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Rechazar si contiene espacios al inicio/final o excede una longitud prudente (1-100 caracteres)
  if (name !== trimmed || trimmed.length === 0 || trimmed.length > 100) {
    return false;
  }

  // \p{L}: cualquier letra en cualquier alfabeto (latino, cirílico, árabe, kanji, etc.)
  // \p{M}: marcas de combinación y diacríticos (tildes, acentos, vocales en alfabetos abugida/árabe, etc.)
  // Permite apóstrofes iniciales (común en transliteraciones como 'Okina/Ayn) y separadores válidos internos.
  const nameRegex = /^['’]?[\p{L}\p{M}]+(?:[ '\-’·][\p{L}\p{M}]+)*$/u;

  return nameRegex.test(trimmed);
}
