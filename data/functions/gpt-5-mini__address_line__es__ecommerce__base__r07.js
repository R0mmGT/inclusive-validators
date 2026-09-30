/**
 * Valida una línea de dirección postal (calle).
 * Recibe un string y devuelve true si parece una dirección válida, false en caso contrario.
 *
 * Reglas (balance entre ser útil y permitir variantes reales):
 * - Debe ser string y tener entre 3 y 100 caracteres tras recortar espacios.
 * - No puede contener saltos de línea ni caracteres de etiqueta HTML (<, >) ni URLs.
 * - Debe contener al menos una letra (soporta letras unicode, incl. acentos y ñ).
 * - Solo se permiten caracteres comunes en direcciones: letras, dígitos, espacios y . , - # / º ª ( ) · ' " :
 * - No permitir bloques largos de sólo símbolos (p. ej. "!!!" o "///").
 */
function validate(input) {
  if (typeof input !== 'string') return false;

  const s = input.trim();

  if (s.length < 3 || s.length > 100) return false;

  // Sin saltos de línea
  if (/\r|\n/.test(s)) return false;

  // No etiquetas HTML ni URLs
  if (/[<>]/.test(s)) return false;
  if (/(https?:\/\/|www\.)/i.test(s)) return false;

  // Debe contener al menos una letra (Unicode)
  if (!/\p{L}/u.test(s)) return false;

  // Solo permitimos un conjunto razonable de caracteres en direcciones
  const allowed = /^[\p{L}\d\s\.\,\-\#\/ºª\(\)·'"\:]+$/u;
  if (!allowed.test(s)) return false;

  // Evitar secuencias largas de símbolos/puntuación (p. ej. "!!!" o "...////")
  if (/[^\p{L}\d\s]{3,}/u.test(s)) return false;

  return true;
}
