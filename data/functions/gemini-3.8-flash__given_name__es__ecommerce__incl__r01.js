function validate(name) {
  if (typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Longitud mínima de 1 y máxima prudencial para evitar desbordamientos o abusos
  if (trimmed.length === 0 || trimmed.length > 70) {
    return false;
  }

  // \p{L}: cualquier letra de cualquier alfabeto/sistema de escritura (Unicode)
  // \p{M}: marcas diacríticas/vocálicas combinables (indispensable para alfabetos como árabe, devanagari, tailandés, etc.)
  // Permite apóstrofes (incluyendo variantes tipográficas), guiones y espacios interiores
  const nameRegex = /^[\p{L}\p{M}]+(?:['’\- ][\p{L}\p{M}]+)*$/u;

  return nameRegex.test(trimmed);
}
