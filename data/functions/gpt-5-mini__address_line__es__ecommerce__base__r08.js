function validate(input) {
  if (typeof input !== 'string') return false;
  const s = input.trim();
  if (s.length < 3 || s.length > 120) return false;

  // Debe contener al menos una letra (para evitar solo números o símbolos)
  if (!/\p{L}/u.test(s)) return false;

  // Sólo se permiten letras, números, espacios y puntuación típica en direcciones
  // Incluye símbolos ordinales comunes º ª y grado ° y comillas/apóstrofes
  const allowed = /^[\p{L}\p{N}\s\.\,\-\/#ºª°\(\)'"·]+$/u;
  if (!allowed.test(s)) return false;

  // Debe comenzar y terminar con letra o número (no con puntuación)
  if (!/^[\p{L}\p{N}]/u.test(s)) return false;
  if (!/[\p{L}\p{N}]$/u.test(s)) return false;

  // No permitir dos o más símbolos/puntuación consecutivos (p. ej. "///" o "..")
  if (/[^\p{L}\p{N}\s]{2,}/u.test(s)) return false;

  // No permitir espacios excesivos consecutivos
  if (/\s{3,}/.test(s)) return false;

  return true;
}
