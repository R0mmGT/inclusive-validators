/**
 * Valida una línea de dirección postal (calle).
 * Devuelve true si la cadena parece una línea de calle razonablemente válida, false en caso contrario.
 *
 * Reglas principales (heurísticas, no exhaustivas):
 * - Debe ser un string no vacío, con longitud entre 3 y 100 caracteres.
 * - Solo se permiten letras Unicode, dígitos, espacios y signos comunes en direcciones:
 *   . , - / # º ª ° ' ” " ( )
 * - Debe contener al menos una letra (con acentos/ñ incluidos).
 * - Debe contener al menos una secuencia de 2 letras (para evitar cosas como "1/").
 * - No se permiten caracteres de control ni secuencias muy largas de un mismo carácter ni
 *   repeticiones excesivas de signos de puntuación.
 * - Rechaza cadenas con una cantidad muy elevada de dígitos (probablemente no sea una calle).
 */
function validate(input) {
  if (typeof input !== 'string') return false;
  const s = input.trim();

  // longitud mínima/máxima razonable
  if (s.length < 3 || s.length > 100) return false;

  // rechazar caracteres de control
  if (/[\u0000-\u001F\u007F]/.test(s)) return false;

  // conjunto de caracteres permitidos (letras unicode, marcas, dígitos y signos frecuentes en direcciones)
  const allowed = /^[\p{L}\p{M}\d\s\-\.,\/#ºª°'’"()]+$/u;
  if (!allowed.test(s)) return false;

  // debe contener al menos una letra
  if (!/\p{L}/u.test(s)) return false;

  // debe contener al menos una secuencia de 2 letras (nombre de calle razonable)
  if (!/\p{L}{2,}/u.test(s)) return false;

  // no permitir repeticiones largas del mismo carácter (ej. "aaaa", "----")
  if (/(.)\1{3,}/u.test(s)) return false;

  // no permitir tres o más signos de puntuación seguidos
  if (/[.,\/#\-\(\)'"ºª°]{3,}/.test(s)) return false;

  // evitar exceso de dígitos (probablemente no sea una línea de calle válida si hay demasiados números)
  const digits = (s.match(/\d/g) || []).length;
  if (digits > 8) return false;

  // todo ok (heurística)
  return true;
}
