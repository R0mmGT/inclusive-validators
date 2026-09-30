/**
 * Valida un código postal de forma amplia y tolerante para soportar
 * diferentes países y escrituras (letras de cualquier alfabeto, dígitos
 * de cualquier sistema numérico, espacios y guiones/dashes unicode).
 *
 * Reglas (intencionadamente permisivas para máxima compatibilidad):
 * - Debe ser una string.
 * - Tras eliminar espacios iniciales/finales, longitud entre 2 y 12 caracteres.
 * - Solo puede contener letras (\p{L}), dígitos (\p{N}), separadores de espacio (\p{Zs})
 *   y signos de guion/dash (\p{Pd}) (uso de propiedades Unicode).
 * - No puede estar compuesto únicamente por separadores (espacios/guiones).
 * - No puede tener dos o más separadores consecutivos.
 * - Debe contener al menos una letra o dígito.
 *
 * Nota: la validación es deliberadamente laxa porque los formatos de códigos postales
 * varían mucho entre países. Esta función filtra entradas claramente inválidas
 * (control chars, emojis, puntuación extraña, etc.) y acepta la mayoría de
 * códigos postales reales internacionales.
 */
function validate(input) {
  if (typeof input !== 'string') return false;

  // Trim de espacios Unicode en los extremos
  const trimmed = input.trim();
  // Longitud razonable para la mayoría de códigos postales internacionales
  if (trimmed.length < 2 || trimmed.length > 12) return false;

  // Solo permitir letras, números, separadores de espacio y dashes (propiedades Unicode)
  const allowedRe = /^[\p{L}\p{N}\p{Zs}\p{Pd}]+$/u;
  if (!allowedRe.test(trimmed)) return false;

  // No puede ser solo separadores (ej. solo espacios o solo guiones)
  const onlySeparatorsRe = /^[\p{Zs}\p{Pd}]+$/u;
  if (onlySeparatorsRe.test(trimmed)) return false;

  // No permitir múltiples separadores consecutivos (evita "A  -  1" o "  ")
  const consecutiveSeparatorsRe = /(?:[\p{Zs}\p{Pd}]){2,}/u;
  if (consecutiveSeparatorsRe.test(trimmed)) return false;

  // Debe contener al menos una letra o dígito
  const hasLetterOrDigitRe = /[\p{L}\p{N}]/u;
  if (!hasLetterOrDigitRe.test(trimmed)) return false;

  return true;
}
