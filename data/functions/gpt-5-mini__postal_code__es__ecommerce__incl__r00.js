function validate(postal) {
  // Devuelve true si 'postal' parece un código postal válido (heurística internacional).
  if (typeof postal !== 'string') return false;

  // Normalizar espacios (incluye colapsar múltiples espacios) y recortar.
  const normalized = postal.replace(/\s+/g, ' ').trim();

  // Rechazar vacíos y longitudes absurdas (ajustable). Muchos CP internacionales tienen entre 2 y ~12 caracteres,
  // pero damos un margen para casos especiales.
  if (normalized.length < 2 || normalized.length > 20) return false;

  // Intentamos usar propiedades Unicode para admitir alfabetos no latinos (p. ej. cirílico, árabe, etc.).
  // Si el entorno no soporta \p{...} haremos un fallback ASCII.
  try {
    // Rechaza cualquier carácter que no sea letra, número, espacio o guion.
    const forbidden = /[^\p{L}\p{N} -]/u;
    if (forbidden.test(normalized)) return false;

    // Patrón: grupos de letras/dígitos separados opcionalmente por un solo espacio o un solo guion.
    // Cubre formatos como "12345", "12345-6789", "A1A 1A1", "SW1A 1AA", "BFPO 1234", etc.
    const pattern = /^[\p{L}\p{N}]+(?:[ -][\p{L}\p{N}]+)*$/u;
    return pattern.test(normalized);
  } catch (e) {
    // Fallback para entornos sin soporte de propiedades Unicode.
    const forbiddenAscii = /[^A-Za-z0-9 -]/;
    if (forbiddenAscii.test(normalized)) return false;
    const patternAscii = /^[A-Za-z0-9]+(?:[ -][A-Za-z0-9]+)*$/;
    return patternAscii.test(normalized);
  }
}
