/**
 * Valida un número de teléfono de forma permisiva y segura.
 * - Acepta formatos con separadores comunes: espacios, guiones, puntos, paréntesis, /
 * - Acepta prefijo internacional '+' o '00' (que se normaliza a '+')
 * - Permite una parte de extensión al final (ext, extension, x, #) seguida de hasta 6 dígitos (se ignora para la validación principal)
 * - Requiere entre 7 y 15 dígitos (cumpliendo la longitud práctica de E.164 para números abonado)
 * - Rechaza cadenas que contengan letras (no se convierten números "vanity")
 *
 * Devuelve true si parece un número de teléfono válido; false en caso contrario.
 */
function validate(input) {
  if (typeof input !== 'string') return false;

  let s = input.trim();
  if (s.length === 0) return false;

  // Extraer y quitar una posible extensión al final: "ext", "extension", "x", "#"
  const extRe = /(?:\b(?:ext(?:ension)?|x|#)\b\.?\s*(\d{1,6}))$/i;
  const extMatch = s.match(extRe);
  if (extMatch) {
    s = s.slice(0, extMatch.index).trim();
  }

  // No permitir letras (evitamos tratar vanity numbers)
  if (/[A-Za-z]/.test(s)) return false;

  // No permitir múltiples signos '+' y si existe debe estar al principio
  const plusCount = (s.match(/\+/g) || []).length;
  if (plusCount > 1) return false;
  if (plusCount === 1 && s[0] !== '+') return false;

  // Normalizar prefijo internacional '00' a '+'
  s = s.replace(/^00/, '+');

  // Quitar separadores comunes
  s = s.replace(/[\s\-.\(\)\/]/g, '');

  // Tras limpieza debe ser opcional '+' seguido solo de dígitos
  if (!/^\+?\d+$/.test(s)) return false;

  // Extraer sólo los dígitos para las comprobaciones de longitud
  const digits = s.replace(/^\+/, '');

  // Longitud razonable basada en E.164: mínimo práctico 7 y máximo 15 dígitos
  if (digits.length < 7 || digits.length > 15) return false;

  // Rechazar números que sean solo ceros
  if (/^0+$/.test(digits)) return false;

  return true;
}
