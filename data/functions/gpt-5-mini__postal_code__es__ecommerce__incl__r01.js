function validate(input) {
  // Debe ser un string
  if (typeof input !== 'string') return false;

  // Normalizar espacios al inicio/fin
  const s = input.trim();

  // Reglas de longitud razonables para códigos postales internacionales
  if (s.length < 2 || s.length > 20) return false;

  // Rechazar caracteres de control/privados
  if (/\p{C}/u.test(s)) return false;

  // Solo permitir letras (de cualquier alfabeto), números, espacios y guiones
  if (!/^[\p{L}\p{N}\s-]+$/u.test(s)) return false;

  // Debe contener al menos una letra o número
  if (!/[\p{L}\p{N}]/u.test(s)) return false;

  // Evitar demasiados separadores consecutivos (p. ej. "----" o "   ")
  if (/[ \-]{3,}/.test(s)) return false;

  // No empezar ni terminar con un guion
  if (/^-|-$/.test(s)) return false;

  return true;
}
