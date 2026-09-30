/**
 * validate(postalCode)
 * - Recibe un string y devuelve true si parece un código postal válido
 *   en un contexto internacional, false en caso contrario.
 *
 * Enfoque:
 * - No intenta adivinar el país (no hay país proporcionado).
 * - Permite letras (Unicode), dígitos (Unicode), espacios y guiones.
 * - Normaliza eliminando espacios/guiones y aplica límites de longitud
 *   razonables que cubren la gran mayoría de formatos reales.
 * - Rechaza entradas vacías, con caracteres de control u otros símbolos.
 *
 * Nota: Es imposible garantizar exactitud 100% sin conocer el país.
 *       Esta función aplica reglas conservadoras y amplias para ser
 *       inclusiva de la mayoría de formatos usados en todo el mundo.
 */
function validate(postal) {
  if (typeof postal !== 'string') return false;

  // Trim and quick empty check
  const s = postal.trim();
  if (s.length === 0) return false;

  // Allowed characters: any Unicode letter, any Unicode digit, spaces and hyphens.
  // Length constraint here is on the raw string to reject overly long garbage early.
  // Uses Unicode property escapes (\\p{L}, \\p{N}) with the `u` flag.
  const allowedRaw = /^[\p{L}\p{N}\s-]{2,20}$/u;
  if (!allowedRaw.test(s)) return false;

  // Normalize by removing common separators (spaces and hyphens).
  const core = s.replace(/[\s-]+/g, '');

  // After normalization, apply tighter length bounds that cover almost all postal codes:
  // minimum 2, maximum 10 characters (many countries use 2..8, some up to 10).
  if (core.length < 2 || core.length > 10) return false;

  // Must contain at least one letter or digit (defensive; should always be true due to allowedRaw).
  if (!/[\p{L}\p{N}]/u.test(core)) return false;

  // Reject strings with suspicious repetitive patterns such as a single repeated character
  // (e.g., "11111111" might be valid in rare cases but often indicates bad input).
  // Allow up to 6 identical chars in a row; if more, consider invalid.
  if (/^(.)\1{6,}$/.test(core)) return false;

  // If everything passed, consider it valid.
  return true;
}
