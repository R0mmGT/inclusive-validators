function validate(postal) {
  // Debe ser string
  if (typeof postal !== 'string') return false;

  const s = postal.trim();

  // Longitud razonable para la mayoría de códigos postales (ajustable)
  if (s.length < 2 || s.length > 12) return false;

  // Caracteres permitidos:
  // - \p{L} letras Unicode
  // - \p{N} números Unicode
  // - \p{Zs} espacios Unicode (incluye espacio normal y no-break space)
  // - guión medio '-', barra '/' y en-dash '\u2013' (usados en algunos formatos)
  const allowed = /^[\p{L}\p{N}\p{Zs}\-\/\u2013]+$/u;
  if (!allowed.test(s)) return false;

  // Debe empezar y terminar por una letra o un número (no por separadores)
  const edge = /^[\p{L}\p{N}].*[\p{L}\p{N}]$/u;
  if (!edge.test(s)) return false;

  // No permitir separadores consecutivos (ej.: "--", "  ", "- ", " /", etc.)
  const consecutiveSeparators = /(?:[\p{Zs}\-\/\u2013]){2,}/u;
  if (consecutiveSeparators.test(s)) return false;

  // Acepta cadenas que contienen al menos una letra o número (ya garantizado por edge)
  return true;
}
