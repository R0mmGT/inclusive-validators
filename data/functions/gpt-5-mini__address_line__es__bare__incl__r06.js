/**
 * validate(address: string): boolean
 *
 * Comprueba de forma amplia y tolerante si una cadena puede ser una línea de dirección (calle).
 * Objetivo: aceptar formatos de todo el mundo (múltiples escrituras, números, símbolos usados en direcciones),
 * pero rechazar entradas vacías, con saltos de línea, con largo absurdo o que sean claramente datos no-dirección
 * (por ejemplo URLs, secuencias repetidas de puntuación, o inclusión de caracteres de control).
 *
 * Reglas aplicadas:
 * - Debe ser una cadena no vacía tras hacer trim().
 * - No puede contener saltos de línea (\r, \n).
 * - Longitud razonable: 1..200 caracteres.
 * - Debe contener al menos una letra o número (soporta caracteres Unicode de distintas escrituras).
 * - No puede contener '<' ni '>' (protección básica contra HTML/markup accidental/inyección).
 * - No debe verse como una URL (http://, https://, www.).
 * - No se aceptan secuencias largas de un mismo carácter no alfanumérico (ej. "!!!!!" o "-----").
 * - Cada "palabra" separada por espacios no debe exceder 60 caracteres (protección contra tokens absurdamente largos).
 *
 * Nota: Esta validación no garantiza que la dirección exista ni que cumpla formatos postales específicos de un país,
 * porque hay enorme variabilidad internacional. La idea es filtrar entradas claramente inválidas sin bloquear direcciones legítimas.
 */
function validate(address) {
  if (typeof address !== 'string') return false;

  const s = address.trim();
  if (s.length === 0) return false;
  if (s.length > 200) return false;

  // No newlines (dirección en una sola línea)
  if (/[\r\n]/.test(s)) return false;

  // Debe tener al menos una letra o número en cualquier alfabeto/unicode
  // Requiere soporte de Unicode property escapes (ES2018+). Si no está disponible, hace una comprobación fallback.
  let hasLetterOrNumber = false;
  try {
    hasLetterOrNumber = /[\p{L}\p{N}]/u.test(s);
  } catch (e) {
    // Fallback rudimentario: ASCII letters/numbers plus common accented range
    hasLetterOrNumber = /[A-Za-z0-9\u00C0-\u024F\u0400-\u04FF]/.test(s);
  }
  if (!hasLetterOrNumber) return false;

  // Descartar etiquetas/HTML peligrosas y URLs
  if (/[<>]/.test(s)) return false;
  if (/\bhttps?:\/\//i.test(s)) return false;
  if (/\bwww\.\S+/i.test(s)) return false;

  // No permitir secuencias largas (5 o más) del mismo carácter no alfanumérico (ej. "-----" o "!!!!!")
  try {
    if (/([^\p{L}\p{N}])\1{4,}/u.test(s)) return false;
  } catch (e) {
    // Fallback: ASCII-oriented
    if (/([^A-Za-z0-9])\1{4,}/.test(s)) return false;
  }

  // Tokens (separados por espacios) no deben ser absurdamente largos
  const tokens = s.split(/\s+/);
  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i].length > 60) return false;
  }

  // Rechazar si es únicamente puntuación/espacios (ya cubierto por hasLetterOrNumber), pero por seguridad:
  if (/^[\s\p{P}\p{S}]+$/u.test(s)) return false; // usa unicode properties; si falla, no ocurrirá por hasLetterOrNumber

  return true;
}
