// validate: devuelve true si `value` parece una línea de dirección postal válida.
// Diseño pensado para ser lo más internacional y permisivo posible,
// evitando entradas vacías, códigos de control, HTML/URLs/ataques evidentes,
// y aceptando caracteres Unicode (letras, números y símbolos usados en direcciones).
function validate(value) {
  // Debe ser string
  if (typeof value !== 'string') return false;

  // Normalizar espacios al inicio y final
  const s = value.trim();

  // Longitud razonable: ni demasiado corta ni excesivamente larga.
  // (Se puede ajustar según requisitos; muchos sistemas manejan hasta 200-255 bytes)
  if (s.length < 3 || s.length > 200) return false;

  // No permitir caracteres de control invisibles (p. ej. null, bell, etc.)
  if (/\p{Cc}/u.test(s)) return false;

  // Rechazar contenido HTML/ETags básicos que indicarían intento de inyección
  if (/<[^>]+>/u.test(s)) return false;

  // Rechazar URLs y esquemas comunes (no son direcciones postales)
  if (/(?:https?:\/\/|ftp:\/\/|mailto:|\/\/|www\.)/i.test(s)) return false;

  // Debe contener al menos una letra o número Unicode (evita sólo símbolos/puntuación).
  if (!/[\p{L}\p{N}]/u.test(s)) return false;

  // No permitir secuencias muy largas del mismo carácter (evita "!!!!!...").
  if (/(.)\1{19,}/u.test(s)) return false;

  // No permitir largas ráfagas de sólo puntuación/símbolos (evita "///////" o "-----").
  if (/[\p{P}\p{S}]{5,}/u.test(s)) return false;

  // Evitar que la cadena sea sólo signos de moneda u otros símbolos repetidos.
  if (/^[\p{Sc}\p{P}\s]+$/u.test(s)) return false;

  // Todo bien: se considera una línea de dirección válida.
  return true;
}
