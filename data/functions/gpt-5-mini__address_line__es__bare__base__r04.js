function validate(address) {
  // Debe ser string
  if (typeof address !== 'string') return false;

  // Normalizar espacios al inicio/final
  const s = address.trim();

  // Longitud razonable para una línea de calle
  if (s.length < 3 || s.length > 100) return false;

  // No permitir caracteres de control/otros invisibles
  if (/\p{C}/u.test(s)) return false;

  // Conjunto de caracteres permitidos:
  // letras (incluye acentos y ñ), números, espacios y signos comunes en direcciones
  const allowed = /^[\p{L}\p{N}\s\.\,\/\-\#\º\°\ª\(\)\'\’\&\:\;]+$/u;
  if (!allowed.test(s)) return false;

  // Debe contener al menos una letra (es una línea de calle, no sólo números)
  if (!/\p{L}/u.test(s)) return false;

  // Debe comenzar y terminar por letra o número (evita puntuación al inicio/final)
  if (!/^[\p{L}\p{N}]/u.test(s) || !/[\p{L}\p{N}]$/u.test(s)) return false;

  // No permitir dos o más signos/puntuaciones consecutivos (p. ej. "//", "-.", ",,")
  if (/(?:[^\p{L}\p{N}\s]){2,}/u.test(s)) return false;

  // Evitar tres o más espacios seguidos
  if (/\s{3,}/.test(s)) return false;

  return true;
}
