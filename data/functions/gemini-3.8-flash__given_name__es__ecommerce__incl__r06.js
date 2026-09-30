function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Validar longitud razonable (al menos 1 carácter y máximo 100)
  if (trimmed.length < 1 || trimmed.length > 100) {
    return false;
  }

  // Debe contener al menos una letra de cualquier alfabeto/idioma
  if (!/\p{L}/u.test(trimmed)) {
    return false;
  }

  // Solo se permiten:
  // - \p{L}: Letras de cualquier sistema de escritura (Latino, Cirílico, Árabe, Hanzi, etc.)
  // - \p{M}: Marcas diacríticas / acentos combinables
  // - Espacios, guiones (-) y variantes comunes de apóstrofe (', ’, ʻ)
  const validNamePattern = /^[\p{L}\p{M}\s'\u2019\u02BB-]+$/u;

  return validNamePattern.test(trimmed);
}
