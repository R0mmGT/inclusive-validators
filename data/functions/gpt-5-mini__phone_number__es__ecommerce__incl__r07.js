/**
 * Valida un número de teléfono para uso en formularios de registro.
 * - Acepta formatos internacionales y locales comunes (separadores: espacio, -, ., paréntesis).
 * - Permite prefijos de marcación internacional: +, 00, 011.
 * - Permite y descarta extensiones comunes (ext, x, extension, #) al final.
 * - Rechaza letras en la parte principal del número (no convierte palabras tipo "1-800-FLOWERS").
 * - Comprueba que queden entre 7 y 15 dígitos (cobertura práctica para la mayoría de países; E.164 máximo 15).
 *
 * Nota: La validación perfecta para "todos los países y culturas" requeriría bases de datos de códigos y formatos
 * (p. ej. libphonenumber). Esta función aplica una heurística robusta y simple sin dependencias externas.
 *
 * @param {string} input
 * @returns {boolean}
 */
function validate(input) {
  if (typeof input !== 'string') return false;
  let s = input.trim();
  if (s.length === 0) return false;

  // Quitar y validar extensiones comunes al final (ej: "ext.123", "x123", "#123")
  s = s.replace(/\s*(?:ext|extension|x|#)\s*[:.]?\s*\d{1,7}\s*$/i, '').trim();

  // Solo caracteres permitidos en la parte principal: dígitos, espacio, ., -, (), +
  // Rechazamos letras (no convertimos mnemónicos como 1-800-FLOWERS).
  if (/[A-Za-z]/.test(s)) return false;
  if (!/^[0-9+().\-\s]+$/.test(s)) return false;

  // Paréntesis: deben estar balanceados y como máximo una pareja (ej: "(123) 456-7890")
  const opens = (s.match(/\(/g) || []).length;
  const closes = (s.match(/\)/g) || []).length;
  if (opens !== closes) return false;
  if (opens > 1 || closes > 1) return false;
  if (opens === 1) {
    // La porción entre paréntesis debe contener dígitos (y opcionalmente separadores internos)
    if (!/\([0-9\s.\-]+\)/.test(s)) return false;
  }

  // Quitar prefijos de marcación internacional que algunas personas introducen
  s = s.replace(/^\+/, '');   // +country
  s = s.replace(/^00/, '');   // 00country
  s = s.replace(/^011/, '');  // 011country (NANP international prefix)

  // Eliminar separadores visibles
  const digitsOnly = s.replace(/[\s().\-\.]/g, '');

  // Debe quedar sólo dígitos y una longitud razonable:
  if (!/^\d+$/.test(digitsOnly)) return false;

  // Longitud: entre 7 y 15 dígitos (E.164 máximo 15). 7 es un umbral práctico para números locales.
  const len = digitsOnly.length;
  if (len < 7 || len > 15) return false;

  return true;
}
